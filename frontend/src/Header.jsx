
import styles from './Header.module.scss'
export function Header(){
    return(
        <>
            <div className={styles.root}>
                <div className={styles.main}>
                    <h1 className={styles.head_label}>Умный поиск</h1>
                    <div className={styles.discriptions}>Пройдите анкетирование и получите пакет услуг, который подойдет именно вам.</div>
                    <button className={styles.question_button}>Заполнить анкету</button>
                </div>
            </div>
        </>
    )
}