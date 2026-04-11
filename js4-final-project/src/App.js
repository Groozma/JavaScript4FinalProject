import './App.scss';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Help from './Help/Help';
import HelpAbout from './Help/HelpAbout/HelpAbout';
import HelpIncome from './Help/HelpIncome/HelpIncome';
import HelpExpenses from './Help/HelpExpenses/HelpExpenses';
import HelpCategories from './Help/HelpCategories/HelpCategories';
import Nav from './Components/Nav/Nav';
import {Route, Routes} from 'react-router-dom';
import { AuthContext } from "./AuthContext";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        <Header />

        {isLoggedIn && <Nav />}   {/* Only show nav when logged in */}

        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
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