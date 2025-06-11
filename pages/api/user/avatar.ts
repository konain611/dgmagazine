import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { verifyJWT } from '@/lib/auth';

interface FormFiles {
  avatar?: File | File[];
}

type SuccessResponse = { url: string };
type ErrorResponse = { error: string };
type ApiResponse = SuccessResponse | ErrorResponse;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization?.replace('Bearer ', '');
  const user = await verifyJWT(authHeader || '');
  
  if (!user || typeof user !== 'object' || !('userId' in user)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
  fs.mkdirSync(uploadDir, { recursive: true });

  const form = new IncomingForm({ 
    uploadDir, 
    keepExtensions: true,
    multiples: false
  });

  try {
    const { files } = await new Promise<{ files: FormFiles }>((resolve, reject) => {
      form.parse(req, (err, _, files) => {
        if (err) reject(err);
        else resolve({ files: files as FormFiles });
      });
    });

    const file = Array.isArray(files.avatar) ? files.avatar[0] : files.avatar;
    
    if (!file?.filepath) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = path.basename(file.filepath);
    const url = `/uploads/avatars/${fileName}`;
    
    return res.status(200).json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}