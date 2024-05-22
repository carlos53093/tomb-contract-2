import hre, { ethers, network, } from 'hardhat';
import { Address, encodeAbiParameters } from 'viem';

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  const [ownerWalletClient] = await hre.viem.getWalletClients();
  const owner = ownerWalletClient.account.address;
  const evmChainId = network.config.chainId;
  console.log('chainId :>> ', evmChainId);
  console.log('owner :>> ', owner);

  const StableCoin = await ethers.getContractFactory('Treasury');

  const stableCoin = await StableCoin.deploy();
  await stableCoin.deployed();
  console.log(`StableCoin proxy deployed to: ${stableCoin.address}`);

  await new Promise((resolve) => setTimeout(resolve, 30000));

  await hre.run('verify:verify', {
    address: stableCoin.address,
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
