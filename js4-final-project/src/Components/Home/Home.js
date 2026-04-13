import "./Home.scss";
import Nav from "../Nav/Nav";

function Home({ firstName, funds, onUpdateFunds }) {
  return (
    <div className="home-wrapper">
      <h2 className="home-title">Welcome {firstName} to PiggyPal!</h2>

      <Nav onUpdateFunds={onUpdateFunds} />

      <div className="balance-box">
        <h3>Total Funds Available: ${funds}</h3>
      </div>
    </div>
  );
}

export default Home;
