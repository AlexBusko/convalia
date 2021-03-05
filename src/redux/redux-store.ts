import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profile-reducer";
import sitebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { reducer as formReducer } from "redux-form";
import { appReducer } from "./app-reducer";
import bitcoinReducer from "./bitcoin-reducer";
import monobankReducer from "./monobank-reducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sitebar: sitebarReducer,
  usersPage: usersReducer, 
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  bitcoin: bitcoinReducer,
  monobank: monobankReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
