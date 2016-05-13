import {
  MESSAGE_RECEIVED,
  MESSAGE_LOADING
} from './actions';

const initialState = {
  messages: []
};

export default function(state = initialState, action = {}) {
  console.log(action);
  switch (action.type) {
    // case MESSAGE_LOADING:
    //   return {
    //     ...state,
    //     messages: [...state.messages, { type: action.data.type, loading: true, id: action.data.id }]
    //   };
    case MESSAGE_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, { text: action.data.text, type: action.data.type, carousel: action.data.carousel, list: action.data.list, loading: false, id: action.data.id }]
      };
    default:
      return state;
  }
}
