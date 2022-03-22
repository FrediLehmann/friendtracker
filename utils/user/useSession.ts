import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const useSession = (): Session | null => {
    const [session, setSession] = useState<Session | null>(supabase.auth.session());

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    }, []);

    return session
}

export default useSession