import { createUseStyles } from "react-jss";
import Grid from "../components/Grid";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const AccountStyles = createUseStyles({
  Page: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  FormContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    width: "80%",
    padding: "20px",
    height: "120px",
    border: "1px solid white",
    borderRadius: "10px",
    alignSelf: "center",
    marginTop: "50px",
  },
  inputContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignContent: "center",
    borderRight: "1px solid white",
  },
  selectContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignContent: "center",
  },
  ListGrid: {},
  inputForm: {
    height: "40px",
    width: "250px",
    borderRadius: "5px",
    margin: "8px 0",
    padding: "0 0 0 3px",
    border: "1px solid white",
    backgroundColor: "black",
    color: "white",
    fontSize: "15px",
  },
  buttonForm: {
    height: "40px",
    width: "120px",
    borderRadius: "5px",
    margin: "8px 5px",
    padding: "0",
    border: "1px solid white",
    backgroundColor: "black",
    color: "white",
    fontSize: "15px",
  },
  dropdown: {
    height: "40px",
    width: "250px",
    borderRadius: "5px",
    margin: "8px 5px",
    padding: "0 0 0 3px",
    border: "1px solid white",
    backgroundColor: "black",
    color: "white",
  },
  text: {
    color: "white",
  },
  title: {
    color: "white",
    marginTop: "80px",
  },
  "@media (max-width: 1060px)": {
    FormContainer: {
      gridTemplateColumns: "1fr",
      gap: "30px",
      height: "auto",
    },
    text: {
      display: "flex",
      alignSelf: "center",
      justifyContent: "center",
    },
    title: {
      display: "flex",
      alignSelf: "center",
      justifyContent: "center",
    },
    inputContainer: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      alignContent: "center",
      borderRight: "none",
      paddingBottom: "30px",
      borderBottom: "1px solid white",
      justifyItems: "center",
      alignItems: "center",
      "& form": {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      },
    },
  },
});

const AccountPage = () => {
  const classes = AccountStyles();
  const authToken = localStorage.getItem("authToken");
  const userID = localStorage.getItem("userID");
  const userName = localStorage.getItem("userName");
  const [userListsIDs, setUserListsIDs] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [arrayOfLists, setArrayOfLists] = useState([]);
  const [selectedList, setSelectedList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/auth/me", {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        });

        if (Array.isArray(response.data.userData.lists)) {
          for (let list of response.data.userData.lists) {
            setArrayOfLists((prevArrayOfLists) => [...prevArrayOfLists, list]);
            setUserListsIDs((prevUserListsIDs) => [...prevUserListsIDs, { list_id: list.id }]);
          }
        }

        gettingMovies("");
      } catch (e) {
        console.log(e);
        logout();
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  const gettingMovies = async (search) => {
    try {
      const response1 = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/movies_name?query=${search}`);

      setMoviesData(response1.data.movies);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.querySelector("input").value;

    try {
      const response1 = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/list",
        { name: name, movies: [] },
        { headers: { Authorization: "Bearer " + authToken } },
      );
      console.log("response1--", response1);
      const newList = { id: response1.data.result_1.id, name: name, movies: [] };

      setArrayOfLists((prevArrayOfLists) => [...prevArrayOfLists, newList]);

      const response2 = await axios.put(
        `https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/user/${userID}`,
        { user_id: userID, lists: [...userListsIDs, { list_id: response1.data.result_1.id }] },
        { headers: { Authorization: "Bearer " + authToken } },
      );

      setUserListsIDs((prevUserListsIDs) => [...prevUserListsIDs, { list_id: response1.data.result_1.id }]);
    } catch (error) {
      console.error("Error creating list:", error);
    }

    e.target.querySelector("input").value = "";
  };

  const handleSelect = async (e) => {
    const listId = Number(e.target.value);
    console.log(listId);
    if (listId !== 0) {
      try {
        const response3 = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/list/${listId}`, {
          headers: { Authorization: "Bearer " + authToken },
        });

        setSelectedList(response3.data.list);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const addMovie = async (movie) => {
    if (Object.entries(selectedList).length > 0 && !selectedList.movies.some((item) => item.movies_id === movie.id)) {
      try {
        const id = Number(selectedList.id);
        const listNaming = selectedList.name;
        const listMovies = [...selectedList.movies, { movies_id: movie.id, movie: [movie] }];

        const response = await axios.patch(
          `https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/list/${id}`,
          {
            list_id: id,
            name: listNaming,
            movies: listMovies,
          },
          { headers: { Authorization: "Bearer " + authToken } },
        );

        setSelectedList({
          ...selectedList,
          movies: listMovies,
        });
      } catch (error) {
        console.error("Error adding movie:", error);
      }
    }
  };

  const renderListMovies = () => {
    let movies = [];
    if (selectedList.movies.length > 0) {
      selectedList.movies.map((movieInfo) => {
        movies.push(movieInfo.movie[0]);
      });
    }
    return movies;
  };

  return (
    <>
      {!isLoading ? (
        <>
          <div className={classes.Page}>
            <Navbar setDataToRender={gettingMovies} />
            <h1 className={classes.title}>Welcome, {userName}</h1>
            <div className={classes.FormContainer}>
              <div className={classes.inputContainer}>
                <h4 className={classes.text}>Create new movies list:</h4>
                <form onSubmit={(event) => handleSubmit(event)}>
                  <input className={classes.inputForm} placeholder="List name" />
                  <button className={classes.buttonForm} type="submit">
                    Add list
                  </button>
                </form>
              </div>
              <div className={classes.selectContainer}>
                <h4 className={classes.text}>Select a list to render/edit:</h4>
                <select className={classes.dropdown} onChange={(e) => handleSelect(e)}>
                  <option value="">Please Select a option..</option>
                  {arrayOfLists &&
                    arrayOfLists.map((list, index) => (
                      <option key={index} value={list.id}>
                        {list.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {selectedList.movies && (
              <div className={classes.ListGrid}>
                <h1 className={classes.title}>{selectedList.name}</h1>
                <Grid data={renderListMovies()} />
              </div>
            )}
            <div className={classes.GeneralGrid}>
              <h1 className={classes.title}>All movies</h1>
              <Grid data={moviesData} type="accountGrid" addMovie={addMovie} />
            </div>
          </div>
        </>
      ) : (
        <p>Lodaing...</p>
      )}
    </>
  );
};

export default AccountPage;
