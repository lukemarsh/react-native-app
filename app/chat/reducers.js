import {
  MESSAGE_RECEIVED,
  MESSAGE_LOADING
} from './actions';

const initialState = {
  messages: [],
  options: [],
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
        messages: [...state.messages, { minPrice: action.data.minPrice, maxPrice: action.data.maxPrice, text: action.data.text, index: 0, type: action.data.type, searchType: action.data.searchType, list: action.data.list, loading: false, id: action.data.id }],
        options: action.data.options,
        hideKeyboard: action.data.hideKeyboard
      };
    default:
      return state;
  }
}
