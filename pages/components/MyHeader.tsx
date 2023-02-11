import { Fredoka } from "@next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const fredoka = Fredoka({
  weight: "600",
  subsets: ["latin"],
});

export default function MyHeader(): React.ReactElement {
  const router = useRouter();
  const path = router.pathname;
  const isSell = path.includes("sell");
  const isHome = path === "/";
  const isMyPlaced = path.includes("my/placed");
  const isMyReceived = path.includes("my/received");
  const [openMenu, setOpenMenu] = useState(false);
  const buttonStyle = "rounded-full bg-[rgba(255,255,255,.)] flex justify-center items-center cursor-pointer font-bold";

  return (
    <div className="bg-[#FBFBFB] pb-10">
      <div className="flex justify-between w-screen p-5 border-b-slate-300 border">
        <div className={`${fredoka.className} font-bold text-3xl text-[#333]`}>Chumony</div>
      </div>
      <div className="w-screen py-4 px-8 flex">
        <div className="flex gap-8">
          <Link href={"/sell"}>
            <div className={`${buttonStyle} ${isSell ? "text-[#333]" : "text-[#AAA]"}`}>Place Order</div>
          </Link>
          <Link href={"/"}>
            <div className={`${buttonStyle} ${isHome ? "text-[#333]" : "text-[#AAA]"}`}>Receive Order</div>
          </Link>
          <Link href={"/my/placed"}>
            <div className={`${buttonStyle} ${isMyPlaced ? "text-[#333]" : "text-[#AAA]"}`}>My Placed Orders</div>
          </Link>
          <Link href={"/my/received"}>
            <div className={`${buttonStyle} ${isMyReceived ? "text-[#333]" : "text-[#AAA]"}`}>My Received Orders</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
