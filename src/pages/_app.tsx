import { Provider } from "@/components/ui/provider";
import { AppProps } from "next/app";
import Nav from "@/components/Nav";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Nav />
      <Component {...pageProps} />
    </Provider>
  );
}
