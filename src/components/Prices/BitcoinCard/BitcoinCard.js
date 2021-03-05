import { ReactComponent as Wreath } from "../../../assets/images/wreath_loader.svg";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bitcoinFetchData } from "../../../redux/actions/bitcoinAction";
import { Card } from "antd";
import "./style.scss";

const BitcoinCard = ({ fetchBitcoin, bitcoin }) => {
  useEffect(() => {
    fetchBitcoin();
    setInterval(() => {
      fetchBitcoin();
    }, 60000);
  }, [fetchBitcoin]);

  return (
    <Card size="small" className="bitcoin-card">
      {!bitcoin ? (
        <Wreath />
      ) : (
        <>
          <div className="title">
            <p className="name">
              <i>bitcoin</i>
            </p>
            <p className="name">coindesk</p>
          </div>
          <p className="price">{bitcoin.bpi && bitcoin.bpi.USD.rate_float} $</p>

          <p className="time">
            {bitcoin.time &&
              (() => {
                let date = new Date(bitcoin.time.updated);
                let toutc = date.toUTCString();
                let locdat = new Date(toutc + " UTC");
                return locdat.toString().slice(4, 25);
              })()}
          </p>
        </>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    bitcoin: state.bitcoin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBitcoin: () => {
      dispatch(bitcoinFetchData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinCard);
