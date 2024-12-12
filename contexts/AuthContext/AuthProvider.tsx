'use client';
import { useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '@/firebase/firebaseAuthConfig';
import { useRouter } from "next/navigation";

interface AuthContextProviderProps {
    children: ReactNode;
}


export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const router = useRouter();
     
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUserCredentials: User | null) => {
            setUserAuth(authUserCredentials);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);


    async function logout() {
        let error = null;
        try {
            await signOut(auth);
            router.push('/');
        }
        catch(e) {
            error = e;
        }
        return { error };
    }

    return (
        <AuthContext.Provider value={{ userAuth, logout }}>
            {  authLoading 
                ? 
                        <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
                            <p className='text-lg mb-4'>Loading...</p>
                            <span className="loader"></span>
                        </div> 
                : 
                children
            }
        </AuthContext.Provider>
    );

};