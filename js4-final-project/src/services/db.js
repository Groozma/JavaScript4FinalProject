import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
  arrayUnion,
} from "firebase/firestore";

// Get user funds
export const getFunds = async () => {
  const user = auth.currentUser;
  if (!user) return 0;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  return snap.exists() ? snap.data().funds || 0 : 0;
};

// Update user funds
export const updateFunds = async (newAmount) => {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  await updateDoc(ref, { funds: Number(newAmount) });
};

// Add Expense
export const addExpense = async (amount, category) => {
  const user = auth.currentUser;

  if (!user) {
    return { error: "User not logged in" };
  }

  const currentFunds = await getFunds();
  const expenseAmount = Number(amount);

  if (expenseAmount > currentFunds) {
    return {
      error:
        "Insufficient funds — this expense would make your balance negative.",
    };
  }

  await addDoc(collection(db, "expenses"), {
    uid: user.uid,
    amount: expenseAmount,
    category,
    date: serverTimestamp(),
  });

  await updateFunds(currentFunds - expenseAmount);

  return { success: true };
};

// Save new category
export const saveCategory = async (category) => {
  const user = auth.currentUser;
  if (!user) return { error: "User not logged in" };

  try {
    const ref = doc(db, "users", user.uid);

    await updateDoc(ref, {
      categories: arrayUnion(category),
    });

    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
};

// Get transactions
export const getTransactions = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    collection(db, "expenses"),
    where("uid", "==", user.uid),
    orderBy("date", "desc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
