export const ADD_CONTRACT_TYPE = "addContract";
export const REMOVE_CONTRACT_TYPE = "removeContract";
export const ADD_FACTORY_TYPE = "addFactory";
export const REMOVE_FACTORY_TYPE = "removeContract";

export function reducer(state, { type, payload }) {
  switch (type) {
    case ADD_CONTRACT_TYPE: {
      return { ...state, contracts: { [payload.name]: payload.contract } };
    }
    case REMOVE_CONTRACT_TYPE: {
      const clone = { ...state };
      delete clone.contracts[payload.name];

      return clone;
    }
    case ADD_FACTORY_TYPE: {
      return { ...state, factories: { [payload.name]: payload.factory } };
    }
    case REMOVE_CONTRACT_TYPE: {
      const clone = { ...state };
      delete clone.factories[payload.name];

      return clone;
    }
    default:
      throw new Error("Undefined type");
  }
}
