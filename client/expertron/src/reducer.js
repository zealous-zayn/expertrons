import {combineReducers} from 'redux';


 function allMentor(state = [], action){
    switch(action.type) {
        case "FETCH_ALL_MENTOR":
            return action.payload;
        default:
            return state;
    }
}

function singleMentor(state={}, action){
    switch(action.type) {
        case "FETCH_SINGLE_MENTOR":
            return action.payload;
        default:
            return state;
    }
}

function taskList(state=[], action){
    switch(action.type) {
        case "FETCH_MENTOR_TASK":
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    all : allMentor,
    single : singleMentor,
    task : taskList
})