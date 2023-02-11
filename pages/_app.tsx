import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AppType } from "next/app";
import "../styles/globals.css";
import AuthProvider from "./components/AuthProvider";
import MyHeader from "./components/MyHeader";

const MyApp: AppType = ({ Component, pageProps }): JSX.Element => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <AuthProvider>
        <div className="bg-[#FBFBFB] text-[#333] min-h-screen">
          <MyHeader />
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </ThirdwebProvider>
  );
};

export default MyApp;
