"use strict";
import fetch from 'cross-fetch'
import axios from 'axios'

import {createActions, handleActions} from "redux-actions";

const {fetchComplete, fetchMetaDataComplete} = createActions({
    FETCH_COMPLETE: data => data,
    FETCH_META_DATA_COMPLETE: data=>data
});

const reducer = handleActions({
    [fetchComplete](state, action) {
        return {...state, members: action.payload}
    },
    [fetchMetaDataComplete] (state,action){
        return {...state, ...action.payload}
    }
}, {members: [], titles: []});


export default reducer

export const fetchMember = () => {
    return (dispatch) =>
        fetch('/member/json').then(data => data.json(), error => console.log('error fetching member')).then(data => dispatch(fetchComplete(data)))
};
export const fetchMetaData =()=>{
    return (dispatch) =>
        fetch('/member/metaData').then(data => data.json(), error => console.log('error fetching meta data')).then(data => dispatch(fetchMetaDataComplete(data)))
};

export const searchMember = (query) => {
    return dispatch => {

        if (query.trim().length === 0){
            dispatch(fetchMember());
        }
        else {
            let data2 = new FormData();
            data2.append('query',query);
             axios.post('/member/search', data2).then(data => dispatch(fetchComplete(data.data)), error => console.log('error search'));
        }
    }
};