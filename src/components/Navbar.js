import Modal from "./Modal";
import "./Navbar.scss";

const Navbar = ({
  currentCurrency,
  handleIsOpenModal,
  isOpenModal,
  changeActualCurrency,
  currencies,
  spread,
  min,
  max,
  isOpenModalAnimation,
}) => {
  return (
    <div className="Navbar">
      <div
        className="Navbar__changeCurrency"
        onClick={() => handleIsOpenModal()}
      >
        <div className="Navbar__changeCurrency--button">
          {currentCurrency}{" "}
          <i className="glyphicon glyphicon-triangle-bottom"></i>
        </div>
      </div>
      {isOpenModal && (
        <Modal
          isOpenModalAnimation={isOpenModalAnimation}
          currencies={currencies}
          changeActualCurrency={changeActualCurrency}
          handleIsOpenModal={handleIsOpenModal}
        />
      )}
      <div className="Navbar__spread">
        <div className="Navbar__spread--title">Spread</div>{" "}
        <div className="Navbar__spread--number">{spread}</div>{" "}
      </div>
      <div className="Navbar__minmax">
        <div className="Navbar__minmax--titleMax">High 24h</div>
        <div className="Navbar__minmax--max">{max} </div>
        <div className="Navbar__minmax--titleMin">Low 24h</div>
        <div className="Navbar__minmax--min">{min}</div>
      </div>
    </div>
  );
};

export default Navbar;
