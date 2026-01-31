import { Href, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import SplashScreen from '../components/auth/SplashScreen';
import { useAuth } from '../context/AuthContext';

export default function Index() {
    const { user, isLoading } = useAuth();
    const [isSplashFinished, setIsSplashFinished] = useState(false);

    useEffect(() => {
        // Show splash for at least 2 seconds for effect
        const timer = setTimeout(() => {
            setIsSplashFinished(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading || !isSplashFinished) {
        return <SplashScreen />;
    }

    if (user) {
        return <Redirect href={'/(tabs)' as Href} />;
    }

    return <Redirect href={'/(auth)/welcome' as Href} />;
}
