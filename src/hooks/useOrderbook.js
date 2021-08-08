import useLocalStorage, { writeStorage } from "@rehooks/local-storage";
import { useEffect, useState } from "react";

const axios = require("axios");

const getSpread = (buy, sell) => sell[0].ra - buy[0].ra;

export const useOrderBook = () => {
  const [currencyFromStorage] = useLocalStorage("currentCurrency");
  const [buy, setBuy] = useState([]);
  const [sell, setSell] = useState([]);
  const [spread, setSpread] = useState(0);
  const [min, setSMin] = useState(0);
  const [max, setSMax] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState(
    currencyFromStorage || "BTC-PLN"
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalAnimation, setIsOpenModalAnimation] = useState(false);
  const [splitedCurrency, setSplitedCurrency] = useState(["BTC", "PLN"]);

  useEffect(() => {
    axios
      .get("https://api.bitbay.net/rest/trading/stats")
      .then((response) => {
        const data = response.data.items;
        const NewCurrencies = Object.values(data).map((el) => el.m);
        setCurrencies(NewCurrencies);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    splitCurrency(currentCurrency);
  }, [currentCurrency]);

  const splitCurrency = (newCurrency) => {
    setSplitedCurrency(newCurrency.split("-", 2));
  };

  const handleIsOpenModal = () => {
    setIsOpenModalAnimation(!isOpenModalAnimation);
    if (isOpenModal) {
      setTimeout(() => setIsOpenModal(!isOpenModal), 500);
    } else {
      setIsOpenModal(!isOpenModal);
    }
  };

  const changeActualCurrency = (newCurrency) => {
    setCurrentCurrency(newCurrency);
    writeStorage("currentCurrency", newCurrency);
    handleIsOpenModal();
    splitCurrency(newCurrency);
    getMinMax();
  };

  const getOrderBook = () => {
    axios
      .get(
        `https://api.bitbay.net/rest/trading/orderbook-limited/${currentCurrency}/10`
      )
      .then((response) => {
        const newBuy = response.data.buy.slice(0).reverse();
        const newSell = response.data.sell;
        setBuy(newBuy);
        setSell(newSell);
        setSpread(getSpread(newBuy, newSell));
      })
      .catch((error) => console.log(error));
  };

  const getMinMax = () => {
    axios
      .get(`https://api.bitbay.net/rest/trading/stats/${currentCurrency}`)
      .then((response) => {
        const data = response.data.stats;
        setSMin(data.l);
        setSMax(data.h);
      })
      .catch((error) => console.log(error));
  };

  return {
    buy,
    sell,
    spread,
    min,
    max,
    currencies,
    currentCurrency,
    splitedCurrency,
    isOpenModal,
    isOpenModalAnimation,
    getOrderBook,
    getMinMax,
    changeActualCurrency,
    handleIsOpenModal,
  };
};
