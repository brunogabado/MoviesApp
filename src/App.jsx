import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { createUseStyles } from "react-jss";
import RegisterFormPage from "./pages/RegisterPage";
import LoginForm from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import MoviePage from "./pages/MoviePage";
import { useState, createContext } from "react";
import Header from "./components/Header";

const AppStyles = createUseStyles({
  "@global": {
    body: {
      fontFamily: "'Source Sans Pro',Arial,sans-serif;",
      backgroundColor: "black",
      margin: "30px",
    },
  },
  AppContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
  },
});

const AuthContext = createContext();
const authToken = localStorage.getItem("authToken");

const App = () => {
  const classes = AppStyles();
  const [isAuth, setIsAuth] = useState(authToken ? true : false);

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuth(false);
  };
  

  return (
    <div className={classes.AppContainer}>
      <AuthContext.Provider value={{ isAuth, setIsAuth, logout }}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/register" element={<RegisterFormPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            {isAuth && (
              <>
                <Route path="/accountPage" element={<AccountPage />} />
              </>
            )}
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};
export { AuthContext };
export default App;
