import * as moviesService from "../../services/getMoviesService";

export const GET_MOVIES = "GET_MOVIES";
export const GET_MOVIE_DETAILS = "GET_MOVIE_DETAILS";
export const GET_MOVIES_WITH_KEYWORDS = "GET_MOVIES_WITH_KEYWORDS";
export const GET_SIMILAR_MOVIES = "GET_SIMILAR_MOVIES";
export const GET_GENRES = "GET_GENRES";
export const GET_SEARCH_MOVIES = "GET_SEARCH_MOVIES";

export const GET_MOVIES_FAIL = "GET_MOVIES_FAIL";
export const GET_MOVIE_DETAILS_FAIL = "GET_MOVIE_DETAILS_FAIL";
export const GET_SIMILAR_MOVIES_FAIL = "GET_SIMILAR_MOVIES_FAIL";
export const GET_GENRES_FAIL = "GET_GENRES_FAIL";

export const getMoviesAction = () => {
  return (dispatch) => {
    try {
      moviesService
        .getMovies()
        .then((response) => {
          dispatch({ type: GET_MOVIES, payload: response.data.results });
        })
        .catch((error) => console.log("errrrror: ", error));
    } catch (error) {
      throw error;
    }
  };
};

export const getMovieDetails = (movieId) => {
  return (dispatch) => {
    try {
      moviesService
        .getMovieDetails(movieId)
        .then((response) => {
          dispatch({ type: GET_MOVIE_DETAILS, payload: response.data });
        })
        .catch((error) => console.log("error from details service: ", error));
    } catch (error) {
      throw error;
    }
  };
};

export const getSimilarMovies = (movieId) => {
  return (dispatch) => {
    try {
      moviesService
        .getSimilarMovies(movieId)
        .then((response) => {
          dispatch({
            type: GET_SIMILAR_MOVIES,
            payload: response.data.results,
          });
        })
        .catch((error) => console.log("error from similar acitons: ", error));
    } catch (error) {}
  };
};

export const getGenres = () => {
  return (dispatch) => {
    try {
      moviesService
        .getGenres()
        .then((response) => {
          console.log("genressss :", response);
          dispatch({ type: GET_GENRES, payload: response.data.genres });
        })
        .catch((error) =>
          dispatch({ type: GET_GENRES_FAIL, payload: error.request })
        );
    } catch (error) {
      throw error;
    }
  };
};

export const getSearchMovies = (searchKey) => {
  return (dispatch) => {
    try {
      moviesService
        .searchMovieWithKeys(searchKey)
        .then((response) => {
          dispatch({ type: GET_SEARCH_MOVIES, payload: response.data.results });
        })
        .catch((error) => console.log("errrpr from search aciton: ", error));
    } catch (error) {
      throw error;
    }
  };
};
