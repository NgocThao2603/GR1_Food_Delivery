import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <div className='sidebar'>
        <div className="sidebar-options">
          <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" style={{ width: '30px', height: 'auto' }} />
            <p>Add Items</p>
          </NavLink>
        </div>
        <div className="sidebar-options">
          <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" style={{ width: '30px', height: 'auto' }} />
            <p>List Items</p>
          </NavLink>
        </div>
        <div className="sidebar-options">
          <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" style={{ width: '30px', height: 'auto' }} />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
