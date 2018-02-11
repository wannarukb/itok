"use strict";
import fetch from 'cross-fetch'
import axios from 'axios'


import {createActions, handleActions} from "redux-actions";
import {swal} from "react-redux-sweetalert";

const {fetchComplete, fetchMetaDataComplete, updateSuccess, fetchMemberSuccess, isSearching, searchQuery, pageCount} = createActions({
    FETCH_COMPLETE: data => data,
    FETCH_META_DATA_COMPLETE: data => data,
    UPDATE_SUCCESS: data => data,
    FETCH_MEMBER_SUCCESS: data => data,
    IS_SEARCHING: data => data,
    SEARCH_QUERY: data => data,
    PAGE_COUNT: data => parseInt(data)
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
    },

    [isSearching](state, action) {
        return {...state, isSearching: action.payload}
    },
    [searchQuery](state, action) {
        return {...state, query: action.payload}
    },
    [pageCount](state, action) {
        return {...state, pageCount: action.payload}
    }
}, {members: [], currentMember: {}, isSearching: false, query: '', pageCount: 1});


export default reducer

export const fetchMember = () => {
    return (dispatch) => {
        dispatch(getPageCount(null))
        fetch('/member/json').then(data => data.json(), error => console.log('error fetching member')).then(data => dispatch(fetchComplete(data)))
    }
};
export const fetchMetaData = () => {
    return (dispatch) =>
        fetch('/member/metaData').then(data => data.json(), error => console.log('error fetching meta data')).then(data => dispatch(fetchMetaDataComplete(data)))
};

export const searchMember = (query) => {
    return dispatch => {

        if (query.trim().length === 0) {
            dispatch(fetchMember());
            dispatch(isSearching(false));
            dispatch(getPageCount(null))
        }
        else {
            let data2 = new FormData();
            data2.append('query', query);
            dispatch(isSearching(true));
            dispatch(searchQuery(query));
            dispatch(getPageCount(query));
            axios.post('/member/search', data2).then(data => dispatch(fetchComplete(data.data)), error => console.log('error search'));
        }
    }
};

export const saveOrUpdate = (data) => {
    return dispatch => {
        axios.post('/member/update', data).then(data => dispatch(updateSuccess()), error => console.error(error))
    }
}

export const selectMember = (id) => {
    return dispatch => {

        axios.get('/member/' + id).then(data => {
            dispatch(fetchMemberSuccess(data.data));

        }, error => console.error(error))

    }
}

export const changePage = (page) => {
    return (dispatch) =>
        fetch('/member/json?page=' + page.selected).then(data => data.json(), error => console.log('error fetching member')).then(data => dispatch(fetchComplete(data)))
}

export const changePageSearch = (query, page) => {
    return (dispatch) => {
        if (query.trim().length === 0) {
            dispatch(fetchMember());
            dispatch(isSearching(false));
        }
        else {
            let data2 = new FormData();
            data2.append('query', query);
            data2.append('page', page);
            dispatch(isSearching(true));
            axios.post('/member/search', data2).then(data => dispatch(fetchComplete(data.data)), error => console.log('error search'));
        }
    }
}

export const getPageCount = (query) => {
    return dispatch => {
        if (query) fetch('/member/pageCount?query=' + query).then(data => data.text(), error => console.log('error count', error))
            .then(data =>
                dispatch(pageCount(data))
            );
        else fetch('/member/pageCount').then(data => data.text(), error => console.log('error count', error)).then(data => dispatch(pageCount(data)))
    }
}
