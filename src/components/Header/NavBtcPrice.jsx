import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bitcoinFetchData } from "../../redux/actions/bitcoinAction";
import "./style.scss";

const Bitcoin = ({ bitcoin, fetchBitcoin }) => {
  useEffect(() => {
    fetchBitcoin();
    setInterval(() => {
      fetchBitcoin();
    }, 60000);
  }, [fetchBitcoin]);

  return (
    <>
      <p className="price">{bitcoin.bpi && bitcoin.bpi.USD.rate_float}</p>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    bitcoin: state.bitcoin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBitcoin: (url) => {
      dispatch(bitcoinFetchData(url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bitcoin);
