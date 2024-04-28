import styles from './Add.module.scss'

export function Add(){
    return(
        <>
            <div className={styles.root}>
                <div className={styles.wifiBlock}>
                    <div className={styles.shell}>
                        <img src="/wifi_icon.svg" alt="Иконка" className={styles.wifiIcon}/>
                        <div className={styles.labels}>
                            <h1>Онлайн</h1>
                            <div className={styles.discriptions}>Получи ответы не выходя из дома.</div>
                        </div>

                    </div>

                </div>
                <div className={styles.timeBlock}>
                    <div className={styles.shell}>
                        <img src="/clock_icon.svg" alt="Часы"/>
                        <div className={styles.labels}>
                            <h1>1 минута</h1>
                            <div className={styles.discriptions}>Получи ответы на все свои вопросы:)</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}