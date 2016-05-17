import request from 'superagent';
delete GLOBAL.XMLHttpRequest;

const baseUrl = 'https://api.api.ai/v1/';
const accessToken = '2cb3b60aab03403e99a619ba0e494e45';
const contentType = 'application/json; charset=utf-8';
const authHeader = 'Bearer ' + accessToken;

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const MESSAGE_LOADING = 'MESSAGE_LOADING';

export const messageReceived = (data) => ({type: MESSAGE_RECEIVED, data});
export const messageLoading = () => ({type: MESSAGE_LOADING});

export const receiveMessage = (message) => (dispatch) => {
  dispatch(messageReceived({
    type: message.type,
    text: message.text,
    list: message.list,
    id: message.id,
    searchType: message.searchType
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
  
  dispatch(messageLoading());
  return new Promise((resolve, reject) => {
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
        resolve();
        const type = response.body.result.parameters;
        const result = response.body.result.fulfillment;
        
        if (result.data) {
          dispatch(receiveMessage({
            list: result.data,
            type: 'theirs',
            id: id,
            searchType: type.type
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
  })).then(() => {
    setTimeout(() => {
      dispatch(fetchMessage({
        text: 'start next',
        show: false
      }));
    }, 500);
  }).then(() => {
    setTimeout(() => {
      dispatch(fetchMessage({
        text: 'start next next',
        show: false
      }));
    }, 2000);
  });
};
