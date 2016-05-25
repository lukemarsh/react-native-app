import request from 'superagent';
// delete GLOBAL.XMLHttpRequest;

const baseUrl = 'https://api.api.ai/v1/';
const accessToken = '9a5720393c2e47a1b25d05fb333563ce';
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
      hideKeyboard: message.hideKeyboard,
      minPrice: message.minPrice,
      maxPrice: message.maxPrice
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
            list: type.type === 'category' ? result.data['sch:Options']['sch:RefinementList']['sch:Refinement']['sch:OptionList']['sch:Option'] : result.data['prd:ProductList']['prd:Product'],
            type: 'theirs',
            searchType: type.type,
            minPrice: type['min-price'],
            maxPrice: type['max-price']
          }));
        } else if (result.speech) {
          let options = [];
          let hideKeyboard = false;
          if (response.body.result.action === 'request_gift_options') {
            options = [
              'Up to £20',
              '£20 to £50',
              '£50 to £100'
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
  
  const productStrings = [
    "Here's what I've been able to find. What do you think?",
    "Do you think he'll like any of these?",
    "What do you think of these gift ideas?",
    "How do you like these gift ideas?"
  ];
  const productString = Math.floor(Math.random() * productStrings.length);
  
  dispatch(receiveMessage({
    text: productStrings[productString],
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
    text: 'hello',
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
