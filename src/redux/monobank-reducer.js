const monobankReducer = (state = [], action) => {
  switch (action.type) {
    case "MONOBANK_FETCH_DATA_SUCCESS":
      return action.data;
    default:
      return state;
  }
};

export default monobankReducer;
