import { Contract, utils } from "ethers";

export function initContracts(items) {
  if (!items || !items.length) throw new Error("There are not contracts data");

  return items.reduce((acc, { name, contractAddress, contractAbi }) => {
    if (!name || !contractAddress || !contractAbi) return acc;

    return { ...acc, [name]: getContract(contractAddress, contractAbi) };
  }, {});
}

export function getContract(contractAddress, contractAbi) {
  if (!contractAddress || !contractAbi)
    throw new Error("There is not contract data");

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

export async function deployContract(contractAbi, contractByteCode) {
  if (!contractAddress || !contractAbi)
    throw new Error("There is not contract data");

  const factory = new ContractFactory(contractAbi, contractByteCode);
  const contract = await factory.deploy(deployArgs);

  return contract;
}

export async function deployContracts(items) {
  if (!items || !items.length) throw new Error("There are not contracts data");

  return await Promise.all(
    items.reduce(async (acc, { contractAbi, contractByteCode }) => {
      if (!contractAbi || !contractByteCode) return acc;

      return [...acc, await deployContract(contractAddress, contractAbi)];
    }, [])
  );
}
