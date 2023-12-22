import { createUseStyles } from "react-jss";
const SearchBarStyles = createUseStyles({
  inputStyles: {
    alignSelf: "center",
    padding: "5px",
    width: "45%",
    height: "30px",
    border: "1px solid white",
    color: "white",
    borderRadius: "20px",
    backgroundColor: "black",
    marginTop: "30px",
    fontSize: "20px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
  },
  "@media (max-width: 768px)": {
    Header: {
      gridTemplateColumns: "1fr",
      gap: "30px",
    },
  },
  searchButton: {
    alignSelf: "center",
    height: "40px",
    borderRadius: "20px",
    fontSize: "15px",
    padding: "5px",
    width: "80px",
    marginTop: "30px",
  },
});

const Navbar = ({ setDataToRender }) => {
  const classes = SearchBarStyles();

  
  const handleInputChange = (e) => {
    e.preventDefault();
    let inputValue = e.target.querySelector("input").value;
    setDataToRender(inputValue);
    e.target.querySelector("input").value = "";
  };


  return (
    <form onSubmit={(event) => handleInputChange(event)} className={classes.inputContainer}>
      <input className={classes.inputStyles} placeholder="  Search for a movie..."></input>
      <button className={classes.searchButton}>Search</button>
    </form>
  );
};

export default Navbar;
