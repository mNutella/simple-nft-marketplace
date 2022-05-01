import { Contract, ContractFactory, utils } from "ethers";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { Contract as SmartContract } from "@ethersproject/contracts";

export function initContracts(items) {
  if (!items || !items.length) throw new Error("There are not contracts data");

  return items.reduce((acc, { contractAddress, contractAbi }) => {
    if (!contractAddress || !contractAbi) return acc;

    const contract = getContract(contractAddress, contractAbi);

    return { ...acc, [contractAddress]: contract };
  }, {});
}

export function initFactories(items) {
  if (!items || !items.length) throw new Error("There are not factories data");

  return items.reduce((acc, { name, contractAbi, contractBytecode }) => {
    if (!name || !contractAbi || !contractBytecode) return acc;

    const factory = new ContractFactory(contractAbi, contractBytecode);

    return { ...acc, [name]: factory };
  }, {});
}

export function getContract(contractAddress, contractAbi) {
  if (!contractAddress || !contractAbi)
    throw new Error("The contract data is not full");

  const contractInterface = new utils.Interface(contractAbi);
  const contract = new Contract(contractAddress, contractInterface);

  return contract;
}

export function getContracts(items) {
  if (!items || !items.length) throw new Error("There are not contracts data");

  return items.reduce((acc, { contractAddress, contractAbi }) => {
    if (!contractAddress || !contractAbi) return acc;

    return [...acc, getContract(contractAddress, contractAbi)];
  }, []);
}

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getContractByProvider(address, abi, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new SmartContract(address, abi, getProviderOrSigner(library, account));
}
