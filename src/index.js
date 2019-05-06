import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Users from './router/Users';
import { Route,HashRouter} from "react-router-dom";

const container = document.createElement("div");
document.body.appendChild(container);

// Router to Handle Client Request 
ReactDOM.render(
			<HashRouter>
			<Route path="/users" component={Users}/>
			<Route path="/" component={Users}/>
  			</HashRouter>, container);

serviceWorker.unregister();
