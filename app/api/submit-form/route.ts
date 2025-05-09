// app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const formData = {
      ...body,
      createdAt: new Date(),
    };

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db(); // 
    const result = await db.collection('submissions').insertOne(formData);
    await client.close();

    return NextResponse.json({ message: 'Form submitted successfully!', data: result }, { status: 201 });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ message: 'Error submitting form' }, { status: 500 });
  }
}
