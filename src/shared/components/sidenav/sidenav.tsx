
import styles from "./sidenav.module.css";
import { NavLink } from "react-router-dom";
import SidenavMobile from "./sidenavMobileComponent";
import classNames from "classnames";

export default function Sidenav() {


    return (
        <>
            <div className={styles.sidenav}>
                <img className={styles.logo} src="/assets/img/logo.png" alt="" />
                <nav>
                    <NavLink className={({isActive}) => isActive ? classNames(styles.navLinkActive, styles.navLink) : styles.navLink} to="/summary" >
                        <img src="/assets/icons/summary.png" alt="" />
                        Summary
                    </NavLink>
                    <NavLink className={({isActive}) => isActive ? classNames(styles.navLinkActive, styles.navLink) : styles.navLink} to="/add-task">
                        <img src="/assets/icons/add_task.png" alt="" />
                        Add Task
                    </NavLink>
                    <NavLink className={({isActive}) => isActive ? classNames(styles.navLinkActive, styles.navLink) : styles.navLink} to="/board">
                        <img src="/assets/icons/board.png" alt="" />
                        Board
                    </NavLink>
                    <NavLink className={({isActive}) => isActive ? classNames(styles.navLinkActive, styles.navLink) : styles.navLink} to="/contacts">
                        <img src="/assets/icons/contacts.png" alt="" />
                        Contacts
                    </NavLink>
                </nav>
            </div>

            <SidenavMobile />

        </>
    )
}