import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";

const FormStyles = createUseStyles({
  container: {
    backgroundColor: "white",
    padding: "30px",
    width: "270px",
    borderRadius: "20px",
    border: "1px solid black",
    margin: "20vh 5vw 5vh 5vw",
    height: "fit-content",
  },
  titleForm: {
    textAlign: "center",
    margin: "5px 0 15px 0",
    fontSize: "30px",
  },
  input: {
    height: "20px",
    borderRadius: "5px",
    margin: "8px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "6px",
  },
  button: {
    width: "100%",
    height: "30px",
    color: "white",
    backgroundColor: "black",
    borderRadius: "5px",
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: "20px",
    marginTop: "20px",
  },
  buttonSwitch: {
    width: "100%",
    height: "30px",
    borderRadius: "5px",
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: "15px",
    color: "black",
    backgroundColor: "white",
    "&:hover": {
      background: "black",
      color: "white",
    },
  },
  switchText: {
    textAlign: "center",
    fontSize: "17px",
    fontWeight: "400",
  },
});
const Form = ({ type, setName, setEmail, setPassword, email, name, password, submitRequest, handleSubmit }) => {
  const classes = FormStyles();
  const navigate = useNavigate();

  const handleSwitchClick = () => {
    type === "login" ? navigate("/register") : navigate("/");
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <h4 className={classes.titleForm}>{type === "login" ? "Welcome back" : "Welcome"}</h4>
        {submitRequest.error && <p>{submitRequest.errorMessage}</p>}
        {!submitRequest.error && submitRequest.submitted && type === "register" && <p>Account created!</p>}
        {submitRequest.isLoading && <p>Loading..</p>}
        {type === "register" && (
          <input className={classes.input} autoComplete="on" required value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
        )}
        <input
          className={classes.input}
          autoComplete="on"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          className={classes.input}
          autoComplete="on"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button className={classes.button}>{type === "login" ? "Login" : "Register"}</button>

        <p className={classes.switchText}>{type === "login" ? "Do not have an account yet?" : "Do you already have an account?"}</p>

        <button className={classes.buttonSwitch} type="button" onClick={handleSwitchClick}>
          {type === "login" ? "GO TO REGISTER" : "GO TO LOG IN"}
        </button>
      </form>
    </div>
  );
};

export default Form;
