import { Row, Col } from "antd";
import React, { useEffect } from "react";
import BitcoinCard from "./BitcoinCard/BitcoinCard";
import MonobankCard from "./monoUSD/monoUSD";
import MonoEUR from "./monoEUR/monoEUR";
import { connect } from "react-redux";
import { monobankFetchData } from "../../redux/actions/monobankAction";

const Prices = ({ fetchMonobank, monobank }) => {
  useEffect(() => {
    setInterval(() => fetchMonobank(), 3600000);
    fetchMonobank();
  }, [fetchMonobank]);

  return (
    <div>
      <Row
        justify="center"
        gutter={[
          { xs: 8, sm: 16, md: 32 },
          { xs: 8, sm: 16, md: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={8} lg={6}>
          <BitcoinCard />
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <MonobankCard monobank={monobank} />
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <MonoEUR monobank={monobank} />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { monobank: state.monobank };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMonobank: () => {
      dispatch(monobankFetchData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prices);
