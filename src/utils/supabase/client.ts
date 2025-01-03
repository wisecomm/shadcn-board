import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    "https://qvaxveetqptjuvejgjme.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2YXh2ZWV0cXB0anV2ZWpnam1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NDc5NTAsImV4cCI6MjA1MTIyMzk1MH0.ZU1qtEp0oyPrmbH16W4kgc8nBhn38Wm22hYYoUMWLOI"
  );

export const supabase = createClient();
