import React from "react";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import * as movieAction from "../../redux/actions/moviesActions";
import { IMG_API, NO_IMAGE } from "../../constant/constants";
import "./style.css";
import { setVoteColor } from "../../utils/utils";
import { Link } from "react-router-dom";

export default function SimilarMovies({ movieId }) {
  const [similarMovie, setSimilarMovie] = React.useState([]);
  const dispatch = useDispatch();
  const similarMovies = useSelector(
    (state) => state.moviesReducer.similarMovies
  );
  const [similarMovieID, setSimilarMovieID] = React.useState("");

  React.useEffect(() => {
    setSimilarMovieID(movieId);
    dispatch(movieAction.getSimilarMovies(similarMovieID));
    setSimilarMovie(similarMovies);
  }, [similarMovieID, dispatch]);

  return (
    <div className="similar-movie-container">
      {similarMovie.length > 0 &&
        similarMovie.map((_movie) => {
          return (
            <div className="similar-movie" key={uuid()}>
              <Link to={`/details/${_movie.id}`}>
                <img
                  src={
                    _movie.poster_path ? IMG_API + _movie.poster_path : NO_IMAGE
                  }
                  alt={_movie.title}
                />
              </Link>

              <div className="similar-movie-info">
                <h5>{_movie.title}</h5>
                <span
                  className={`tag ${setVoteColor(
                    _movie.vote_average.toFixed(1)
                  )}`}
                >
                  {_movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
