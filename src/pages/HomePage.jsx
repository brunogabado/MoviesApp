import { createUseStyles } from "react-jss";
import Grid from "../components/Grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const AppStyles = createUseStyles({
  Container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    width: "calc(100vw - 60px)",
    height: "100%",
  },

  Title: {
    color: "white",
    fontSize: "30px",
    marginTop: "80px",
  },

  List: {
    color: "white",
  },
});

const HomePage = () => {
  const classes = AppStyles();

  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const gettingMovies = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response1 = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/movies_name?query=${search}`);

        setMoviesData(response1.data.movies);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    gettingMovies();
  }, [search]);

  return (
    <div className={classes.Container}>
      {!isLoading ? (
        <>
          <Navbar setDataToRender={setSearch} />
          <h1 className={classes.Title}>Top Rated Movies</h1>
          <Grid data={moviesData} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
