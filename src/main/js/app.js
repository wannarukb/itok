'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux";
import {createStore} from "redux";
import member from './duck/member'
import MemberListComponent from './components/member-list-component'
import MemberViewComponent from './components/member-view-component'
import {BrowserRouter as Router, Route} from 'react-router-dom'


let store =createStore(member)


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/member" component={MemberListComponent}/>
            <Route path="/member/view" component={MemberViewComponent}/>
        </Router>
    </Provider>,
    document.getElementById('memberApp')
)
