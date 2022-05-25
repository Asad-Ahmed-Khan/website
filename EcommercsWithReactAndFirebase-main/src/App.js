

import { Link } from "react-router-dom";

import React, { Component, useEffect, useState } from 'react'

import { Home } from './Components/Home'
import { BrowserRouter, Switch, Route ,useLocation} from 'react-router-dom'
import { Signup } from './Components/Signup'
import { Login } from './Components/Login'
import SubNavbar from "./Components/SubNavbar";
import { ProductsContextProvider } from "./Global/ProductsContext";
import { NotFound } from './Components/NotFound'
import { auth, db } from './Config/config'
import { CartContextProvider } from './Global/CartContext'
import { Cart } from './Components/Cart'
import { AddProducts } from './Components/AddProducts'
import { Cashout } from './Components/Cashout'
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./admin/Dashboard/";
import SeePost from "./admin/Dashboard/SeePost";
import Admin from "./admin";
import Posts from "./Components/Posts";
import { fire } from "./Config/config"
import Offline from "./Components/offline";


const App = () => {
    


    // state = {
    //   user : null,
    //   userId: null,
    // }

   
         const dispatch = useDispatch();
       const { pathname } = useLocation();

        // // getting user info for navigation bar
        // auth.onAuthStateChanged(user => {
        //     if (user) {
        //         db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
        //             this.setState({
        //                 user: snapshot?.data()?.Name || 'user',
        //                 userId: snapshot?.id,
        //             })
        //         })
        //     }
        //     else {
        //         this.setState({
        //             user: null,
        //             userId: null,
        //         })
        //     }
        // })
        useEffect(() => {
            fire.auth().onAuthStateChanged((user) => {
              if (user) {
                if (!isLoggedIn) dispatch({ type: "SET_USER", payload: user });
              }
            });
          }, [dispatch]);
        
          const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
          const [onLine, setOnLine] = useState(false);
        
          useEffect(() => {
            setOnLine(navigator.onLine);
            if (!onLine) dispatch({ type: "RESET_USER" });
          }, [navigator.onLine]);
        
          if (!onLine) {
            return <Offline />;
          }

        

   
        return (
            <ProductsContextProvider>
                <CartContextProvider>
                    <BrowserRouter>
                        <Switch>
                        <Route path={""}>                 
                        {isLoggedIn && !pathname.includes("/admin") ? <SubNavbar /> : null}
                        {!pathname.includes("/") ? <Navbar /> : null}
                        
                           <Route exact path={"/"}>
                             <Home />
                            </Route>
                            <Route path={"/posts"}>
                             <Posts />
                            </Route>
                             <Route exact path={"/post/:id/:title"}>
                            <SeePost />
                             </Route>
                            <Route path={"/admin"}>
                             <Admin />
                             </Route>
                      </Route>
                     
                            {/* home */}
                            <Route exact path='/' component={() => <Home user={this.state.user} />} />
                            {/* signup */}
                            <Route path="/signup" component={Signup} />
                            {/* login */}
                            <Route path="/login" component={Login} />
                            {/* cart products */}
                            <Route path="/cartproducts" component={() => <Cart user={this.state.user} />} />
                            {/* add products */}
                            <Route path="/addproducts" children={props => <AddProducts {...props} userId={this.state?.userId} />} />
                            {/* cashout */}
                            <Route path='/cashout' component={() => <Cashout user={this.state.user} />} />
                            <Route component={NotFound} />

         
                        </Switch>
                    </BrowserRouter>
                </CartContextProvider>
            </ProductsContextProvider>
        )
           
}

export default App
