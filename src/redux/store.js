import profilereducer from "./profile-reducer";
import dialogsreducer from "./dialogs-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you", likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 12 },
        { id: 3, message: "Of course i still love you", likesCount: 12 },
        { id: 4, message: "We are programmers", likesCount: 12 },
      ],
      newPostText: "",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Sasha" },
        { id: 2, name: "Luba" },
        { id: 3, name: "Приїхали" },
        { id: 5, name: "Напаль" },
        { id: 6, name: "Masha" },
      ],
      messages: [
        { id: 1, message: "i am Sasha" },
        { id: 6, message: "i have something" },
        { id: 2, message: "Luba" },
        { id: 3, message: "i live " },
        { id: 5, message: "Can" },
      ],
    },
    newMessageText: "",
    newMessageBody: "",
  },

  _callSubscriber() {
    console.log("State was changed!");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profilereducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsreducer(this._state.dialogsPage, action);
    this._callSubscriber(this._state);
  },
};

export default store;
window.store = store;
