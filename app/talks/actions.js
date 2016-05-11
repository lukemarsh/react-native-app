import Firebase from 'firebase';

const talksRef = new Firebase('https://benchreact.firebaseio.com/rooms');

export const TALKS_RECEIVED = 'TALKS_RECEIVED';
export const TALKS_LOADING = 'TALKS_LOADING';
export const TALK_RECEIVED = 'TALK_RECEIVED';

export const talksReceived = (talks) => ({type: TALKS_RECEIVED, talks});
export const talksLoading = () => ({type: TALKS_LOADING});
export const talkReceived = (talk) => ({type: TALK_RECEIVED, talk});

export const getTalks = () => (dispatch) => {
  dispatch(talksLoading());
  let talks = [];
  talksRef.on('value', (snap) => {
    snap.forEach((child) => {
      talks.unshift({
        title: child.val().owner,
        id: child.key()
      });
    });
    dispatch(talksReceived(talks));
  });
};

export const getTalkByKey = (key) => (dispatch) => {
  talksRef.child(key).on('value', (snap) => {
    const talk = {
      title: snap.val().owner,
      id: snap.key()
    };
    dispatch(talkReceived(talk));
  });
};

export const addTalk = (data) => (dispatch) => {
  const newTalkRef = talksRef.push(data);
  const talkId = newTalkRef.key();
  dispatch(getTalkByKey(talkId));
  dispatch(getTalks());
};
