'use client';

import { useContext, useEffect } from 'react';
import { AuthContext } from './everything/Context';
import Posts from './everything/Posts';
import { useRouter } from 'next/navigation';
export default function HomePage() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login');
        } else {
            authContext?.setIsAuthenticated(true);
        }
    }, [authContext, router]);
    if (!authContext?.isAuthenticated) {
        return <div>Logging in...</div>;
    }
    return (
        <div>
            <Posts />
        </div>
    );
}
