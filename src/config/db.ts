// src/config/db.ts
import { neon } from '@neondatabase/serverless';

// Masukkan Connection String yang Anda salin dari Neon Console ke sini
const databaseUrl = "postgresql://neondb_owner:npg_elyUzQP64nhm@ep-crimson-night-aoifv1y7.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

// Menginisialisasi fungsi query SQL menggunakan driver serverless Neon
export const sql = neon(databaseUrl);
