import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_ANIMES,
  SET_USER,
  SET_FAVORITES,
} from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function animes(state = [], action) {
  switch (action.type) {
    case SET_ANIMES:
      return action.value;
    default:
      return state;
  }
}

function user(state = "", action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function favorites(state = [], action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.value;
    default:
      return state;
  }
}

const animesApp = combineReducers({
  visibilityFilter,
  animes,
  user,
  favorites,
});

export default animesApp;