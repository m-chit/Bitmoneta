import "./Dashboard.scss";

const Dashboard = ({ name, orders, splitedCurrency }) => {
  return (
    <div className="Dashboard">
      <div className="Dashboard__navbar">
        <div className={`Dashboard__navbar--title ${name}`}>{name} </div>
        <div className="Dashboard__navbar--tableTop">
          <div>Price</div>
          <div> Amount {splitedCurrency[0]}</div>
          <div>Total {splitedCurrency[1]}</div>
          <div>Count</div>
        </div>
      </div>

      <div className="Dashboard__list">
        {orders.map((el) => (
          <div className="Dashboard__list--element" key={el.key + el.ra}>
            <div> {el.ra} </div>
            <div>{el.ca} </div>
            <div>{(el.ra * el.ca).toFixed(2)}</div>
            <div> {el.co} </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
