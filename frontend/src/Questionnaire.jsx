import styles from './Questionnaire.module.scss'
import { useState } from 'react'
import axios from 'axios';
export function Questionnaire(){
    const [territory, setTerritory] = useState("");
    const [age, setAge] = useState("");
    const [responses, setResponses] = useState("");
    const [servicesOfInterest, setServicesOfInterest] = useState([]);
    const images = ["/buttons/familyButtonBefore.svg", "/buttons/ioButtonBefore.svg", "/buttons/educationButtonBefore.svg", "/buttons/protectButtonBefore.svg",
                            "/buttons/scButtonBefore.svg", "/buttons/zButtonBefore.svg", "/buttons/bapButtonBefore.svg", "/buttons/nasButtonBefore.svg", "/buttons/odButtonBefore.svg",
                            "/buttons/tizButtonBefore.svg", "/buttons/ppnButtonBefore.svg", "/buttons/praButtonBefore.svg", "/buttons/tButtonBefore.svg", "/buttons/hkhButtonBefore.svg",
                            "/buttons/uipButtonBefore.svg"];
    const [checkboxes, setCheckboxes] = useState({
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false,
        check7: false,
        check8: false,
        check9: false,
        check10: false,
        check11: false,
        check12: false,
        check13: false,
        check14: false,
        check15: false

    });
    const handleCheckboxChange = (checkboxName) => {
        const { value } = event.target;
        if (event.target.checked) {
            setServicesOfInterest([...servicesOfInterest, value]);
            console.log(servicesOfInterest);
        } else {
            setServicesOfInterest(servicesOfInterest.filter(item => item !== value));
        }
        setCheckboxes({
            ...checkboxes,
            [checkboxName]: !checkboxes[checkboxName],
        });

    }
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        console.log(form)
        let formData = new FormData(form);
        // You can pass formData as a fetch body directly:
        // You can generate a URL out of it, as the browser does by default:
        console.log(
            new URLSearchParams(formData).toString()
        );
        // You can work with it as a plain object.
        let formJson = Object.fromEntries(
            formData.entries()
        );
        const servicesOfInterestString = servicesOfInterest.join(', ')
        formJson = {
            ...formJson,
            services_of_interest: servicesOfInterestString,
        };
        console.log(formJson); // (!) This doesn't include multiple select values
        // Or you can get an array of name-value pairs.
        console.log([...formData.entries()]);
        const api = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            headers: {
                'Content-Type': 'application/json',
            },
        });
         api.post('http://127.0.0.1:8000/',  formJson )
            .then(response => {
                console.log('Данные успешно созданы:', response.data);
            })
            .catch(error => {
                console.error('Произошла ошибка при создании данных:', error);
            });

    }


    const [city, setCity] = useState("");
    const cities = ["Анжеро-Судженск", "Белово", "Берёзовский", "Гурьевск", "Калтан", "Кемерово", "Киселёвск",
        "Ленинск-Кузнецкий", "Мариинск", "Междуреченск", "Мыски", "Новокузнецк", "Осинники", "Полысаево",
        "Прокопьевск", "Салаир", "Тайга", "Таштагол", "Топки", "Юрга", "Бачатский", "Белогорск", "Верх-Чебула",
        "Грамотеино", "Зеленогорский", "Ижморский", "Инской", "Итатский", "Каз", "Комсомольск", "Крапивинский",
        "Краснобродский", "Мундыбаш", "Новый Городок", "Промышленная", "Рудничный", "Спасск", "Темиртау",
        "Тисуль", "Тяжинский", "Шерегеш", "Яшкино", "Яя"];
    const handleChange = (event) => {
        setCity(event.target.value);
        setTerritory(event.target.value)
    };



    return(
        <>
            <div className={styles.root}>
                <div className={styles.shell}>
                    <div>
                        <h1 className={styles.mainHead}>Онлайн анкетирование</h1>
                        <div className={styles.main}>

                                <>
                                    <h1 className={styles.head}>Ответьте на вопросы:</h1>
                                    <form method="post" className={styles.ourForm} onSubmit={handleSubmit}>
                                        <input
                                            id="city"
                                            type="text"
                                            value={city}
                                            onChange={handleChange}
                                            list="cities"
                                            placeholder="Ваш город"
                                            className={styles.line}
                                            name="territory"
                                            required
                                        />
                                        <datalist id="cities">
                                            {cities.map((city) => (
                                                <option key={city} value={city}/>
                                            ))}
                                        </datalist>

                                        <input type="number" name="age" min="8" max="999" className={styles.ageInput}
                                               placeholder="Ваш возраст" required/>
                                        <select name="category" className={styles.categoryInput}
                                                defaultValue="Город проживания"  required>
                                            <option value="Школьник">Школьник</option>
                                            <option value="Студент">Студент</option>
                                            <option value="Бизнесмен">Бизнесмен</option>
                                            <option value="Родитель">Родитель</option>
                                            <option value="Рабочий">Рабочий</option>
                                            <option value="Пенсионер">Пенсионер</option>
                                        </select>
                                        <h1 className={styles.head}>Выберете подходящие категори:</h1>
                                        <div className={styles.pareOfCategory}>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check1}
                                                       onChange={() => handleCheckboxChange("check1")}
                                                       className={styles.checkBoxes} value={"Семья"}/>
                                                <img
                                                    src={checkboxes.check1 ? "/buttons/familyButtonAfter.svg" : images[0]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check2}
                                                       onChange={() => handleCheckboxChange("check2")}
                                                       className={styles.checkBoxes}
                                                       value={"Имущественные отношения"}/>
                                                <img src={checkboxes.check2 ? "/buttons/ioButtonAfter.svg" : images[1]}
                                                     className={styles.imageOfChecks}/>
                                            </label>
                                        </div>
                                        <div className={styles.pareOfCategory}>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check3}
                                                       onChange={() => handleCheckboxChange("check3")}
                                                       className={styles.checkBoxes} value={"Образование"}/>
                                                <img
                                                    src={checkboxes.check3 ? "/buttons/educationButtonAfter.svg" : images[2]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check4}
                                                       onChange={() => handleCheckboxChange("check4")}
                                                       className={styles.checkBoxes}
                                                       value={"Правопорядок и безопасность"}/>
                                                <img
                                                    src={checkboxes.check4 ? "/buttons/protectButtonAfter.svg" : images[3]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                        </div>
                                        <div className={styles.pareOfCategory}>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check5}
                                                       onChange={() => handleCheckboxChange("check5")}
                                                       className={styles.checkBoxes} value={"Социальное обеспечение"}/>
                                                <img
                                                    src={checkboxes.check5 ? "/buttons/scButtonAfter.svg" : images[4]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check6}
                                                       onChange={() => handleCheckboxChange("check6")}
                                                       className={styles.checkBoxes}
                                                       value={"Здравоохранение"}/>
                                                <img src={checkboxes.check6 ? "/buttons/zButtonAfter.svg" : images[5]}
                                                     className={styles.imageOfChecks}/>
                                            </label>
                                        </div>
                                        <div className={styles.pareOfCategory}>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check7}
                                                       onChange={() => handleCheckboxChange("check7")}
                                                       className={styles.checkBoxes}
                                                       value={"Бизнес и предпринимательство"}/>
                                                <img
                                                    src={checkboxes.check7 ? "/buttons/bapButtonAfter.svg" : images[6]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check8}
                                                       onChange={() => handleCheckboxChange("check8")}
                                                       className={styles.checkBoxes}
                                                       value={"Налоги и сборы"}/>
                                                <img src={checkboxes.check8 ? "/buttons/nasButtonAfter.svg" : images[7]}
                                                     className={styles.imageOfChecks}/>
                                            </label>
                                        </div>
                                        <div className={styles.pareOfCategory}>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check9}
                                                       onChange={() => handleCheckboxChange("check9")}
                                                       className={styles.checkBoxes} value={"Оформление документов"}/>
                                                <img
                                                    src={checkboxes.check9 ? "/buttons/odButtonAfter.svg" : images[8]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check10}
                                                       onChange={() => handleCheckboxChange("check10")}
                                                       className={styles.checkBoxes}
                                                       value={"Труд и занятость"}/>
                                                <img
                                                    src={checkboxes.check10 ? "/buttons/tizButtonAfter.svg" : images[9]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                        </div>

                                        <div className={styles.pareOfCategory}>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check11}
                                                       onChange={() => handleCheckboxChange("check11")}
                                                       className={styles.checkBoxes}
                                                       value={"Программы поддержки населения"}/>
                                                <img
                                                    src={checkboxes.check11 ? "/buttons/ppnButtonAfter.svg" : images[10]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check12}
                                                       onChange={() => handleCheckboxChange("check12")}
                                                       className={styles.checkBoxes}
                                                       value={"Природные ресурсы и экология"}/>
                                                <img
                                                    src={checkboxes.check12 ? "/buttons/praButtonAfter.svg" : images[11]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                        </div>
                                        <div className={styles.pareOfCategory}>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check13}
                                                       onChange={() => handleCheckboxChange("check13")}
                                                       className={styles.checkBoxes} value={"Транспорт"}/>
                                                <img
                                                    src={checkboxes.check13 ? "/buttons/tButtonAfter.svg" : images[12]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check14}
                                                       onChange={() => handleCheckboxChange("check14")}
                                                       className={styles.checkBoxes}
                                                       value={"Жилищно-коммунальное хозяйство"}/>
                                                <img
                                                    src={checkboxes.check14 ? "/buttons/hkhButtonAfter.svg" : images[13]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                        </div>
                                        <div className={styles.pareOfCategory}>
                                            <label>
                                                <input type="checkbox" checked={checkboxes.check15}
                                                       onChange={() => handleCheckboxChange("check15")}
                                                       className={styles.checkBoxes}
                                                       value={"Утверждение инвестиционных программ и предоставление грантов"}/>
                                                <img
                                                    src={checkboxes.check15 ? "/buttons/uipButtonAfter.svg" : images[14]}
                                                    className={styles.imageOfChecks}/>
                                            </label>
                                        </div>
                                        <input type="submit" value="Далее" className={styles.submitButton}/>
                                    </form>
                                </>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
