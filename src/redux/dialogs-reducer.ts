const SEND_MESSAGE = "SEND_MESSAGE";

type DialogType = {
  id: number;
  name: string;
};

type MessagesType = {
  id: number;
  message: string;
};

export type InitialStateType = {
  dialogs: Array<DialogType>;
  messages: Array<MessagesType>;
};

let initialState = {
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
};

const dialogsReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      };
    default:
      return state;
  }
};

type ActionsType = SendMessageCreatorActionType;

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};

export const sendMessageCreator = (
  newMessageBody: string
): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
