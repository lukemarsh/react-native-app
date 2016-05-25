import {
  OTHER_MESSAGE_RECEIVED,
  MESSAGE_LOADING
} from './otherActions';

const initialState = {
  otherMessages: [],
  options: [],
  isOtherTyping: false
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case MESSAGE_LOADING:
      return {
        ...state,
        isOtherTyping: true
      };
    case OTHER_MESSAGE_RECEIVED:
      return {
        ...state,
        isOtherTyping: false,
        otherMessages: [...state.otherMessages, { text: action.data.text, index: 0, type: action.data.type, searchType: action.data.searchType, list: action.data.list, loading: false, id: action.data.id }],
        options: action.data.options,
        hideKeyboard: action.data.hideKeyboard
      };
    default:
      return state;
  }
}
