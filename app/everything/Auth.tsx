'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from './Context';
const Auth = ({ children }: { children: React.ReactNode }) => {
    const auth = useContext(AuthContext);
    const rout = useRouter();
    useEffect(() => {
        if (!auth?.isAuthenticated) {
            rout.push('/login');
        }
    }, [auth, rout]);
    if (!auth?.isAuthenticated) {
        return <div>Logging in...</div>;
    }
    return <>{children}</>;
};
export default Auth;
