import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import React, { useContext } from "react";
import { AuthContext } from "../App";

const SearchBarStyles = createUseStyles({
  buttonsContainer: {
    display: "flex",
    gap: "40px",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    width: "40px",
    backgroundColor: "black",
    border: "1px solid white",
    borderRadius: "50%",
    padding: "5px",
    alignSelf: "center",
    justifySelf: "center",
    "&:hover": {
      transform: "scale(1.22)",
      transitionDelay: "0.1s",
      backgroundColor: "white",
      color: "black",
      "& svg path": {
        fill: "black",
        stroke: "black",
      },
      "& svg circle": {
        fill: "black",
        stroke: "black",
        circle: "black",
      },
    },
  },
  Header: {
    display: "grid",
    gridTemplateColumns: "10fr 1fr",
    width: "auto",
  },
  "@media (max-width: 768px)": {
    Header: {
      gridTemplateColumns: "1fr",
      gap: "30px",
    },
  },
});

const Header = () => {
  const classes = SearchBarStyles();
  const { isAuth, logout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <div className={classes.Header}>
      <div className={classes.buttonsContainer}>
        <Link to="/" className={classes.button}>
          <svg width="25px" height="25px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              d="M16.3382 1.94393L25.9705 9.82424L26.0201 9.8788C26.1701 10.0437 26.3998 10.3064 26.5943 10.6198C26.7798 10.9189 27 11.3686 27 11.8956V24.9976C27 26.1013 26.1068 27 25 27H18.7601C17.9317 27 17.2601 26.3284 17.2601 25.5V20.7939C17.2601 18.9948 15.8058 17.5405 14.0168 17.5405C12.2279 17.5405 10.7735 18.9948 10.7735 20.7939V25.5C10.7735 26.3284 10.102 27 9.27354 27H3C1.89318 27 1 26.1013 1 24.9976V11.7425C1 11.0901 1.36299 10.564 1.56986 10.3028C1.69049 10.1505 1.80873 10.0264 1.89631 9.94036C1.9407 9.89677 1.97877 9.86147 2.0074 9.83565C2.02175 9.8227 2.03384 9.81204 2.0433 9.80382L2.05551 9.79329L2.06007 9.7894L2.06278 9.7871C2.06278 9.7871 2.06356 9.78646 2.7075 10.5515L2.06356 9.78646L2.07352 9.77807L11.6288 1.94617C12.9452 0.685478 15.0206 0.684487 16.3382 1.94393ZM3.35246 11.3159L3.3468 11.3209C3.33673 11.33 3.31953 11.3459 3.29759 11.3674C3.25251 11.4117 3.19388 11.4736 3.13764 11.5446C3.07966 11.6178 3.038 11.6834 3.01374 11.7344C3.00661 11.7494 3.00238 11.7602 3 11.767V24.9976L3.00006 24.9992L3.0007 25H8.77354V20.7939C8.77354 17.8948 11.1188 15.5405 14.0168 15.5405C16.9149 15.5405 19.2601 17.8948 19.2601 20.7939V25H24.9993L24.9999 24.9992L25 24.9976V11.8956C25 11.8989 25.0008 11.8992 25 11.8956C24.9966 11.8812 24.9788 11.8095 24.8948 11.6742C24.8108 11.5389 24.7005 11.4037 24.588 11.2772L15.004 3.43645L14.9714 3.40439C14.4228 2.86484 13.5451 2.86525 12.997 3.40534L12.9644 3.43744L3.35246 11.3159Z"
              fill="white"
              fillRule="evenodd"
            />
          </svg>
        </Link>
        <Link to={isAuth ? "/accountPage" : "/login"} className={classes.button}>
          <svg width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle fill="white" stroke="white" strokeMiterlimit="10" strokeWidth="1.91" cx="12" cy="7.25" r="5.73" />
            <path
              fill="white"
              stroke="white"
              strokeMiterlimit="10"
              strokeWidth="1.91"
              d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
            />
          </svg>
        </Link>
        {isAuth && (
          <Link to="/login" className={classes.button} onClick={handleLogoutClick}>
            {/* Your SVG for logout */}
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 3.25C12.4142 3.25 12.75 3.58579 12.75 4C12.75 4.41421 12.4142 4.75 12 4.75C7.99594 4.75 4.75 7.99594 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25C12.4142 19.25 12.75 19.5858 12.75 20C12.75 20.4142 12.4142 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12C3.25 7.16751 7.16751 3.25 12 3.25Z"
                fill="white"
              />
              <path
                d="M16.4697 9.53033C16.1768 9.23744 16.1768 8.76256 16.4697 8.46967C16.7626 8.17678 17.2374 8.17678 17.5303 8.46967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L17.5303 15.5303C17.2374 15.8232 16.7626 15.8232 16.4697 15.5303C16.1768 15.2374 16.1768 14.7626 16.4697 14.4697L18.1893 12.75H10C9.58579 12.75 9.25 12.4142 9.25 12C9.25 11.5858 9.58579 11.25 10 11.25H18.1893L16.4697 9.53033Z"
                fill="white"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
