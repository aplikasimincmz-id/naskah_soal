// src/config/db.ts

// Mengambil URL dari Environment Variable Vercel
const NEON_HTTP_URL = import.meta.env.VITE_DATABASE_URL; 

export async function queryNeon(sqlQuery: string, args: any[] = []) {
  // PENGAMAN JIKA VERCEL BELUM SINKRON:
  if (!NEON_HTTP_URL) {
    alert("⚠️ Error: Variabel 'VITE_DATABASE_URL' belum terbaca di Vercel. Pastikan sudah Redeploy!");
    throw new Error("VITE_DATABASE_URL is missing");
  }

  // Bersihkan format URL agar mengarah ke endpoint SQL resmi Neon
  const baseUrl = NEON_HTTP_URL.trim().replace(/\/$/, '');
  const endpoint = baseUrl.endsWith('/v1/sql') ? baseUrl : `${baseUrl}/sql`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: sqlQuery,
      params: args
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Neon Database Error: ${errorText}`);
  }

  const data = await response.json();
  return data.rows || []; 
}
