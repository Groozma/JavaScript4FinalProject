import "./Transactions.scss";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const q = query(
      collection(db, "expenses"),
      where("uid", "==", user.uid),
      where("date", ">=", oneWeekAgo),
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
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="transactions">
      {transactions.map((trans) => (
        <div key={trans.id} className="columns">
          <span>${trans.amount}</span>
          <span>{trans.category}</span>
          <span>{trans.date.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export default Transactions;
