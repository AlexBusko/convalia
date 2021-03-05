let initialState = {};

type InitialStateType = typeof initialState;

const sitebarReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  return state;
};

type ActionsType = {};

export default sitebarReducer;
