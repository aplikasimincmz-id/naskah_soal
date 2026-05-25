// src/config/db.ts

// Ganti dengan Connection String asli dari Neon Console Anda
const CONNECTION_STRING = "postgres://alex:password@endpoint.neon.tech/neondb?sslmode=require";

export async function queryNeon(sqlQuery: string, args: any[] = []) {
  // Mengubah protocol postgres:// menjadi https:// agar bisa ditembak lewat fetch browser
  const url = CONNECTION_STRING.replace('postgres://', 'https://').split('?')[0];
  
  const response = await fetch(`${url}/sql`, {
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
  return data.rows; // Mengembalikan baris data dari database
}
