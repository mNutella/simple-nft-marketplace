export const ADD_CONTRACT_TYPE = "addContract";
export const REMOVE_CONTRACT_TYPE = "removeContract";

export function reducer(state, { type, payload }) {
  switch (type) {
    case ADD_CONTRACT_TYPE:
      if (payload.name in state) {
        const contracts = Array.isArray(state[payload.name])
          ? state[payload.name]
          : [state[payload.name]];

        return { ...state, [payload.name]: [...contracts, payload.contract] };
      }

      return { ...state, [payload.name]: payload.contract };
    case REMOVE_CONTRACT_TYPE:
      // TODO: doesn't support array
      const clone = { ...state };
      delete clone[payload.name];

      return clone;
    default:
      throw new Error("Undefined type");
  }
}
