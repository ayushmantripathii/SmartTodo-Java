import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wgqidytgwhdyvakigjcl.supabase.co';
const supabaseAnonKey = 'sb_publishable_PglQLjlMcRb_If05lvZUZA_Tx51Ewp3';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
