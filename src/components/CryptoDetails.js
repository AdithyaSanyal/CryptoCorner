import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import LineChart from "./LineChart";
import Loader from "./Loader";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoAPI";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const price = parseFloat(cryptoDetails?.price);
  const rank = cryptoDetails?.rank;
  const hVol = parseInt(cryptoDetails['24hVolume']);
  const marketCap = parseInt(cryptoDetails?.marketCap);
  const allTimeHigh = parseFloat(cryptoDetails?.allTimeHigh?.price);
  const stats = [
    {
      title: "Price to USD",
      value: price ? millify(price, { precision: 2 }) : price,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: hVol ? millify(hVol, { precision: 2 }) : hVol,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: marketCap ? millify(marketCap, { precision: 2 }) : marketCap,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: allTimeHigh ? millify(allTimeHigh, { precision: 2 }) : allTimeHigh,
      icon: <TrophyOutlined />,
    },
  ];

  const noOfMarkets = parseInt(cryptoDetails?.numberOfMarkets);
  const noOfExchanges = parseInt(cryptoDetails?.numberOfExchanges);
  const approvedSupply = parseFloat(cryptoDetails?.supply?.confirmed);
  const totalSupply = parseInt(cryptoDetails?.supply?.total);
  const cirSupply = parseInt(cryptoDetails?.supply?.circulating);
  const genericStats = [
    {
      title: "Number Of Markets",
      value: noOfMarkets ? millify(noOfMarkets, { precision: 2 }) : noOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: noOfExchanges
        ? millify(noOfExchanges, { precision: 2 })
        : noOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: approvedSupply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: totalSupply ? millify(totalSupply, { precision: 2 }) : totalSupply,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: cirSupply ? millify(cirSupply, { precision: 2 }) : cirSupply,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  let statsList = stats.map(({ icon, title, value }, index) => {
    return (
      <Col key={index}>
        <Col className="coin-stats-name">
          <Typography.Text>{icon}</Typography.Text>
          <Typography.Text>{title}</Typography.Text>
        </Col>
        <Typography.Text className="stats">{value}</Typography.Text>
      </Col>
    );
  });

  let otherStatsList = genericStats.map(({ icon, title, value }) => (
    <Col className="coin-stats">
      <Col className="coin-stats-name">
        <Typography.Text>{icon}</Typography.Text>
        <Typography.Text>{title}</Typography.Text>
      </Col>
      <Typography.Text className="stats">{value}</Typography.Text>
    </Col>
  ));

  const description = cryptoDetails?.description;
  const name = cryptoDetails?.name;
  const links = cryptoDetails?.links;

  let linkList = links?.map((link) => {
    const n = link?.name;
    const t = link?.type;
    const u = link?.url;
    return (
      <Row className="coin-link" key={n ? n : ""}>
        <Typography.Title level={5} className="link-name">
          {t ? t : ""}
        </Typography.Title>
        <a href={u ? u : ""} target="_blank" rel="noreferrer">
          {n ? n : ""}
        </a>
      </Row>
    );
  });
  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Typography.Title level={2} className="coin-name">
            {cryptoDetails?.name} ({cryptoDetails?.symbol})
          </Typography.Title>
          <p>
            {cryptoDetails?.name} live price in US dollars View value
            statistics, market cap and supply
          </p>
        </Col>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Time Period"
          onChange={(val) => setTimePeriod(val)}
        >
          {time.map((item) => (
            <Select.Option key={item}>{item}</Select.Option>
          ))}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={price ? millify(price, { precision: 2 }) : price}
          coinName={cryptoDetails?.name}
        />
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Typography.Title level={3}>
                {cryptoDetails?.name} Value Statistics
              </Typography.Title>
              <p>An overview showing the statistics</p>
            </Col>
            {statsList}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Typography.Title level={3} className="coin-details-heading">
                Other Stats Info
              </Typography.Title>
              <p>
                An overview showing the statistics of {cryptoDetails?.name},
                such as the base and quote currency, the rank, and trading
                volume.
              </p>
            </Col>
            {otherStatsList}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Typography.Title level={3} className="coin-details-heading">
              What is {cryptoDetails?.name}?
              {HTMLReactParser(description ? description : "")}
            </Typography.Title>
          </Row>
          <Col className="coin-links">
            <Typography.Title level={3} className="coin-details-heading">
              {name ? name : ""} Links
            </Typography.Title>
            {linkList}
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default CryptoDetails;
