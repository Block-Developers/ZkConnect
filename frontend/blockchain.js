import Web3 from "web3";
import abi from "./abi.json";
import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
const { ethereum } = isBrowser();
if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}


const Address = "0x294624E8256fEe71F13859B712C1ab7EF30d1F2B";



export const mint = async ({ account,name, designation, experience  }) => {
    console.log(account,name, designation, experience );
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
  
    console.log(provider);
    const signer = provider.getSigner();
    let skill = "dev";
    let tokenURI = "https://blush-nursing-mandrill-661.mypinata.cloud/ipfs/QmSWN5DxaybPdEPKvS6m9tJycakkXGAWnAcQewtiSSCbhs";
    console.log(signer);
    const Role = new ethers.Contract(Address, abi, signer);
    console.log(Role);
    const tokenId = await Role.mintEmployeeNFT(account,name, designation, experience ,skill,tokenURI, {gasLimit: 5000000});
    console.log(tokenId);
    return tokenId;
  };
  
  export const getEmployeeNFT = async ({employeeAddress}) => {
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
    const signer = provider.getSigner();
    const Role = new ethers.Contract(Address, abi, signer);
    const tokenId = await Role.getEmployeeNFT(employeeAddress);
    return tokenId;
  };
  