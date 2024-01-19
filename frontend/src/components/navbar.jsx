import React from "react";
import { NavLink } from "react-router-dom";

// Icons
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";

export default function Navbar({isBellRed, handleIconClick}) {



    return (
        <div className="navbar">
          <nav>
            <ul>
              <li>
                <NavLink to="/feed"><HiOutlineHome onClick={handleIconClick}/></NavLink>
              </li>

              <li>
                <NavLink to="/messages"><HiOutlineMail onClick={handleIconClick}/></NavLink>
              </li>
              
              <li>
                <NavLink to="/calendararchive"><HiOutlineCalendar onClick={handleIconClick}/></NavLink>
              </li>

              <li>
                <NavLink to="/addafriend"><HiOutlineUserAdd onClick={handleIconClick}/></NavLink>
              </li>

              <li>
              
                <NavLink to="/notifications"><HiOutlineBell onClick={handleIconClick} className={isBellRed ? "ringing" : ""}  /></NavLink>
              </li>

              <li>
                <NavLink to="/settings"><HiOutlineUserCircle onClick={handleIconClick}/></NavLink>
              </li>

            </ul>
          </nav>
        </div>
    );
}
