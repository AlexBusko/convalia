const bitcoinReduser = (state = [], action) => {
  switch (action.type) {
    case "BITCOIN_FETCH_DATA_SUCCESS":
      return action.data;
    default:
      return state;
  }
};

export default bitcoinReduser;
