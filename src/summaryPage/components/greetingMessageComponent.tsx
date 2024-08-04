import { useAuthContext } from "../../shared/authProvider";
import styles from "../summaryPage.module.css";

function GreetingMessage() {
    const  { user } = useAuthContext();

    return ( 
        <div className={styles.greetingMessage}>
            <div className={styles.greetingBox}>
                        <h2>Good morning</h2>
                        <span>{user?.displayName}</span>
                    </div>
        </div>
     );
}

export default GreetingMessage;