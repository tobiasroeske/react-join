import classNames from "classnames";
import styles from "./sidenav.module.css"
import { NavLink } from "react-router-dom";

function SidenavMobile() {
    return (
        <div className={styles.sidenavMobile}>
            <nav>
                <NavLink className={({ isActive }) => isActive ? classNames(styles.navLinkActive, styles.navLinkMobile) : styles.navLinkMobile} to="/summary" >
                    <img src="/assets/icons/summary.png" alt="" />
                    Summary
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? classNames(styles.navLinkActive, styles.navLinkMobile) : styles.navLinkMobile} to="/add-task">
                    <img src="/assets/icons/add_task.png" alt="" />
                    Add Task
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? classNames(styles.navLinkActive, styles.navLinkMobile) : styles.navLinkMobile} to="/board">
                    <img src="/assets/icons/board.png" alt="" />
                    Board
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? classNames(styles.navLinkActive, styles.navLinkMobile) : styles.navLinkMobile} to="/contacts">
                    <img src="/assets/icons/contacts.png" alt="" />
                    Contacts
                </NavLink>
            </nav>
        </div>
    );
}

export default SidenavMobile;