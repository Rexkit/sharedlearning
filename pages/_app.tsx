import '../styles/globals.css';
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';

const client = new ApolloClient<NormalizedCacheObject>({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/api/graphql",
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider attribute="class" enableSystem={false}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default MyApp;