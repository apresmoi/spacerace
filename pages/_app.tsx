import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  SettingsStoreProvider,
  SocketStoreProvider,
  AppStoreProvider,
  ChatStoreProvider,
} from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsStoreProvider>
      <SocketStoreProvider>
        <AppStoreProvider>
          <ChatStoreProvider>
            <Component {...pageProps} />
          </ChatStoreProvider>
        </AppStoreProvider>
      </SocketStoreProvider>
    </SettingsStoreProvider>
  );
}

export default MyApp;
