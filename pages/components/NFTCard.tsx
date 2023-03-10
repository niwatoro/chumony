import { MediaRenderer } from "@thirdweb-dev/react";
import Image from "next/image";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function NFTCard({ nft }: { nft: { tokenUri: string; name: string; reward: string; dueDate: string; [key: string]: string } }) {
  return (
    <div
      className={`relative flex cursor-pointer
flex-col overflow-hidden rounded-lg bg-white shadow-lg
transition-all duration-300 hover:shadow-2xl dark:bg-[#333333] w-60 h-96`}
    >
      <MediaRenderer
        src={nft.tokenUri}
        style={{
          objectFit: "cover",
        }}
        className={"h-[244px] rounded-t-lg transition duration-300 ease-in-out hover:scale-105"}
      />
      <div className={`flex flex-col gap-y-3 p-3`}>
        <div className={`text-sm font-semibold`}>{nft.name}</div>
        {nft.reward && (
          <div>
            <div className={`text-xs font-semibold`}>Price</div>
            <div className={`flex items-center gap-x-1`}>
              <Image src={"/images/polygon-matic-logo.svg"} height={16} width={16} alt="matic" />
              <p className={`text-base font-semibold`}>{nft.reward}</p>
            </div>
          </div>
        )}
        {nft.dueDate && (
          <div>
            <div className={`text-xs font-semibold`}>Price</div>
            <div className={`flex items-center gap-x-1`}>
              <AiOutlineClockCircle />
              <p className={`text-base font-semibold`}>{nft.dueDate}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
