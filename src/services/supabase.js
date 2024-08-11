import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bhfkgdpemavljlspcnkc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoZmtnZHBlbWF2bGpsc3BjbmtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0MTM5MjQsImV4cCI6MjAzODk4OTkyNH0.g83tC43zsE2yp5hTwLKNjP6s2qjPiKM7tHGCxRT6_gs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
