import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AppType } from "next/app";
import "../styles/globals.css";
import AuthProvider from "./components/AuthProvider";

const MyApp: AppType = ({ Component, pageProps }): JSX.Element => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThirdwebProvider>
  );
};

export default MyApp;
