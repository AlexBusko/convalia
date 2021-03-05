import { getMonobankAPI } from "../../API/monobankAPI";

export const monobankFetchDataSuccessAction = (data) => {
  return { type: "MONOBANK_FETCH_DATA_SUCCESS", data };
};

export const monobankFetchData = () => {
  return (dispatch) => {
    getMonobankAPI().then((data) =>
      dispatch(monobankFetchDataSuccessAction(data))
    );
  };
};
