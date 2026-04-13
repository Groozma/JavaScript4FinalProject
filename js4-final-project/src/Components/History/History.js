import "./History.scss";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Nav from "../Nav/Nav";

function History() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) return;

      const q = query(
        collection(db, "expenses"),
        where("uid", "==", user.uid),
        orderBy("date", "desc"),
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            amount: data.amount,
            category: data.category,
            date: data.date?.toDate ? data.date.toDate() : new Date(),
          };
        });

        setTransactions(list);
        setLoading(false);
      });

      return () => unsubscribe();
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="history-page">
      <h2>Full Expense History</h2>

      <Nav />

      <div className="columns header-row">
        <div>Amount</div>
        <div>Category</div>
        <div>Date & Time</div>
      </div>

      {loading && <p>Loading...</p>}

      <div className="history-list">
        {transactions.map((trans) => (
          <div key={trans.id} className="columns row">
            <span>${trans.amount}</span>
            <span>{trans.category}</span>
            <span>{trans.date.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
