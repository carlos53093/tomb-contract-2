import hre, { ethers, network, } from 'hardhat';
import { Address, encodeAbiParameters } from 'viem';

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  const [ownerWalletClient] = await hre.viem.getWalletClients();
  const owner = ownerWalletClient.account.address;
  const evmChainId = network.config.chainId;
  console.log('chainId :>> ', evmChainId);
  console.log('owner :>> ', owner);

  const StableCoin = await ethers.getContractFactory('TaxOracle');

  const stableCoin = await StableCoin.deploy("0xecad0aCcE4597D5609b68EB37DaD8a1565338339", "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", "0xe808a5047e937fD9D3A6ECDEa920B735c6Bc8e65");
  await stableCoin.deployed();
  console.log(`StableCoin proxy deployed to: ${stableCoin.address}`);

  await new Promise((resolve) => setTimeout(resolve, 30000));

  await hre.run('verify:verify', {
    address: stableCoin.address,
    constructorArguments: ["0xecad0aCcE4597D5609b68EB37DaD8a1565338339", "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", "0xe808a5047e937fD9D3A6ECDEa920B735c6Bc8e65"],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
