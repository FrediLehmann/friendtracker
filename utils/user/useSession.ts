import { Session } from '@supabase/supabase-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const useSession = (): Session | null => {
    const [session, setSession] = useState<Session | null>(supabase.auth.session());

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            axios.post('/api/auth', { event, session }, { headers: { 'Content-Type': 'application/json', Credential: 'same-origin' } })

            setSession(session)
        });
    }, []);

    return session
}

export default useSession