import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

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
      data: {
        articleId,
        userId: user.userId,
      },
    });

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    const margin = 50;

    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const contentFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Center the title
    const titleSize = fontSize + 4;
    const titleWidth = titleFont.widthOfTextAtSize(article.title, titleSize);
    const titleX = (width - titleWidth) / 2;

    page.drawText(article.title, {
      x: titleX,
      y: height - margin,
      size: titleSize,
      font: titleFont,
      color: rgb(0, 0, 0),
    });

    // Draw article content line by line
    const contentLines = article.content.split('\n');
    let y = height - margin - 30;

    for (const line of contentLines) {
      if (y < margin) {
        page = pdfDoc.addPage();
        y = height - margin;
      }

      page.drawText(line, {
        x: margin,
        y,
        size: fontSize,
        font: contentFont,
        color: rgb(0, 0, 0),
      });

      y -= fontSize + 4;
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
