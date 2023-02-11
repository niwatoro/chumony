import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  fetch("https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd").then((response) => response.json().then((data) => res.status(200).json(data["matic-network"].usd)));
}
