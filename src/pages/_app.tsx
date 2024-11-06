import Routers from "@/routers/Routers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/reduxs/Store";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Routers></Routers>
    </Provider>
  );
}
