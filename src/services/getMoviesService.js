import axios from "axios";
import {
  API_KEY,
  API_BASE_URL,
  GENRES_API,
  SEARCH_KEY_API_URL,
} from "../constant/constants";

export const getMovies = () => {
  return axios.get(
    API_BASE_URL + `upcoming?api_key=${API_KEY}&language=tr-TR&page=1&region=TR`
  );
};

/**
 *
 * @param {*} movieId
 */
export const getMovieDetails = (movieId) => {
  let params = new URLSearchParams();
  params.append("api_key", API_KEY);
  params.append("language", "tr-TR");
  return axios.get(
    API_BASE_URL + `${movieId}?api_key=${API_KEY}&language=tr-TR`
  );
};

/**
 *
 * @param {*} searchText
 * @returns
 */
export const searchMovieWithKeys = (searchText) => {
  return axios.get(SEARCH_KEY_API_URL + `${searchText}`);
};

/**
 *
 * @param {*} movieId
 * @returns
 */
export const getSimilarMovies = (movieId) => {
  return axios.get(
    API_BASE_URL + `${movieId}/similar?api_key=${API_KEY}&language=tr-TR&page=1`
  );
};

export const getGenres = () => {
  return axios.get(GENRES_API);
};
