import styles from "./styles.module.scss"

export default function Bento(){
    return (
        <div className={styles.bento}>
            <div className={`${styles.box} ${styles.b1x1}`}>a</div>

            <div className={`${styles.box} ${styles.b2x1}`}>b</div>

            <div className={`${styles.box} ${styles.b1x1}`}>c</div>

            <div className={`${styles.box} ${styles.b1x1}`}>d</div>

            <div className={`${styles.box} ${styles.b1x2}`}>e</div>

            <div className={`${styles.box} ${styles.b2x1}`}>f</div>
        </div>
    )
}