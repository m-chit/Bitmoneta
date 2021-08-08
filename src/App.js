import "./App.scss";
import { useEffect } from "react";
import { useOrderBook } from "./hooks/useOrderbook";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Logo from "./components/Logo";

const App = () => {
  const {
    buy,
    sell,
    spread,
    min,
    max,
    currencies,
    currentCurrency,
    changeActualCurrency,
    getOrderBook,
    getMinMax,
    handleIsOpenModal,
    isOpenModal,
    splitedCurrency,
    isOpenModalAnimation,
  } = useOrderBook();

  useEffect(() => {
    getOrderBook();
    getMinMax();
    const intervaGetOrderBooklId = setInterval(() => getOrderBook(), 1000);
    const intervalMinMaxId = setInterval(getMinMax, 10000);
    return () => {
      clearInterval(intervaGetOrderBooklId);
      clearInterval(intervalMinMaxId);
    };
  }, [currentCurrency]);

  return (
    <div className="App">
      <Logo />
      <Navbar
        isOpenModalAnimation={isOpenModalAnimation}
        currentCurrency={currentCurrency}
        isOpenModal={isOpenModal}
        handleIsOpenModal={handleIsOpenModal}
        changeActualCurrency={changeActualCurrency}
        currencies={currencies}
        spread={spread}
        min={min}
        max={max}
      />
      <div className="App__orderbook">
        <Dashboard name="Bid" splitedCurrency={splitedCurrency} orders={buy} />
        <Dashboard name="Ask" splitedCurrency={splitedCurrency} orders={sell} />
      </div>
    </div>
  );
};

export default App;
