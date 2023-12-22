import { createUseStyles } from "react-jss";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "../components/Grid";

const MoviePageStyles = createUseStyles({
  Page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  Container: {
    display: "flex",
    gap: "50px",
    margin: "50px 0",
    backgroundColor: "black",
    width: "80%",
    alignSelf: "center",
  },
  ContainerImage: {
    height: "auto",
    borderRadius: "20px",
    width: "auto",
  },
  imageStyles: {
    overflow: "hidden",
    borderRadius: "20px",
  },
  ContainerInfo: {
    width: "100%",
  },
  title: {
    color: "white",
  },
  text: {
    fontSize: "20px",
    margin: "20px 0",
    color: "white",
  },
  OtherFilmsTitle: {
    color: "white",
  },
  directorMoviesContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "50px 0",
    backgroundColor: "black",
    width: "80%",
    alignSelf: "center",
  },
  horizontalLineStyled: {
    color: "white",
    width: "80%",
  },
});

const MoviePage = () => {
  const classes = MoviePageStyles();
  const authToken = localStorage.getItem("authToken");
  const movieId = useParams().id;
  const [moviesData, setMoviesData] = useState([]);
  const [movieDetails, setMovieDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const gettingMovies = async () => {
      try {
        const response = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/movies/${movieId}?movie_id=${movieId}`);
        const data = response.data;
        setMoviesData(data._movies_of_directors.map((movie) => movie));
        setMovieDetails({
          id: data.id,
          name: data.name,
          image: data.image,
          year: data.year,
          bio: data.bio,
          directorName: data._director_name.name,
        });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    gettingMovies();
  }, [movieId]);

  return (
    <div className={classes.Page}>
      {!isLoading ? (
        <>
          {/* <Header /> */}
          <div className={classes.Container}>
            <div className={classes.ContainerImage}>
              <img className={classes.imageStyles} src={movieDetails.image} alt={movieDetails.name} />
            </div>
            <div className={classes.ContainerInfo}>
              <h1 className={classes.title}>{movieDetails.name}</h1>
              <p className={classes.text}>
                <strong>Year: </strong>
                {movieDetails.year}
              </p>
              <p className={classes.text}>Director: {movieDetails.directorName} </p>
              <p className={classes.text}>
                <strong>Synopsis:</strong>
                <br></br>
                {movieDetails.bio}
              </p>
            </div>
          </div>
          <hr className={classes.horizontalLineStyled}></hr>
          <div className={classes.directorMoviesContainer}>
            <h2 className={classes.OtherFilmsTitle}>More movies from {movieDetails.directorName}</h2>
            <Grid data={moviesData} />
          </div>
        </>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default MoviePage;
