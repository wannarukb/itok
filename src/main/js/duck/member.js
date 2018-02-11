"use strict";
import fetch from 'cross-fetch'
import axios from 'axios'


import {createActions, handleActions} from "redux-actions";
import {swal} from "react-redux-sweetalert";

const {fetchComplete, fetchMetaDataComplete, updateSuccess, fetchMemberSuccess} = createActions({
    FETCH_COMPLETE: data => data,
    FETCH_META_DATA_COMPLETE: data => data,
    UPDATE_SUCCESS: data => data,
    FETCH_MEMBER_SUCCESS: data => data,

});

const reducer = handleActions({
    [fetchComplete](state, action) {
        return {...state, members: action.payload}
    },
    [fetchMetaDataComplete](state, action) {
        return {...state, ...action.payload}
    },
    [updateSuccess](state, action) {
        swal('บันทึกข้อมูลเรียบร้อย');
        return {...state}
    },
    [fetchMemberSuccess](state, action) {
        return {...state, currentMember: action.payload}
    }
}, {members: [], currentMember: {}});


export default reducer

export const fetchMember = () => {
    return (dispatch) =>
        fetch('/member/json').then(data => data.json(), error => console.log('error fetching member')).then(data => dispatch(fetchComplete(data)))
};
export const fetchMetaData = () => {
    return (dispatch) =>
        fetch('/member/metaData').then(data => data.json(), error => console.log('error fetching meta data')).then(data => dispatch(fetchMetaDataComplete(data)))
};

export const searchMember = (query) => {
    return dispatch => {

        if (query.trim().length === 0) {
            dispatch(fetchMember());
        }
        else {
            let data2 = new FormData();
            data2.append('query', query);

            axios.post('/member/search', data2).then(data => dispatch(fetchComplete(data.data)), error => console.log('error search'));
        }
    }
};

export const saveOrUpdate = (data) => {
    return dispatch => {
        axios.post('/member/update', data).then(data => dispatch(updateSuccess()), error => console.error(error))
    }
}

export const selectMember = (id,) => {
    return dispatch => {

        axios.get('/member/' + id).then(data => {
            dispatch(fetchMemberSuccess(data.data));

        }, error => console.error(error))

    }
}