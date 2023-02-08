import { useActiveListings, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Link from "next/link";
import Loading from "./components/Loading";
import NFTCard from "./components/NFTCard";

const Home: NextPage = () => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace");
  const { data: nfts, isLoading, error } = useActiveListings(contract);

  if (isLoading || !nfts) return <Loading />;

  return (
    <>
      <div className={"space-y-4 px-8 py-2"}>
        <div className={"text-2xl font-semibold"}>Active Listings</div>
        <div className="flex gap-5">
          {nfts &&
            nfts.map((nft, index) => {
              return (
                <Link key={index} href={`assets/${nft.id}`}>
                  <NFTCard
                    nft={{
                      name: nft.asset.name as string,
                      tokenUri: nft.asset.image as string,
                      price: nft.buyoutCurrencyValuePerToken?.displayValue,
                    }}
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
