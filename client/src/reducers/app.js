import { SET_CURRENT_ID } from '../constants/actionTypes';

const appReducer = (appState = {}, action) => {
    switch (action.type) {
        case SET_CURRENT_ID:
            console.log(appState);
            // console.log(action.payload)
            return { ...appState, currentId: action.payload };
        default:
            return appState;
    }
};

export default appReducer;