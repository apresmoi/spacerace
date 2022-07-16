import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  SettingsStoreProvider,
  SocketStoreProvider,
  AppStoreProvider,
  ChatStoreProvider,
  GameStore,
} from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsStoreProvider>
      <SocketStoreProvider>
        <AppStoreProvider>
          <ChatStoreProvider>
            <GameStore>
              <Component {...pageProps} />
            </GameStore>
          </ChatStoreProvider>
        </AppStoreProvider>
      </SocketStoreProvider>
    </SettingsStoreProvider>
  );
}

export default MyApp;
