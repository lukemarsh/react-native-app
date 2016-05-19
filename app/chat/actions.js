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
  return new Promise((resolve, reject) => {
    dispatch(messageReceived({
      type: message.type,
      text: message.text,
      list: message.list,
      id: Math.round(Math.random() * 10000),
      searchType: message.searchType
    }));
    resolve();
  });
};

export const fetchMessage = (data) => (dispatch) => {
  if (data.show !== false) {
    dispatch(receiveMessage({
      text: data.text,
      type: 'mine'
    }));
  }
  
  dispatch(messageLoading());
  return new Promise((resolve, reject) => {
    if (data.text.indexOf('items that match your product') > -1) {
      dispatch(receiveMessage({
        text: 'Cool. Here`s some ' + data.data + ' items that match your product',
        type: 'theirs'
      }));
      resolve();
      return;
    }
    
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
            searchType: type.type
          }));
        } else if (result.speech) {
          dispatch(receiveMessage({
            text: result.speech,
            type: 'theirs'
          })).then(() => {
            if (result.speech.indexOf('really nice to meet you') > -1) {
              dispatch(fetchMessage({
                text: 'help',
                show: false
              }));
            }
            if (result.speech.indexOf('I can definitely help you with') > -1) {
              dispatch(fetchMessage({
                text: 'who gift for',
                show: false
              }));
            }
          });
          
        } else {
          dispatch(receiveMessage({
            text: 'Sorry I cannot help you with that',
            type: 'theirs'
          }));
        }
      });
  });
  
};

export const showProductCarousel = (data) => (dispatch) => {
  dispatch(fetchMessage({
    data: data.text.replace('select as ', ''),
    text: 'items that match your product',
    show: false
  })).then(() => {
    dispatch(fetchMessage({
      text: data.text,
      carousel: true,
      show: false
    }));
  });
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
