import React from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/slices/cartSlice'
import { logout } from '../../redux/slices/authSlice'

const AdminSidebar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
      dispatch(logout())
      dispatch(removeFromCart())
      navigate("/")
    }

  return (
    <div className='p-6'>
       <div className="mb-6">
         <Link to='/admin' className='text-2xl font-medium'>Novakart</Link>
       </div>
       <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>

       <nav className="flex flex-col space-y-2">
         <NavLink to='/admin/addproduct' className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded items-center space-x-2"  : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded items-center space-x-2 flex"}>
           <FaUser/>
           <span>AddProduct</span>
         </NavLink>
         <NavLink to='/admin/users' className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded items-center space-x-2"  : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded items-center space-x-2 flex"}>
           <FaUser/>
           <span>Users</span>
         </NavLink>
         <NavLink to='/admin/products' className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded items-center space-x-2"  : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded items-center space-x-2 flex"}>
           <FaBoxOpen/>
           <span>Products</span>
         </NavLink>
         <NavLink to='/admin/orders' className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded items-center space-x-2"  : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded items-center space-x-2 flex"}>
           <FaClipboardList/>
           <span>Orders</span>
         </NavLink>
         <NavLink to='/' className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded items-center space-x-2"  : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded items-center space-x-2 flex"}>
           <FaStore/>
           <span>Shop</span>
         </NavLink>
       </nav>

       <div className="mt-6">
         <button onClick={handleLogout} className='w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2'>
            <FaSignOutAlt/>
            <span>Logout</span>
         </button>
       </div>
    </div>
  )
}

export default AdminSidebar
