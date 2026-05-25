// src/config/db.ts

// Kode Anda sekarang aman! URL aslinya disembunyikan di dalam variabel lingkungan
const NEON_HTTP_URL = import.meta.env.VITE_DATABASE_URL; 

export async function queryNeon(sqlQuery: string, args: any[] = []) {
  if (!NEON_HTTP_URL) {
    console.error("Waduh, VITE_DATABASE_URL belum diatur di sistem server/hosting!");
    return [];
  }

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
  return data.rows || []; 
}
