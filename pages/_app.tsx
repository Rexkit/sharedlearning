import '../styles/globals.css';
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '../features/auth/AuthProvider';
import { AppProps } from 'next/app';
import { ProtectRoute } from '../features/auth/protectRoute';

const client = new ApolloClient<NormalizedCacheObject>({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/api/graphql",
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider attribute="class" enableSystem={false}>
                <AuthProvider>
                    <ProtectRoute>
                        <Component {...pageProps} />
                    </ProtectRoute>
                </AuthProvider>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default MyApp;