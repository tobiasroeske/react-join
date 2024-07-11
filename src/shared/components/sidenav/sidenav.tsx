
import "./sidenav.css";
import { NavLink } from "react-router-dom";

export default function Sidenav() {
    return (
        <>
            <div className="sidenav">
                <img className="logo" src="/assets/img/logo.png" alt="" />
                <nav>
                    <NavLink className={({isActive}) => isActive ? 'nav-link-active nav-link' : 'nav-link'} to="/summary" >
                        <img src="/assets/icons/summary.png" alt="" />
                        Summary
                    </NavLink>
                    <NavLink className={({isActive}) => isActive ? 'nav-link-active nav-link' : 'nav-link'} to="/add-task">
                        <img src="/assets/icons/add_task.png" alt="" />
                        Add Task
                    </NavLink>
                    <NavLink className={({isActive}) => isActive ? 'nav-link-active nav-link' : 'nav-link'} to="/board">
                        <img src="/assets/icons/board.png" alt="" />
                        Board
                    </NavLink>
                    <NavLink className={({isActive}) => isActive ? 'nav-link-active nav-link' : 'nav-link'} to="/contacts">
                        <img src="/assets/icons/contacts.png" alt="" />
                        Contacts
                    </NavLink>
                </nav>


            </div>

        </>
    )
}