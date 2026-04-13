import "./App.scss";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import History from "./Components/History/History";
import AddExpense from "./Components/AddExpense/AddExpense";

import Help from "./Help/Help";
import HelpAbout from "./Help/HelpAbout/HelpAbout";
import HelpIncome from "./Help/HelpIncome/HelpIncome";
import HelpExpenses from "./Help/HelpExpenses/HelpExpenses";
import HelpCategories from "./Help/HelpCategories/HelpCategories";

import FundsPopup from "./Components/FundsPopup/FundsPopup";

import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const [firstName, setFirstName] = useState("");
  const [funds, setFunds] = useState(0);
  const [showFundsPopup, setShowFundsPopup] = useState(false);

  // Global firestore listener
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setFirstName(data.firstName || user.displayName || "");
        setFunds(Number(data.funds ?? 0));
      }

      onSnapshot(ref, (snap) => {
        if (snap.exists()) {
          setFunds(Number(snap.data().funds ?? 0));
        }
      });
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        <Header onUpdateFunds={() => setShowFundsPopup(true)} />

        {showFundsPopup && (
          <FundsPopup
            user={auth.currentUser}
            currentFunds={funds}
            firstName={firstName}
            onClose={(newFunds) => {
              setFunds(newFunds);
              setShowFundsPopup(false);
            }}
          />
        )}

        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/home"
              element={
                <Home
                  firstName={firstName}
                  funds={funds}
                  onUpdateFunds={() => setShowFundsPopup(true)}
                />
              }
            />

            <Route path="/history" element={<History />} />
            <Route path="/add-expense" element={<AddExpense />} />

            <Route path="/help" element={<Help />}>
              <Route index element={<HelpAbout />} />
              <Route path="income" element={<HelpIncome />} />
              <Route path="expenses" element={<HelpExpenses />} />
              <Route path="category" element={<HelpCategories />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
