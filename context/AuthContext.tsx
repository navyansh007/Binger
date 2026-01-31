import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    isCreator?: boolean;
    verificationStatus?: 'idle' | 'pending' | 'verified' | 'rejected';
    bio?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signIn: (email?: string, password?: string) => Promise<boolean>;
    signOut: () => Promise<void>;
    signUp: () => Promise<void>;
    upgradeToCreator: (details: { name: string; bio: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for persisted user on mount
        const checkUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (e) {
                console.error('Failed to load user', e);
            } finally {
                setIsLoading(false);
            }
        };

        checkUser();
    }, []);

    const signIn = async (email?: string, password?: string) => {
        // Dummy authentication logic
        if (email === 'user@binger.com' && password === 'password') {
            const mockUser: User = {
                id: '1',
                name: 'Binger User',
                email: 'user@binger.com',
                isCreator: false,
                verificationStatus: 'idle',
            };
            setUser(mockUser);
            await AsyncStorage.setItem('user', JSON.stringify(mockUser));
            return true;
        }
        return false;
    };

    const signUp = async () => {
        // Signup always succeeds for demo, same user
        const mockUser: User = {
            id: '1',
            name: 'New User',
            email: 'new@example.com',
            isCreator: false,
            verificationStatus: 'idle',
        };
        setUser(mockUser);
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    };

    const upgradeToCreator = async (details: { name: string; bio: string }) => {
        if (!user) return;

        const updatedUser: User = {
            ...user,
            name: details.name, // Update display name
            bio: details.bio,
            isCreator: true,
            verificationStatus: 'verified', // Auto-verify for demo
        };

        setUser(updatedUser);
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const signOut = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signOut, signUp, upgradeToCreator }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
