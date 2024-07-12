import Headline from "./headlineComponent";
import styles from "../summaryPage.module.css"
import TopTasks from "./topTasks";
import { useAuthContext } from "../../shared/authProvider";
import UrgentTask from "./urgentTaskComponent";
import BottomTask from "./bottomTasksComponent";
import { useNavigate } from "react-router-dom";

function Summary() {
    const authContext = useAuthContext();
    const { user } = authContext;
    const navigate = useNavigate();

    const editSvg = (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.0612 22.1418H4.92787L16.4279 10.6418L14.5612 8.7751L3.0612 20.2751V22.1418ZM22.1279 8.70843L16.4612 3.10843L18.3279 1.24176C18.839 0.730653 19.4668 0.475098 20.2112 0.475098C20.9556 0.475098 21.5834 0.730653 22.0945 1.24176L23.9612 3.10843C24.4723 3.61954 24.739 4.23621 24.7612 4.95843C24.7834 5.68065 24.539 6.29732 24.0279 6.80843L22.1279 8.70843ZM20.1945 10.6751L6.0612 24.8084H0.394531V19.1418L14.5279 5.00843L20.1945 10.6751Z" fill="currentColor" />
        </svg>

    )

    const checkSvg = (
        <svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.92285 14.8085L15.1516 25.8745L33.8662 3.74243" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

    function handleNavigate() {
        navigate('/board');
    }

    return (
        <>
            <Headline />
            <div className={styles.content}>
                <div className={styles.dashboard}>
                    <div className={styles.row}>
                        <TopTasks icon={editSvg} amount={2} title={'To-do'} navigate={handleNavigate}/>
                        <TopTasks icon={checkSvg} amount={3} title={'Done'} navigate={handleNavigate}/>
                    </div>
                    <div className={styles.row}>
                        <UrgentTask navigate={handleNavigate} />
                    </div>
                    <div className={styles.row}>
                        <BottomTask amount={5} title={'Tasks in Board'} navigate={handleNavigate} />
                        <BottomTask amount={2} title={'Tasks in Progress'} navigate={handleNavigate} />
                        <BottomTask amount={2} title={'Awaiting Feedback'} navigate={handleNavigate} />
                    </div>
                </div>
                <div className={styles.greetingContainer}>
                    <div className={styles.greetingBox}>
                        <h2>Good morning</h2>
                        <span>{user?.displayName}</span>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Summary;