import request from 'superagent';
delete GLOBAL.XMLHttpRequest;

const baseUrl = 'https://api.api.ai/v1/';
const accessToken = '2cb3b60aab03403e99a619ba0e494e45';
const contentType = 'application/json; charset=utf-8';
const authHeader = 'Bearer ' + accessToken;

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const MESSAGE_LOADING = 'MESSAGE_LOADING';

export const messageReceived = (data) => ({type: MESSAGE_RECEIVED, data});
export const messageLoading = (data) => ({type: MESSAGE_LOADING, data});

export const receiveMessage = (message) => (dispatch) => {
  dispatch(messageReceived({
    type: message.type,
    text: message.text,
    list: message.list,
    id: message.id,
    carousel: message.carousel
  }));
};

export const fetchMessage = (data) => (dispatch) => {
  let id = Math.random();
  
  if (data.show !== false) {
    dispatch(receiveMessage({
      text: data.text,
      type: 'mine'
    }));
  }
  
  // dispatch(messageLoading({
  //   type: 'theirs',
  //   id: id
  // }));
  
  request
    .post(baseUrl + 'query/?v=26000')
    .set('Content-Type', contentType)
    .set('Authorization', authHeader)
    .send({
      q: data.text,
      lang: 'en',
      resetContexts: false,
      timezone: 'Europe/London'
    })
    .end((error, response) => {
      const result = response.body.result.fulfillment;
      if (result.data) {
        dispatch(receiveMessage({
          list: result.data,
          type: 'theirs',
          id: id,
          carousel: data.carousel
        }));
      } else if (result.speech) {
        dispatch(receiveMessage({
          text: result.speech,
          type: 'theirs',
          id: id
        }));
      } else {
        dispatch(receiveMessage({
          text: 'Sorry I cannot help you with that',
          type: 'theirs',
          id: id
        }));
      }
    });
};

export const showProductCarousel = (data) => (dispatch) => {
  dispatch(fetchMessage({
    text: data.text,
    carousel: true,
    show: false
  }));
};

export const startSequence = () => (dispatch) => {
  dispatch(fetchMessage({
    text: 'start',
    show: false
  }));
};