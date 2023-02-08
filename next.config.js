/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gateway.ipfscdn.io", "ipfs.io", "ipfs.infura.io"],
  },
};

module.exports = nextConfig;
