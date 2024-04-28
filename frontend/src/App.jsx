import styles from './App.module.scss'
import {Header} from './Header.jsx'
import {Questionnaire} from "./Questionnaire.jsx";
import {Add} from "./Add.jsx"
import {View} from "./view.jsx"
export function App() {
  return (
    <>
        <div className={styles.all}>
            <Header />
            <Add />
            <Questionnaire />
        </div>



    </>
  )
}

