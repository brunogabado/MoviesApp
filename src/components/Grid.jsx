import { createUseStyles } from "react-jss";
import { useState } from "react";
import CardMovie from "./CardMovie";

const GridStyles = createUseStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
    gap: "30px",
    width: "100%",
    margin: "0",
    alignItems: "center",
    color: "white",
    justifyItems: "center",
    backgroundColor: "black",
    border: "1px solid white",
    borderRadius: "10px",
    padding: "20px 10px 20px 10px",
  },
  noReturnStatement: {
    color: "white",
  },
});

const Grid = ({ data, type, addMovie }) => {
  const classes = GridStyles();

  return (
    <div className={classes.grid}>
      {Object.entries(data).length === 0 ? (
        <h3 className={classes.noReturnStatement}>No movies to display...</h3>
      ) : (
        data.map((item) => (
          <CardMovie
            name={item.name}
            image={item.image}
            year={item.year}
            id={item.id}
            bio={item.bio}
            directorID={item.directors_id}
            key={item.id}
            type={type}
            addMovie={addMovie}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
