import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        console.log("clicked");
        initialize();
    };
    return (
        <div className="container mt-5">
            <h2>Головна сторінка</h2>
            <h3>Ініціалізація даних в FireBase</h3>
            <ul>
                <li>Статус: {status} </li>
                <li>Прогрес: {progress}%</li>
                {error && <li> {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Ініціалізувати
            </button>
        </div>
    );
};

export default Main;
