'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux";
import {createStore} from "redux";
import member from './duck/member'
import Hello from './components/hello'

// let store =createStore(member)


ReactDOM.render(
    <Hello/>,
    document.getElementById('memberApp')
)
