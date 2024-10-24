import React, { useState, useEffect } from "react";
import styles from "./Style.module.css";
import axios from "axios";

const WeatherPage = () => {
  const [inputValue, setInputValue] = useState("india");
  const [responseDisplay, setResponseDisplay] = useState({});

  const handleSubmit = () => {
    fetching();
    setInputValue("");
  };

  useEffect(() => {
    fetching();
  }, []);

  async function fetching() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue},IND&appid=30c0dae34517d3ca6d78eb9b07e2902c&units=metric`
      );
      if (response.status === 200) {
        setResponseDisplay(response.data.main);
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(responseDisplay);
  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.heading}>Weather-App</h1>
      <section className={styles.labelContainer}>
        <label htmlFor="city">
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Type city"
            className={styles.inputField}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <div className={styles.searchBtn}>
          <button type="button" className={styles.btn} onClick={handleSubmit}>
            Search
          </button>
        </div>
      </section>
      {responseDisplay ? (
        <section className={styles.showingContainer}>
          <p className={styles.para}>Temp :{responseDisplay.temp}</p>
          <p className={styles.para}>Temp-min :{responseDisplay.temp_min}</p>
          <p className={styles.para}>Temp-max :{responseDisplay.temp_max}</p>
          <p className={styles.para}>Pressure :{responseDisplay.pressure}</p>
          <p className={styles.para}>Humidity :{responseDisplay.humidity}</p>
          <p className={styles.para}>Sea-level :{responseDisplay.sea_level}</p>
          <p className={styles.para}>
            Ground-level :{responseDisplay.grnd_level}
          </p>
        </section>
      ) : (
        <span>No data</span>
      )}
    </main>
  );
};

export default WeatherPage;
