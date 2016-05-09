import {
  TALKS_RECEIVED,
  TALKS_LOADING,
  TALK_RECEIVED
} from './actions';

const initialState = {
  talks: [],
  loading: false,
  talk: {}
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
    case TALK_RECEIVED:
      return Object.assign({}, state, {
        talk: action.talk
      });
    default:
      return state;
  }
}
