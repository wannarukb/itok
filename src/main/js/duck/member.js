"use strict";
import fetch from 'cross-fetch'
import axios from 'axios'
import {push} from 'react-router-redux'


import {createActions, handleActions} from "redux-actions";
import {swal} from "react-redux-sweetalert";
import moment from 'moment'
import {reset} from "redux-form";

export const {
    fetchComplete, fetchMetaDataComplete, updateSuccess, fetchMemberSuccess,
    isSearching, searchQuery, pageCount, setFile, clearCurrentMember
} = createActions({
    FETCH_COMPLETE: data => {
        return data;
    },
    FETCH_META_DATA_COMPLETE: data => data,
    UPDATE_SUCCESS: data => data,
    FETCH_MEMBER_SUCCESS: data => {
        let s = moment(data.birthday).format('DD/MM/YYYY');
        data.birthday = s;
        return data;
    },
    IS_SEARCHING: data => data,
    SEARCH_QUERY: data => data,
    PAGE_COUNT: data => parseInt(data),
    SET_FILE: data => data,
    CLEAR_CURRENT_MEMBER: () => {
    }
});


const reducer = handleActions({
    [fetchComplete](state, action) {
        return {...state, members: action.payload}
    },
    [fetchMetaDataComplete](state, action) {
        return {...state, ...action.payload}
    },
    [updateSuccess](state, action) {
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
    },
    [setFile](state, action) {
        return {...state, file: action.payload}
    },
    [clearCurrentMember](state) {
        return {...state, currentMember: {status: 'สมาชิกเครือข่าย'}}
    }
}, {members: [], currentMember: {status: 'สมาชิกเครือข่าย'}, isSearching: false, query: '', pageCount: 1, file: null});


export default reducer

export const fetchMember = () => {
    return (dispatch) => {
        dispatch(getPageCount(null));
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

export const saveOrUpdate = (data, file) => {
    return (dispatch, getState) => {
        const {file} = getState();
        let data2 = {...data};

        let after = null;

        if (data2.id == null) {
            after = () => {
                dispatch(reset('member-edit-form'))
                dispatch(clearCurrentMember())
                dispatch(push('/member/new'))
            }
        } else after = () => {
            dispatch(push('/member'))
        };

        data2.birthday = moment(data2.birthday, 'DD/MM/yyyy');
        axios.post('/member/update', data2).then(data => {
            dispatch(swal('บันทึกข้อมูลเรียบร้อย'));
            dispatch(updateSuccess());
            dispatch(uploadImage(data.data, after))
        }, error => console.error(error))
    }
};

export const selectMember = (id) => {
    return dispatch => {

        axios.get('/member/' + id).then(data => {
            dispatch(fetchMemberSuccess(data.data));

        }, error => console.error(error))

    }
};

export const changePage = (page) => {
    return (dispatch) =>
        fetch('/member/json?page=' + page.selected).then(data => data.json(), error => console.log('error fetching member')).then(data => dispatch(fetchComplete(data)))
};

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
};

export const getPageCount = (query) => {
    return dispatch => {
        if (query) fetch('/member/pageCount?query=' + query).then(data => data.text(), error => console.log('error count', error))
            .then(data =>
                dispatch(pageCount(data))
            );
        else fetch('/member/pageCount').then(data => data.text(), error => console.log('error count', error)).then(data => dispatch(pageCount(data)))
    }
};
export const uploadImage = (id,after) => {
    return (dispatch, getState) => {
        const file = getState().member.file;
        axios.get('/member/uploadUrl/' + id).then(data => data.data, error => console.error(error)).then(url => {
                const formData = new FormData();
                formData.append("file[]", file[0])
                axios.post(url, formData).then(data => {
                    // console.log('upload image success');
                    after()
                }, error => console.error(error))
            }
        )
    }
}