import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AppType } from "next/app";
import "../styles/globals.css";
import AuthProvider from "./components/AuthProvider";
import MyHeader from "./components/MyHeader";

const MyApp: AppType = ({ Component, pageProps }): JSX.Element => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <AuthProvider>
        <MyHeader />
        <Component {...pageProps} />
      </AuthProvider>
    </ThirdwebProvider>
  );
};

export default MyApp;
