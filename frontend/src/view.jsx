import { useEffect, useState } from 'react';
import axios from 'axios';
export function View(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/');
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div>
                {/* ... ваш React-код */}

                <button onClick={getData} disabled={isLoading}>
                    Загрузить данные
                </button>

                {isLoading && <p>Загрузка...</p>}

                {data.map((item) => (
                    <p key={item.id}>{item.name}</p>
                ))}
            </div>

        </>

    );

};