import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import SignUp from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Account from "./Pages/Account/Account";
// import SearchAccount from "./Pages/Account/SearchAccount";
import Articles from "./Pages/Article/Article";
import { AppContextProvider } from './Context/AppContext';

import Navbar from "./Components/Navbar";
import "./App.css";

function App() {
	return (
		<AppContextProvider>
		<BrowserRouter>
		  <Navbar />
		  <Switch>
			<Route exact path="/signup" component={SignUp} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/" component={Home} />
			<PrivateRoute exact path="/conversation/:id" component={Account} />
			{/* <PrivateRoute exact path="/matches" component={SearchAccount} /> */}
			<PrivateRoute exact path="/match/:id" component={Articles} />
		  </Switch>
		</BrowserRouter>
	  </AppContextProvider>
	);
}

export default App;
