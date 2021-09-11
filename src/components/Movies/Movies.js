/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React from "react";
import "./style.css";
import { NO_IMAGE, IMG_API } from "../../constant/constants";
import { useDispatch, useSelector } from "react-redux";
import * as moviesAction from "../../redux/actions/moviesActions";
import uuid from "react-uuid";
import { Link } from "react-router-dom";

const setVoteColor = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote > 6) {
    return "orange";
  } else {
    return "red";
  }
};

const movie = () => {
  const dispatch = useDispatch();
  let keys = new Array(4);
  const [movies, setMovies] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [searchKeys, setSearchKeys] = React.useState([]);
  const movieList = useSelector((state) => state.moviesReducer.movies);
  const genres = useSelector((state) => state.moviesReducer.genres);

  React.useEffect(() => {
    dispatch(moviesAction.getMoviesAction());
    dispatch(moviesAction.getGenres());
    dispatch(moviesAction.getSearchMovies(searchText));

    setMovies(movieList);
  }, []);

  React.useEffect(() => {
    if (searchText.length !== 0) {
      dispatch(moviesAction.getSearchMovies(searchText));
      setMovies(movieList);
    } else {
      dispatch(moviesAction.getMoviesAction());
      setMovies(movieList);
    }
  }, [searchKeys, searchText]);

  const handleSearch = (event) => {
    const text = event.target.value;
    if (text.length > 2) {
      setSearchText(text);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchText) {
      setSearchKeys((searchKeys) => [...searchKeys, searchText]);
      //localStorage.setItem("keys", JSON.stringify(searchKeys));
      setSearchText(searchText);

      dispatch(moviesAction.getSearchMovies(searchText));
    }
  };

  return (
    <React.Fragment>
      <div className="header">
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search"
            onChange={handleSearch}
          />
        </form>

        <div className="tags-container">
          {searchKeys.length > 0 &&
            searchKeys.slice(0, 5).map((_key) => (
              <button key={uuid()} className="tags">
                {_key}
              </button>
            ))}
        </div>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {genres.length > 0 &&
            genres.map((_genre) => (
              <button key={_genre.id} className="tags">
                {_genre.name}
              </button>
            ))}
        </div>
      </div>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((_movie) => {
            return (
              <div className="movie" key={uuid()}>
                <Link to={`/details/${_movie.id}`}>
                  <img
                    src={
                      _movie.poster_path
                        ? IMG_API + _movie.poster_path
                        : NO_IMAGE
                    }
                    alt={_movie.title}
                  />
                </Link>

                <div className="movie-info">
                  <h5>{_movie.title}</h5>
                  <span className={`tag ${setVoteColor(_movie.vote_average)}`}>
                    {_movie.vote_average}
                  </span>
                </div>
                <div className="movie-over">
                  <h4>Özet:</h4>
                  <p>{_movie.overview}</p>
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default movie;
