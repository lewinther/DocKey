import {createClient} from '@supabase/supabase-js';

// these values are secrets, and in real-life it should be kept in an environment file, not in-code shared on git.
const supabaseUrl = "https://xjyrpqckienfldgpioug.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqeXJwcWNraWVuZmxkZ3Bpb3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwODcwNDksImV4cCI6MjAyNTY2MzA0OX0.jKC4D9-y0S7DEeuaJR7k9I30EG3-KnSyvcTTWXXS77k";

export const supabase = createClient(
    supabaseUrl, 
    supabaseAnonKey
);
