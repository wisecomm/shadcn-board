import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient('https://qvaxveetqptjuvejgjme.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2YXh2ZWV0cXB0anV2ZWpnam1lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTY0Nzk1MCwiZXhwIjoyMDUxMjIzOTUwfQ.AntJpM-vwy_bCbU0OsizUYxljHt4KyWz82JezCo11dU')!;
//export const supabase = createClient(supabaseUrl, supabaseKey)!;

