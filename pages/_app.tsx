import '../styles/globals.css';
import Head from 'next/head';
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '../features/auth/AuthProvider';
import { AppProps } from 'next/app';
import { ProtectRoute } from '../features/auth/protectRoute';
import configData from "../config";

const client = new ApolloClient<NormalizedCacheObject>({
    cache: new InMemoryCache(),
    uri: `${configData.APP_URL}/api/graphql`,
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider attribute="class" enableSystem={false}>
                <AuthProvider>
                    <ProtectRoute>
                        <Head>
                            <title>SharedLearning</title>
                            <link rel="shortcut icon" href="/favicon.ico" />
                            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        </Head>
                        <Component {...pageProps} />
                    </ProtectRoute>
                </AuthProvider>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default MyApp;