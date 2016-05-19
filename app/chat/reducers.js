import {
  MESSAGE_RECEIVED,
  MESSAGE_LOADING
} from './actions';

const initialState = {
  messages: [],
  isTyping: false
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case MESSAGE_LOADING:
      return {
        ...state,
        isTyping: true
      };
    case MESSAGE_RECEIVED:
      return {
        ...state,
        isTyping: false,
        messages: [...state.messages, { text: action.data.text, index: 0, type: action.data.type, searchType: action.data.searchType, list: action.data.list, loading: false, id: action.data.id }]
      };
    default:
      return state;
  }
}
