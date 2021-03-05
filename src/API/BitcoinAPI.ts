import axios from "axios";

let url = "https://api.coindesk.com/v1/bpi/currentprice.json";

export const getCoinDeskAPI = () => {
  return axios.get(url).then((response) => response.data);
};
