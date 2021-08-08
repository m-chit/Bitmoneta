import { Fragment } from "react";
import "./Modal.scss";

const Modal = ({
  currencies,
  handleIsOpenModal,
  changeActualCurrency,
  isOpenModalAnimation,
}) => {
  return (
    <Fragment>
      <div
        className={`Modal ${isOpenModalAnimation ? "modalOpen" : "modalClose"}`}
        onClick={() => handleIsOpenModal()}
      />
      <div
        className={`Body ${
          isOpenModalAnimation ? "modalOpenBody" : "modalCloseBody"
        }`}
      >
        <div onClick={() => handleIsOpenModal()} className="Body__closeButton">
          <i className="glyphicon glyphicon-remove"></i>
        </div>
        <div className="Body__list">
          {currencies.map((el) => (
            <div
              key={el}
              onClick={() => changeActualCurrency(el)}
              className="Body__list--element"
            >
              {el}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
