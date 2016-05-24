import request from 'superagent';
delete GLOBAL.XMLHttpRequest;

const baseUrl = 'https://api.api.ai/v1/';
const accessToken = '848e6554193a4aa6b88bbb7689c7be58';
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
      searchType: message.searchType,
      options: message.options,
      hideKeyboard: message.hideKeyboard
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
    request
      .post(baseUrl + 'query/?v=26000')
      .set('Content-Type', contentType)
      .set('Authorization', authHeader)
      .send({
        q: data.text,
        lang: 'en',
        resetContexts: data.resetContexts ? true : false,
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
          let options = [];
          let hideKeyboard = false;
          if (response.body.result.action === 'request_gift_options') {
            options = [
              'Under £20',
              'Up to £50',
              'Less than £50',
              'Other'
            ];
            hideKeyboard = true;
          }
          
          dispatch(receiveMessage({
            text: result.speech,
            type: 'theirs',
            options: options,
            hideKeyboard: hideKeyboard
          }));
          
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
  dispatch(receiveMessage({
    text: 'Cool. Here\'s some' + data.text.replace('show me', '') + ' items that match your product',
    type: 'theirs'
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
    text: 'hi',
    show: false,
    resetContexts: true
  })).then(() => {
    setTimeout(() => {
      dispatch(fetchMessage({
        text: 'What is your name?',
        show: false
      }));
    }, 500);
  }).then(() => {
    setTimeout(() => {
      dispatch(fetchMessage({
        text: 'Ask me what my name is',
        show: false
      }));
    }, 2000);
  });
};
