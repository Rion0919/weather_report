import styles from "../styles/weatherinfo.module.css";

// UNIX UTCフォーマットを変換
const utcConvert = (utc) => {
  return utc * 1000;
};

// 曜日変換
const dayConvert = (dayNum) => {
  switch (dayNum) {
    case 0:
      return "日";
    case 1:
      return "月";
    case 2:
      return "火";
    case 3:
      return "水";
    case 4:
      return "木";
    case 5:
      return "金";
    case 6:
      return "土";
    default:
      return;
  }
};

//日付整形
const currentDateStyle = (data) => {
  const time = new Date(utcConvert(data.dt));
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const day = dayConvert(time.getDay());
  return `${month}月${date}日(${day}) 現在の天気`;
};

const dateStyle = (data) => {
  const time = new Date(utcConvert(data.dt));
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const day = dayConvert(time.getDay());
  const hour = time.getHours();
  return `${month}月${date}日(${day}) ${hour}時`;
};

const WeatherInfo = ({ weatherData, cityName }) => {
  if (weatherData[0] !== undefined) {
    const currentData = {
      date: currentDateStyle(weatherData[0]),
      temparature: Math.floor(weatherData[0].main.temp) + "℃",
      description: weatherData[0].weather[0].description,
      weatherIcon: weatherData[0].weather[0].icon,
    };

    return (
      <div className={styles.infoWindow}>
        <div className={styles.infoHeader}>
          <h4>{`${cityName} 周辺の天気`}</h4>
          <div>
            <h1>{currentData.temparature}</h1>
            <img src={`${currentData.weatherIcon}.png`} alt="images" />
          </div>
        </div>
        <ul className={styles.listContainer}>
          {weatherData.map((item, index) => {
            if (index !== 0) {
              return (
                <li key={index} className={styles.listContent}>
                  <p>{dateStyle(item)}</p>
                  <div>
                    <h1>{Math.floor(item.main.temp) + "℃"}</h1>
                    <div>
                      <img src={`${item.weather[0].icon}.png`} alt="icon" />
                    </div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
};

export default WeatherInfo;
