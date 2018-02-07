"use strict";
import fetch from 'cross-fetch'

import {createActions, handleActions} from "redux-actions";

const {fetchComplete} = createActions({
    FETCH_COMPLETE: data => data
});

const reducer = handleActions({
    [fetchComplete](state, action) {
        return {...state, members: action.payload}
    }
}, {members: []});


export default reducer

export const fetchMember = () => {
    return (dispatch) =>
        fetch('/member/json').then(data => data.json(), error => console.log('error fetching member')).then(data => dispatch(fetchComplete(data)))
};