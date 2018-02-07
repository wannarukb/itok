'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux";
import {createStore} from "redux";
import member from './duck/member'
import MemberListComponent from './components/member-list-component'

// let store =createStore(member)


ReactDOM.render(
    <MemberListComponent/>,
    document.getElementById('memberApp')
)
