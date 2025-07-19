// src/integrations/supabase/client.ts

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types'; // Keep this if your types file exists

const SUPABASE_URL = 'https://xhjjovlfqzuolsbqhtot.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoampvdmxmcXp1b2xzYnFodG90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMjU3MzcsImV4cCI6MjA2NjYwMTczN30.eyhTqeJUucuFhimtoFrKdu5apM5HHkndcr66gwBCQbI';

// Create a typed client (if Database type exists)
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
