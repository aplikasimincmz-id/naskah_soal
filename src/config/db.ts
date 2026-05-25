// src/config/db.ts

// Masukkan URL HTTPS asli dari Neon Console Anda ke sini (Pastikan berawalan https://)
const NEON_HTTP_URL = "https://ep-crimson-night-aoifv1y7.apirest.c-2.ap-southeast-1.aws.neon.tech/neondb/rest/v1"; 

export async function queryNeon(sqlQuery: string, args: any[] = []) {
  // Memastikan endpoint mengarah ke path jalurnya /v1/sql atau /sql resmi Neon
  const endpoint = NEON_HTTP_URL.endsWith('/v1/sql') ? NEON_HTTP_URL : `${NEON_HTTP_URL.replace(/\/$/, '')}/sql`;

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
  
  // Pengaman jika database mengembalikan objek kosong agar tidak membuat aplikasi crash
  return data.rows || []; 
}
