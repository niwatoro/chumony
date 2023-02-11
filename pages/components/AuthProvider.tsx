import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { ReactElement, useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }): ReactElement {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const address = useAddress();

  useEffect(() => {
    if (address) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, [address]);

  if (!isLoggedin) {
    return (
      <div className={"flex h-screen w-screen items-center justify-center"}>
        <div>
          <h1 className={"text-lg mb-2"}>Please login to continue...</h1>
          <ConnectWallet accentColor="#0093AF" colorMode="light" />
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
