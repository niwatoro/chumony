import { useAddress, useContract } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";

const Home: NextPage = () => {
  const router = useRouter();
  const collectionContract = useContract(process.env.NEXT_PUBLIC_COLLECTION_ADDRESS, "nft-collection").contract;
  const address = useAddress();
  const [image, setImage] = useState("");
  const marketplaceContract = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace").contract;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [date, setDate] = useState<Date>();

  const handleMakingOrder = async () => {
    if (address === undefined || process.env.NEXT_PUBLIC_COLLECTION_ADDRESS === undefined) return;

    const result = await collectionContract?.mintTo(address, {
      name: name,
      description: description,
      image: image,
    });

    if (result?.id === undefined) return;

    await marketplaceContract?.direct.createListing({
      assetContractAddress: process.env.NEXT_PUBLIC_COLLECTION_ADDRESS,
      buyoutPricePerToken: reward,
      listingDurationInSeconds: 60 * 60 * 24 * 7,
      quantity: 1,
      startTimestamp: new Date(),
      tokenId: result?.id,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
    });

    router.replace("/");
  };

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file === undefined) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center p-8">
        <div className="w-[500px] flex flex-col justify-center items-center">
          {image == "" ? (
            <label className="border border-[#e8ebe5] rounded-lg flex gap-1 justify-center items-center w-64 h-64">
              <BiImageAdd size={30} />
              <div>Select an image</div>
              <input accept="image/*" type={"file"} className="hidden" onChange={handleImageSelection} />
            </label>
          ) : (
            <div className="flex w-64 h-64 border border-[#e8ebe5] rounded-lg overflow-hidden relative">
              <button className="top-0 right-0 absolute rounded-full w-12 h-12 p-1 m-2 bg-[rgba(0,0,0,.5)]" onClick={() => setImage("")}>
                <Image src={"images/close.svg"} width={999} height={999} alt="close" />
              </button>
              <Image src={image} width={999} height={999} alt="image" />
            </div>
          )}
          <div className="flex w-full">Name</div>
          <input className="w-full h-10 rounded-lg mb-4 border border-[#e8ebe5] p-2" placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <div className="flex w-full">Description</div>
          <input className="w-full h-10 rounded-lg mb-4 border border-[#e8ebe5] p-2" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
          <div className="flex w-full">Reward</div>
          <input className="w-full h-10 rounded-lg mb-4 border border-[#e8ebe5] p-2" placeholder="Reward" type={"number"} onChange={(e) => setReward(e.target.value)} />
          <div className="flex w-full">Due</div>
          <input className="w-full h-10 rounded-lg mb-4 border border-[#e8ebe5] p-2" placeholder="Due" type={"date"} onChange={(e) => setDate(new Date(e.target.value))} />
          <div>
            <button className="rounded-full bg-[#3e2d5e] text-[#caf5b0] w-64 h-10 flex justify-center items-center font-bold mt-4" onClick={handleMakingOrder}>
              Make the order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
