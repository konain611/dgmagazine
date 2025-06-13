// ✅ Updated: app/api/user/avatar/route.ts (App Router)
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { verifyJWT } from '@/lib/auth';

export const config = {
  api: { bodyParser: false }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  // 1. Auth
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = await verifyJWT(token || '');
  if (!user || typeof user !== 'object' || !('userId' in user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 2. Parse standard FormData in App Router
    const formData = await req.formData();
    const file = formData.get('avatar');
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 3. Convert Blob to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    // 4. Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: 'dgmagazine/avatars',
      use_filename: true,
      unique_filename: false,
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (err) {
    console.error('Upload failed:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
