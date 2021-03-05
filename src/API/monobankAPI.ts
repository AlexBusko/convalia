import axios from "axios";

let url = "https://api.monobank.ua/bank/currency";


type  MonobanlCurrencyType = {
  currencyCodeA: number,
  currencyCodeB: number,
  date: number,
  rateSell: number,
  rateBuy: number,
  rateCross: number
}

type MonobankResponceType = {
  data: Array<MonobanlCurrencyType>
}

export const getMonobankAPI = () => {
  return axios.get<MonobankResponceType>(url).then((response) => response.data);
};
