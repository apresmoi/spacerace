import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StoreProvider } from "../store";
import { SocketStoreProvider } from "../socket/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketStoreProvider>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SocketStoreProvider>
  );
}

export default MyApp;
