/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as moviesAction from "../../redux/actions/moviesActions";
import { IMG_API, NO_IMAGE } from "../../constant/constants";
import "./style.css";
import SimilarMovies from "../SimilarMovies/SimilarMovies";

export default function Details() {
  const params = useParams();

  const movieDetails = useSelector((state) => state.moviesReducer.movieDetails);
  const [paramID, setParamID] = React.useState("");
  const dispatch = useDispatch();

  const [details, setDetails] = React.useState({});
  React.useEffect(() => {
    setParamID(params.id);
    dispatch(moviesAction.getMovieDetails(paramID));
    setDetails(movieDetails);
  }, [dispatch, paramID]);

  return (
    <React.Fragment>
      {Object.keys(details).length > 0 ? (
        <React.Fragment>
          <div className="wrapper">
            <div className="main_card">
              <div className="card_left">
                <div className="card_datails">
                  <div className="social-btn">
                    <h1>{details.title}</h1>
                    <p className="disc">{details.overview}</p>
                    <button>{details.runtime} dakika</button>

                    <button>{details.release_date} </button>

                    <button>{details.vote_average}</button>

                    {details.genres.map((_genre) => (
                      <button key={_genre.id}>
                        <i className="fas fa-star">{_genre.name} </i>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card_right">
                <div className="img_container">
                  <img
                    src={
                      details.poster_path
                        ? IMG_API + details.poster_path
                        : NO_IMAGE
                    }
                    alt={details.title}
                  />

                  {/* <img
                  src="https://upload.wikimedia.org/wikipedia/en/f/ff/MI_%E2%80%93_Fallout.jpg"
                  alt=""
                /> */}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: 300,
              marginTop: 50,
            }}
          >
            <SimilarMovies movieId={paramID} />
          </div>
        </React.Fragment>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>NO DATA</span>
        </div>
      )}
    </React.Fragment>
  );
}
