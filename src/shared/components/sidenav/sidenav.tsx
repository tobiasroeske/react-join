
import styles from "./sidenav.module.css";
import { NavLink, useLocation } from "react-router-dom";
import SidenavMobile from "./sidenavMobileComponent";
import classNames from "classnames";
import { useEffect, useState } from "react";

function Sidenav() {
    const [hideNav, setHideNav] = useState<boolean>(false);
    const location = useLocation();
    const specialPathNames = ['/help', 'legal-notice', 'privacy-policy'];

    useEffect(() => {
        specialPathNames.forEach(path => {
            if (location.pathname.includes(path)) {
                setHideNav(true);
            }
        })
    }
    )

    return (
        <>
            <div className={styles.sidenav}>
                <img className={styles.logo} src="/assets/img/logo.png" alt="" />
                {!hideNav && 
                <nav>
                    <NavLink className={({ isActive }) => isActive ? classNames(styles.navLinkActive, styles.navLink) : styles.navLink} to="/summary" >
                        <img src="/assets/icons/summary.png" alt="" />
                        Summary
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? classNames(styles.navLinkActive, styles.navLink) : styles.navLink} to="/add-task">
                        <img src="/assets/icons/add_task.png" alt="" />
                        Add Task
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? classNames(styles.navLinkActive, styles.navLink) : styles.navLink} to="/board">
                        <img src="/assets/icons/board.png" alt="" />
                        Board
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? classNames(styles.navLinkActive, styles.navLink) : styles.navLink} to="/contacts">
                        <img src="/assets/icons/contacts.png" alt="" />
                        Contacts
                    </NavLink>
                </nav>}
            </div>
            {!hideNav && <SidenavMobile />}
            

        </>
    )
}

export default Sidenav