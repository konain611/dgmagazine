import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();

    const { namee: name, email, subject, message } = body;

    const submission = await prisma.contactForm.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return new Response(
      JSON.stringify({ 
        message: 'Contact form submitted successfully!', 
        submission 
      }), 
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return new Response(
      JSON.stringify({ message: 'Something went wrong!' }), 
      { status: 500 }
    );
  }
}