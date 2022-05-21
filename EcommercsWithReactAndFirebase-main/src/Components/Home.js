import React, { useEffect } from 'react'
import Navbar  from './Navbar';
import SubNavbar from './SubNavbar'
import { Products } from './Products'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/config'
import { ProductsContext } from '../Global/ProductsContext';



export const Home = ({ user }) => {

    const history = useHistory();

    useEffect(() => {
        // forcing user to signup
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
    })

    return (
        <div className='wrapper'>
            {/* <SubNavbar /> */}
            <Navbar user={user} />
            <Products />
        </div>
    )
}
