import { Fredoka } from "@next/font/google";
import Link from "next/link";

const fredoka = Fredoka({
  weight: "600",
  subsets: ["latin"],
});

export default function MyHeader(): React.ReactElement {
  return (
    <div>
      <div className={`${fredoka.className} w-screen bg-[#3e2d5e] text-[#caf5b0] font-bold text-3xl p-5`}>Chumony</div>
      <div className="w-screen flex pl-16 gap-4 bg-[rgba(62,45,94,.8)] text-white py-2">
        <Link href={"/sell"}>
          <button className="rounded-full bg-[rgba(255,255,255,.)] w-40 h-10 flex justify-center items-center font-bold">Make orders</button>
        </Link>
        <Link href={"/"}>
          <button className="rounded-full bg-[rgba(255,255,255,.)] w-40 h-10 flex justify-center items-center font-bold">Receive orders</button>
        </Link>
      </div>
    </div>
  );
}
