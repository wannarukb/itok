'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import member, {fetchMember, fetchMetaData} from './duck/member'
import MemberListComponent from './components/member-list-component'
import MemberViewComponent from './components/member-view-component'
import MemberEditComponent from './components/member-edit-component'
import {Route,} from 'react-router-dom'
import {ConnectedRouter, routerMiddleware, routerReducer} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk' // no changes here 😀
import {reducer as formReducer} from 'redux-form'
import ReduxSweetAlert, {reducer as swalReducer} from 'react-redux-sweetalert';
import ScrollToTop from './scroll-to-top'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);


let store = createStore(combineReducers({
        member, routing: routerReducer, form: formReducer, sweetalert: swalReducer
    }
), applyMiddleware(middleware, thunk));




ReactDOM.render(
    <Provider store={store}>

        <ConnectedRouter history={history}>
            <ScrollToTop>
                <div>
                    <ReduxSweetAlert/>

                    <Route exact path="/member" component={MemberListComponent}/>
                    <Route exact path="/member/view/:id" component={MemberViewComponent}/>
                    <Route exact path="/member/edit/:id" component={MemberEditComponent}/>
                    <Route exact path="/member/new" component={MemberEditComponent}/>
                </div>
            </ScrollToTop>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('memberApp')
);
