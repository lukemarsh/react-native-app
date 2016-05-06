import {
  TALKS_RECEIVED,
  TALKS_LOADING
} from './actions';

const initialState = {
  talks: [],
  loading: false
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case TALKS_LOADING:
      return Object.assign({}, state, {
        loading: true
      });
    case TALKS_RECEIVED:
      return Object.assign({}, state, {
        talks: action.talks,
        loading: false
      });
    default:
      return state;
  }
}
