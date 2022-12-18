import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Products from '../pages/Products'
import Orders from "../pages/Orders";
import EditProductDetail from '../pages/EditProductDetail'
import AddOrderDetail from '../pages/AddOrderDetail'
import AddProductDetail from '../pages/AddProductDetail'
import Logout from '../pages/Logout'
import EditProfile from '../pages/EditProfile'
import SignUp from '../pages/SignUp'
import Category from '../pages/Category'
const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' component={Customers}/>
            <Route path='/products' component={Products}/>
            <Route path='/orders' component={Orders} />
            <Route path='/edit-product/:id' component={EditProductDetail} />
            <Route path='/edit-order/:id' component={AddOrderDetail} />
            <Route path='/add-product' component={AddProductDetail} />
            <Route path='/logout' component={Logout}/>
            <Route path='/profile' component={EditProfile}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/categories' component={Category}/>
            <Route path='*' component={() => <h1>404 Not Found</h1>}/>
        </Switch>
    )
}

export default Routes
