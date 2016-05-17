import {
  MESSAGE_RECEIVED,
  MESSAGE_LOADING
} from './actions';

const initialState = {
  messages: [],
  loading: false
};

export default function(state = initialState, action = {}) {
  console.log(action);
  switch (action.type) {
    case MESSAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case MESSAGE_RECEIVED:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, { text: action.data.text, type: action.data.type, searchType: action.data.searchType, list: action.data.list, loading: false, id: action.data.id }]
      };
    default:
      return state;
  }
}
