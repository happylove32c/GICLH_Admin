
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://edhjzdlzzjmkggptkfop.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkaGp6ZGx6empta2dncHRrZm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTQxNTIsImV4cCI6MjA1NzAzMDE1Mn0.TX0QErQx2YebWGieP0jvKGbbp0Kxt_uhgibS47G8Dt4'
const supabase = createClient(supabaseUrl, supabaseKey)