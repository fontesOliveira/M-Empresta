import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://unnfnevpsqcgzwdfefqj.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubmZuZXZwc3FjZ3p3ZGZlZnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDM4MTUsImV4cCI6MjA5NzAxOTgxNX0.sGK_azPw771NQhv09qat8A2BB35KaZiTysw2OqONabQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
