import { ethers } from "hardhat";
import { MyERC20Token__factory } from "../typechain-types";

async function main() {
  const [deployer, acc1, acc2] = await ethers.getSigners();
  const tokenContractFactory = new MyERC20Token__factory(deployer);
  const tokenContract = await tokenContractFactory.deploy();
  const tokenContractDeployTxReceipt = await tokenContract.deployTransaction.wait();
  console.log("Token Contract Deployed at: ", tokenContract.address, 'at block', tokenContractDeployTxReceipt.blockNumber);

  const minterRoleTag = await tokenContract.MINTER_ROLE();
  console.log(`The minter role tag is ${minterRoleTag}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});