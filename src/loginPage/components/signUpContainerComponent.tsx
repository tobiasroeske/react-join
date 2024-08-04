import { Link } from "react-router-dom";
import styles from "../loginPage.module.css";

function SignUpContainer() {
    return (
    <div className={styles.signupContainer}>
        <span>Not a Join User?</span>
        <Link to="/register"><button className={styles.signupBtn}>Sign up</button></Link>
    </div>);
}

export default SignUpContainer;