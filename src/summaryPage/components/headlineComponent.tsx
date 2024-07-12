import styles from  '../summaryPage.module.css'

function Headline() {
    return (
        <div className={styles.headline}>
            <h1>Join 360</h1>
            <div className={styles.seperator}></div>
            <h3>Key Metrics at a Glance</h3>
        </div>
    );
}

export default Headline;