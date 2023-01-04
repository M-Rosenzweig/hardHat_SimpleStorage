// import ethers from " hardhat ethers";
const { ethers, run, network } = require("hardhat");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
// require()

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying SimpleStorage...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`SimpleStorage deployed to: ${simpleStorage.address}`);
  if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying contract on Etherscan...");
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value: ${currentValue.toString()}`);
  // update the value
  const transactionResponse = await simpleStorage.store(613);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value: ${updatedValue.toString()}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log("Contract verified!");
  } catch (error) {
    if (error.message.includes("Contract source code already verified")) {
      console.log("Contract already verified, skipping...");
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => process.exit(0)) // Success
  .catch((error) => {
    console.error(error);
    process.exit(1); // Failure
  }); // End of main() function
