import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import CryptoCurrency from "../components/CryptoCurrency";
import News from "../components/News";
import Loader from "./Loader";

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;
  return (
    console.log(data),
    <>
      <Typography.Title level={2} className="heading">
        Global Crypto Stats
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total CryptoCurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={globalStats.totalExchanges}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Top 10 Cryptocurrencies
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/cryptocurrency">Show more</Link>
        </Typography.Title>
      </div>
      <CryptoCurrency simplified />
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Latest Crypto News
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/news">Show more</Link>
        </Typography.Title>
      </div>
      <News simplified />
    </>
  );
};

export default HomePage;
