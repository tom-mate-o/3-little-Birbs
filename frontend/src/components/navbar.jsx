import React from "react";
import { NavLink } from "react-router-dom";

// Icons
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";

export default function Navbar({isBellRed}) {



    return (
        <div className="navbar">
          <nav>
            <ul>
              <li>
                <NavLink to="/feed"><HiOutlineHome/></NavLink>
              </li>

              <li>
                <NavLink to="/messages"><HiOutlineMail/></NavLink>
              </li>
              
              <li>
                <NavLink to="/calendararchive"><HiOutlineCalendar/></NavLink>
              </li>

              <li>
                <NavLink to="/addafriend"><HiOutlineUserAdd/></NavLink>
              </li>

              <li>
              {/* className={isBellRed ? "ringing" : ""} */}
                <NavLink to="/notifications"><HiOutlineBell color={isBellRed ? "red" : "default"}  /></NavLink>
              </li>

              <li>
                <NavLink to="/settings"><HiOutlineUserCircle/></NavLink>
              </li>

            </ul>
          </nav>
        </div>
    );
}
