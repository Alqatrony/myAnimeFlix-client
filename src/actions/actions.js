export const SET_ANIMES = "SET_ANIMES";
export const SET_GENRES = 'SET_GENRES';
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";
export const SET_FAVORITES = "SET_FAVORITES";

export function setAnimes(value) {
  return { type: SET_ANIMES, value };
}

export function setGenres(value) {
  return { type: SET_GENRES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}

export function setFavorites(value) {
  return { type: SET_FAVORITES, value };
}