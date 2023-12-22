import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const CardStyles = createUseStyles({
  Container: {
    width: "170px",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    border: "1px solid white",
    overflow: "hidden",
    backgroundColor: "black",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.15)",
      transitionDelay: "0.1s",
    },
  },
  CardImageContainer: {
    border: "1px solid black",
    width: "auto",
    height: "240px",
    backgroundImage: (props) => `url('${props.image}')`,
    backgroundSize: "cover",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
    overflow: "hidden",
  },
  CardInfo: {
    display: "flex",
    flexDirection: "column",
    padding: "5px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  CardName: {
    color: "white",
    textAlign: "start",
    margin: "0",
    padding: "0",
    fontSize: "13px",
  },
  CardYear: {
    alignSelf: "start",
    color: "#808080",
    textAlign: "center",
    margin: "0",
    padding: "0",
    fontSize: "11px",
  },
  addButton: {
    height: "30px",
    marginTop: "5px",
    "&:hover": {
      transform: "scale(1.35)",
      transitionDelay: "0.2s",
    },
  },
});

const CardMovie = ({ name, image, year, id, bio, directorID, type, addMovie }) => {
  const classes = CardStyles({ image });

  const movie = {
    bio: bio,
    directors_id: directorID,
    id: id,
    image: image,
    name: name,
    year: year,
  };

  const handleAddMovieClick = () => {
    return addMovie(movie);
  };

  return (
    <div className={classes.Container} key={id}>
      <Link to={`/movie/${id}`}>
        <div className={classes.CardImageContainer}></div>

        <div className={classes.CardInfo}>
          <strong>
            <p className={classes.CardName}>{name}</p>
          </strong>
          <p className={classes.CardYear}>{year}</p>
        </div>
      </Link>
      {type && (
        <button className={classes.addButton} onClick={handleAddMovieClick}>
          <strong>Add Movie</strong>
        </button>
      )}
    </div>
  );
};

export default CardMovie;
