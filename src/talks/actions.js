import Firebase from 'firebase';

const talksRef = new Firebase('https://benchreact.firebaseio.com/rooms');

export const TALKS_RECEIVED = 'TALKS_RECEIVED';
export const TALKS_LOADING = 'TALKS_LOADING';

export const talksReceived = (talks) => ({type: TALKS_RECEIVED, talks});
export const talksLoading = () => ({type: TALKS_LOADING});

export const initTalks = () => (dispatch) => {
  dispatch(talksLoading());
  let talks = [];
  talksRef.on('value', (snap) => {
    snap.forEach((child) => {
      talks.push({
        title: child.val().owner
      });
    });
    dispatch(talksReceived(talks));
  });
};

export const addTalk = (data) => () => {
  talksRef.push(data);
};
