// src/utils/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error("Supabase error:", error);

  if (error.code === "PGRST116") {
    return "Table not found. Please check your database schema.";
  }

  if (error.code === "401") {
    return "Unauthorized access. Please check your API keys.";
  }

  if (error.code === "404") {
    return "Data not found.";
  }

  return error.message || "An unknown error occurred";
};
