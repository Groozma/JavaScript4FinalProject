import "./Home.scss";
import Nav from "../Nav/Nav";

function Home({ firstName, funds, onUpdateFunds }) {
  return (
    <div className="home">
      <h2 className="home-title">Welcome {firstName} to PiggyPal!</h2>
      <div className="home-wrapper">

        <Nav onUpdateFunds={onUpdateFunds} />

        <div className="balance-box">
          <h3>Total Funds Available: ${funds}</h3>
        </div>
      </div>
    </div>
  );
}

export default Home;
