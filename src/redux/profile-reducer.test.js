import profileReducer, {addPost, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 12},
        {id: 3, message: 'Of course i still love you', likesCount: 12},
        {id: 4, message: 'We are programmers', likesCount: 12},
    ],
    profile: null,
    status: "",
};

it('new post should be incremented', () => {
    // 1. test data
    let action = addPost("wwawa");
    let state = initialState;


    // 2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(5)

});

it('after deleting length of messages should be decremented', () => {
    // 1. test data

    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(3)

});
