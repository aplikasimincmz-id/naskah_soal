// src/config/db.ts

const CONNECTION_STRING = import.meta.env.VITE_DATABASE_URL; 

export async function queryNeon(sqlQuery: string, args: any[] = []) {
  if (!CONNECTION_STRING) {
    alert("⚠️ Error: Variabel 'VITE_DATABASE_URL' masih kosong di Vercel!");
    throw new Error("VITE_DATABASE_URL is missing");
  }

  // 1. Ekstrak HOSTNAME dan PASSWORD secara otomatis dari string postgres://
  // Format standar: postgres://user:password@hostname/database
  const cleanString = CONNECTION_STRING.trim();
  const passwordMatch = cleanString.match(/:\/\/([^:]+):([^@]+)@/);
  const hostMatch = cleanString.match(/@([^\/]+)/);

  if (!passwordMatch || !hostMatch) {
    throw new Error("Format VITE_DATABASE_URL di Vercel salah! Gunakan format postgres://... asli dari Neon.");
  }

  const dbPassword = passwordMatch[2];
  const dbHost = hostMatch[1];

  // 2. Tembak ke Endpoint HTTP resmi milik Neon Global
  const endpoint = `https://` + dbHost + `/v1/sql`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Menyuntikkan Bearer Token otomatis menggunakan password database Anda
      'Authorization': `Bearer ${dbPassword}`, 
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
