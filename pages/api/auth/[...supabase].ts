import { handleAuth } from '@supabase/supabase-auth-helpers/nextjs';

// https://github.com/supabase-community/supabase-auth-helpers/blob/next/src/nextjs/README.md#basic-setup
export default handleAuth({ logout: { returnTo: '/' } });