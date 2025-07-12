// src/utils/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Define proper type for Supabase errors
interface SupabaseError {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
}

// Helper function to handle Supabase errors
export const handleSupabaseError = (
  error: SupabaseError | Error | unknown
): string => {
  console.error("Supabase error:", error);

  // Handle known Supabase error structure
  if (error && typeof error === "object" && "code" in error) {
    const supabaseError = error as SupabaseError;

    if (supabaseError.code === "PGRST116") {
      return "Table not found. Please check your database schema.";
    }

    if (supabaseError.code === "401") {
      return "Unauthorized access. Please check your API keys.";
    }

    if (supabaseError.code === "404") {
      return "Data not found.";
    }

    return supabaseError.message || "An unknown error occurred";
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle unknown error types
  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred";
};

// Type-safe error checker
export const isSupabaseError = (error: unknown): error is SupabaseError => {
  return (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    typeof (error as SupabaseError).code === "string"
  );
};

// Enhanced error handler with more specific error handling
export const getSupabaseErrorMessage = (error: unknown): string => {
  if (isSupabaseError(error)) {
    switch (error.code) {
      case "PGRST116":
        return "Data tidak ditemukan";
      case "PGRST301":
        return "Terjadi kesalahan saat mengakses database";
      case "401":
        return "Akses tidak diizinkan";
      case "403":
        return "Tidak memiliki izin untuk mengakses data";
      case "404":
        return "Data tidak ditemukan";
      case "409":
        return "Data sudah ada atau terjadi konflik";
      case "422":
        return "Data tidak valid";
      case "500":
        return "Terjadi kesalahan server";
      default:
        return error.message || "Terjadi kesalahan yang tidak diketahui";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Terjadi kesalahan yang tidak diketahui";
};

// Database table types for better type safety
export interface DatabaseTables {
  articles: {
    Row: {
      id: number;
      slug: string;
      title: string;
      excerpt: string;
      content: string;
      category: string;
      author: string;
      date: string;
      image_url: string;
      featured: boolean;
      tags: string[];
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: number;
      slug: string;
      title: string;
      excerpt: string;
      content: string;
      category: string;
      author: string;
      date: string;
      image_url: string;
      featured?: boolean;
      tags?: string[];
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: number;
      slug?: string;
      title?: string;
      excerpt?: string;
      content?: string;
      category?: string;
      author?: string;
      date?: string;
      image_url?: string;
      featured?: boolean;
      tags?: string[];
      created_at?: string;
      updated_at?: string;
    };
  };
}

// Create typed Supabase client
export const typedSupabase = createClient<DatabaseTables>(
  supabaseUrl,
  supabaseKey
);
