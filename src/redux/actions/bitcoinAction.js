import { getCoinDeskAPI } from "../../API/BitcoinAPI";

export const bitcoinFetchDataSuccess = (data) => {
  return { type: "BITCOIN_FETCH_DATA_SUCCESS", data };
};

export const bitcoinFetchData = () => {
  return (dispatch) => {
    getCoinDeskAPI().then((data) => dispatch(bitcoinFetchDataSuccess(data)));
  };
};
