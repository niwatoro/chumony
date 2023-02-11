import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { NextPage } from "next";
import Link from "next/link";
import NFTCard from "../components/NFTCard";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(process.env.NEXT_PUBLIC_COLLECTION_ADDRESS);
  const { data: nfts, isLoading, error } = useOwnedNFTs(contract, address);
  console.log(nfts);

  return (
    <div className={"space-y-4 px-8 py-2"}>
      <div className="w-fit gap-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 pb-10">
        {nfts &&
          nfts.map((nft, index) => {
            return (
              <Link key={index} href={`assets/${nft.metadata.id}`}>
                <NFTCard
                  nft={{
                    name: nft.metadata.name as string,
                    tokenUri: nft.metadata.image as string,
                    reward: nft.metadata?.reward?.toString() ?? "N/A",
                    dueDate: nft.metadata?.dueDate?.toString() ?? "N/A",
                  }}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
