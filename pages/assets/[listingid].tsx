import { useContract, useListing } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineClockCircle } from "react-icons/ai";
import Loading from "../components/Loading";

export default function NFT() {
  const router = useRouter();
  const listingId = router.query.listingid;
  const { contract } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace");
  const { data: nft, isLoading, error } = useListing(contract, listingId as string);

  const buyoutListing = async () => {
    try {
      await contract?.buyoutListing(BigNumber.from(listingId), 1);
    } catch (e) {
      alert(e);
    }
  };

  if (isLoading || !nft) return <Loading />;

  return (
    <div className="flex justify-center gap-10 p-8">
      <div className={"flex rounded-lg overflow-hidden border border-[#e8ebe5] flex-1"}>
        <Image src={nft?.asset.image as string} width={999} height={999} alt="image" />
      </div>

      <div className="flex-1 flex flex-col">
        <div className={"text-2xl font-semibold"}>{nft?.asset?.name}</div>
        <div className={"flex space-x-1 text-sm"}>
          <div className={"text-gray-500"}>Made by</div>
          <div className="cursor-pointer text-blue-500">{nft?.sellerAddress}</div>
        </div>
        <div className="mt-3">{nft.asset.description}</div>
      </div>

      <div className={"flex-1 flex h-fit overflow-hidden flex-col rounded-lg border border-[#e8ebe5]"}>
        <div className={"border-b border-[#e8ebe5] p-3"}>
          <div className={"flex items-center space-x-2 text-sm text-gray-700 md:text-base"}>
            <AiOutlineClockCircle size={24} />
            <p>Sale ends November 26, 2022 at 7:39pm GMT+11</p>
          </div>
        </div>
        <div className={"flex flex-col gap-y-2 bg-slate-50 p-3"}>
          <div className={"text-sm text-gray-500"}>Current Price</div>
          <div className={`flex items-center space-x-3`}>
            <Image src={"/images/polygon-matic-logo.svg"} height={24} width={24} alt="matic" />
            <p className={`text-3xl font-semibold`}>{nft?.buyoutCurrencyValuePerToken?.displayValue}</p>
          </div>
          <button type="button" className="rounded-lg bg-blue-700 px-5 py-4 text-base font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={buyoutListing}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
