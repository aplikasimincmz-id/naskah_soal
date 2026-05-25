// api/query.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Pengaturan Header CORS (Agar aman dari blokir browser)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, params } = req.body;
  const connectionString = process.env.VITE_DATABASE_URL;

  if (!connectionString) {
    return res.status(500).json({ error: 'Database connection string is missing on Vercel environment' });
  }

  try {
    // 1. Ambil host dari connection string secara bersih
    const host = connectionString.split('@')[1]?.split('/')[0];
    if (!host) {
      return res.status(400).json({ error: 'Invalid connection string format' });
    }

    // Menggunakan endpoint /sql resmi yang mendukung parameter data $1, $2, dst
    const endpoint = `https://${host}/sql`;

    // 2. Kirim ke Neon dengan format Header dan Bodi yang SANGAT KETAT
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // Aturan Wajib Neon: String koneksi harus ditaruh di Header dengan teks bersih
        'Neon-Connection-String': connectionString.trim()
      },
      body: JSON.stringify({
        query: query,
        params: params,
      }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
