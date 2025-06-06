// app/api/articles/[articleId]/download/route.js

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req, { params }) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    const user = token ? await verifyJWT(token) : null;
    if (!user?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const articleId = parseInt(params.articleId);
    if (isNaN(articleId)) {
      return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
    }

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { title: true, content: true, slug: true },
    });
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    await prisma.articleDownload.create({
      data: { articleId, userId: user.userId },
    });

    // A4 dimensions in points
    const A4_WIDTH = 595;
    const A4_HEIGHT = 842;
    const MARGIN = 50;           // used for content margins only
    const HEADER_HEIGHT = 80;    // header band height
    const USABLE_WIDTH = A4_WIDTH - MARGIN * 2;

    // Create PDF
    const pdfDoc = await PDFDocument.create();

    // Embed fonts
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const contentFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Attempt to load header logo (JPG) from public/images/logo-h.jpg
    let headerLogoImage = null;
    let headerLogoDims = { width: 0, height: 0 };
    try {
      const headerLogoPath = path.join(
        process.cwd(),
        'public',
        'images',
        'logo-h.jpg'
      );
      const headerLogoBytes = await fs.readFile(headerLogoPath);
      headerLogoImage = await pdfDoc.embedJpg(headerLogoBytes);
      headerLogoDims = headerLogoImage.scale(0.25);
    } catch {
      headerLogoImage = null;
    }

    // Helper: draw header on a page (logo centered vertically in header band)
    const drawHeader = (page) => {
      const { width, height } = page.getSize();
      if (headerLogoImage) {
        const logoWidth = headerLogoDims.width;
        const logoHeight = headerLogoDims.height;
        const logoY = height - HEADER_HEIGHT + (HEADER_HEIGHT - logoHeight) / 2;
        const logoX = (width - logoWidth) / 2;
        page.drawImage(headerLogoImage, {
          x: logoX,
          y: logoY,
          width: logoWidth,
          height: logoHeight,
        });
      }
      // Draw line just below header band
      const lineY = height - HEADER_HEIGHT - 5;
      page.drawLine({
        start: { x: MARGIN, y: lineY },
        end: { x: width - MARGIN, y: lineY },
        thickness: 1,
        color: rgb(0.5, 0.5, 0.5),
      });
    };

    // Word-wrap helper
    const wrapText = (text, font, size, maxWidth) => {
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, size);
        if (testWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) lines.push(currentLine);
      return lines;
    };

    // Normalize literal "\n" to actual newline
    const rawContent = article.content.replace(/\\n/g, '\n');
    const paragraphs = rawContent.split('\n');

    // Start first page
    let page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
    drawHeader(page);

    // Position cursor below the line with extra top margin (40 pts instead of 20)
    let yCursor = A4_HEIGHT - HEADER_HEIGHT - 40; // added 20 pts more top gap
    const contentFontSize = 12;
    const lineGap = 5;

    // Draw title below header
    const titleSize = 20;
    const titleLines = wrapText(article.title, titleFont, titleSize, USABLE_WIDTH);
    for (const line of titleLines) {
      if (yCursor < MARGIN + contentFontSize) {
        page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
        drawHeader(page);
        yCursor = A4_HEIGHT - HEADER_HEIGHT - 40;
      }
      page.drawText(line, {
        x: MARGIN,
        y: yCursor,
        size: titleSize,
        font: titleFont,
        color: rgb(0, 0, 0),
      });
      yCursor -= titleSize + lineGap;
    }

    yCursor -= 10; // additional gap before content

    // Draw content paragraphs, preserving blank lines as paragraph breaks
    for (const para of paragraphs) {
      if (para.trim() === '') {
        // blank line => extra paragraph gap
        yCursor -= contentFontSize + lineGap;
        continue;
      }
      const wrapped = wrapText(para, contentFont, contentFontSize, USABLE_WIDTH);
      for (const line of wrapped) {
        if (yCursor < MARGIN + contentFontSize) {
          page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
          drawHeader(page);
          yCursor = A4_HEIGHT - HEADER_HEIGHT - 40;
        }
        page.drawText(line, {
          x: MARGIN,
          y: yCursor,
          size: contentFontSize,
          font: contentFont,
          color: rgb(0, 0, 0),
        });
        yCursor -= contentFontSize + lineGap;
      }
      yCursor -= contentFontSize; // paragraph gap
    }

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: new Headers({
        'Content-Disposition': `attachment; filename="${article.slug || 'article'}.pdf"`,
        'Content-Type': 'application/pdf',
      }),
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
