import { ReactNode } from 'react';
import { AuthProvider } from './everything/Context';
export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Charter:wght@400;700&display=swap" />
            </head>
            <body>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
            </body>
        </html>
    );
}
