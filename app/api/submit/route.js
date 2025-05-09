import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      phone,
      email,
      streetAddress,
      city,
      state,
      zipCode,
      companyName,
      interests,
      comments,
    } = body;

    const submission = await prisma.writeForm.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        streetAddress,
        city,
        state,
        zipCode,
        companyName,
        interests,
        comments,
      },
    });

    return new Response(JSON.stringify({ message: 'Form submitted successfully!', submission }), {
      status: 200,
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong!' }), {
      status: 500,
    });
  }
}
