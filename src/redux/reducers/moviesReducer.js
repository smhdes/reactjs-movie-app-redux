/* eslint-disable import/no-anonymous-default-export */
import * as moviesActions from "../actions/moviesActions";

export const initialState = {
  movies: [],
  movieDetails: {},
  similarMovies: [],
  genres: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case moviesActions.GET_MOVIES: {
      return {
        ...state,
        movies: action.payload,
      };
    }

    case moviesActions.GET_MOVIE_DETAILS: {
      return {
        ...state,
        movieDetails: action.payload,
      };
    }

    case moviesActions.GET_SIMILAR_MOVIES: {
      return {
        ...state,
        similarMovies: action.payload,
      };
    }

    case moviesActions.GET_GENRES: {
      return {
        ...state,
        genres: action.payload,
      };
    }

    case moviesActions.GET_SEARCH_MOVIES: {
      return {
        ...state,
        movies: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
