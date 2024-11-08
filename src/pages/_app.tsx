import { Provider } from "@/components/ui/provider";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}
