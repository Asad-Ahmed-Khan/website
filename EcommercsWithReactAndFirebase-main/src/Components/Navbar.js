import React, { useContext } from 'react'
import logo from '../images/orignal'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'
import "../index.css"


import { Menu, Dropdown, Button, Space } from 'antd';

export const Navbar = ({ user }) => {

    const history = useHistory();
    const { totalQty } = useContext(CartContext);

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    
    }
const menu = (
    <Menu
    items={[
     
      {
        label: (
          <a  rel="noopener noreferrer" href="../AddProducts">
            Add Product
          </a>
        ),
      },
      {
        label: (
            <a  onClick={handleLogout}>Logout</a>
        ),
      },
     
    ]}
  />

);
    return (
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} alt="" />
            </div>
          
            {/* {!user && <div className='rightside'>
                <span><Link to="signup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="login" className='navlink'>LOGIN</Link></span>
            </div>} */}
            {user && <div className='rightside'>
                
                <span><Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
                <span className='no-of-products'>{totalQty}</span>
                {/* <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span> */}
            
            <Space direction="vertical">
            <Space wrap>
            <Dropdown  overlay={menu} placement="bottom">
              <Button className='logout-btn' style={{backgroundColor:"#f57224"}}><span><Link to="/" style={{color:"white"}} className='navlink'>{user}</Link></span></Button>
            </Dropdown>
            </Space>
            </Space></div>}
            
        </div>
    )
}


// export const Navbar = ({ user }) => {

//     const history = useHistory();
//     const { totalQty } = useContext(CartContext);

//     // handle logout
//     const handleLogout = () => {
//         auth.signOut().then(() => {
//             history.push('/login');
//         })
//     }

// const menu = (
//     <Menu
//       items={[
//         {
//           label: (
//             <a target="_blank" rel="noopener noreferrer" href="login">
//              Login
//             </a>
//           ),
//         },
//         {
//           label: (
//             <a target="_blank" rel="noopener noreferrer" href="signup">
//               SingUp
//             </a>
//           ),
//         },
       
//       ]}
//     />
//   );
//   return (
//     <Space direction="vertical">
//       <Space wrap>
//       <Dropdown  overlay={menu} placement="bottom">
//       <span><Link to="/" className='navlink'>{user}</Link></span>
//       </Dropdown>
//     </Space>
//   </Space>
// );
//   }