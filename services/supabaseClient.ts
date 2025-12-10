
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://apuwkpmvkneniagqtxwo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwdXdrcG12a25lbmlhZ3F0eHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNTE2NTcsImV4cCI6MjA4MDkyNzY1N30.hZjcllSrsAjbf__SQgkRtKmByPMfA8X6pfVhao0qdkY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
