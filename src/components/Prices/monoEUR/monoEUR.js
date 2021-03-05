import { ReactComponent as Wreath } from "../../../assets/images/wreath_loader.svg";
import React from "react";
import { Card } from "antd";
import "./style.scss";

const MonoEUR = ({ monobank }) => {
  return (
    <Card size="small" className="mono-card">
      {!monobank || !monobank[1] ? (
        <Wreath />
      ) : (
        <>
          <div className="name">
            <p>monobank</p>
            <p>EUR</p>
          </div>
          <p className="price">
            <span>{monobank[1].rateBuy}</span>
            <span> / </span>
            <span>{monobank[1].rateSell}</span>
          </p>

          <p className="time">
            {monobank &&
              (() => {
                let unixdate = monobank[1].date;
                let date = new Date(unixdate * 1000);
                return date.toString().slice(4, 16);
              })()}
          </p>
        </>
      )}
    </Card>
  );
};

export default MonoEUR;
