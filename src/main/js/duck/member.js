"use strict";
import fetch from 'cross-fetch'

import {handleActions} from "redux-actions";

const{fetcCom}

const reducer = handleActions({}, {})


export default reducer

export const fetchMember = () => {
    return (dispatch) =>
        fetch('/member/json').then(data => data.json(), error => console.log('error fetching member')).then(data => dispatch(fetchComplete(data)))
}