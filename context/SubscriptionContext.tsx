import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SubscriptionContextType {
    isPremium: boolean;
    subscribe: () => Promise<void>;
    isLoading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
    const [isPremium, setIsPremium] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const storedSub = await AsyncStorage.getItem('isPremium');
                if (storedSub === 'true') {
                    setIsPremium(true);
                }
            } catch (e) {
                console.error('Failed to load subscription', e);
            } finally {
                setIsLoading(false);
            }
        };
        checkSubscription();
    }, []);

    const subscribe = async () => {
        // Simulate payment API call
        return new Promise<void>((resolve) => {
            setTimeout(async () => {
                setIsPremium(true);
                await AsyncStorage.setItem('isPremium', 'true');
                resolve();
            }, 2000);
        });
    };

    return (
        <SubscriptionContext.Provider value={{ isPremium, subscribe, isLoading }}>
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscription() {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
}
