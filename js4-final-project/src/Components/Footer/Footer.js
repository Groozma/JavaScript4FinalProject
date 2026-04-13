import "./Footer.scss";
import HuggingMoney from "../../Images/Hugging - Money.png";

function Footer() {
  return (
    <div className="footer">
      <img src={HuggingMoney} alt="drawn man hugging a bag of money" />

      <div className="developers">
        <p>Developed by:</p>
        <p>Adhip Bashar</p>
        <p>Ryan Maguire</p>
      </div>

      <p>PiggyPal&copy;</p>
    </div>
  );
}

export default Footer;
