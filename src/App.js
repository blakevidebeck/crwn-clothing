import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './App.css'

import HomeScreen from './screens/homescreen/HomeScreen'
import ShopScreen from './screens/shopscreen/ShopScreen'
import LoginAndRegisterScreen from './screens/LoginAndRegisterScreen/LoginAndRegisterScreen'
import CheckoutScreen from './screens/checkout/CheckoutScreen'

import Header from './components/header/Header'

import { selectCurrentUser } from './redux/user/userSelectors'
import { checkUserSession } from './redux/user/userActions'

const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => {
		checkUserSession()
	}, [checkUserSession])

	return (
		<>
			<Header />
			<Switch>
				<Route exact path='/checkout' component={CheckoutScreen} />
				<Route path='/shop' component={ShopScreen} />
				<Route
					exact
					path='/login'
					render={() =>
						currentUser ? <Redirect to='/' /> : <LoginAndRegisterScreen />
					}
				/>
				<Route exact path='/' component={HomeScreen} />
			</Switch>
		</>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
