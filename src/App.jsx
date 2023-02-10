import React, { memo, useState } from "react";
import styles from "./styles/app.module.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Search from "./components/Search";
import WeatherInfo from "./components/WeatherInfo";
import Header from "./components/Header";

const containerStyle = {
  // height: "816px",
  height: "100%",
};

console.log(window.visualViewport.width);

const mapCenter = {
  lat: 35.6828,
  lng: 139.7595,
};

const App = memo(() => {
  const [value, setValue] = useState("");
  const [center, setCenter] = useState(mapCenter);
  const [weather, setWeather] = useState([]);
  const [cityName, setCityName] = useState("");

  let marker;

  // 「検索」ボタンクリック時に呼ぶメソッド
  const onClickSearch = async () => {
    const geocoder = new window.google.maps.Geocoder(); // geocoder instance
    await geocoder.geocode(
      {
        address: value,
      },
      (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const bounds = new window.google.maps.LatLngBounds();
          console.log("OK");
          console.log(results[0]);
          setCityName(results[0].formatted_address);
          const latLng = results[0].geometry.location;
          setCenter({ lat: latLng.lat(), lng: latLng.lng() });
          bounds.extend(latLng);
          const weatherData = getWeatherInfo(latLng);
          weatherData.then((res) => {
            setWeather(res.list);
          });
          setValue("");
          // setLatLng({lat: latLng.lat(), lng: latLng.lng()})
          setMarker(latLng);
        } else if (status === window.google.maps.GeocoderStatus.ZERO_RESULTS) {
          console.log("not found");
        } else {
          console.log("--onClickSearch Error--");
          console.log(status);
        }
      }
    );
  };

  // 取得した座標から転記情報を取得
  const getWeatherInfo = async (latLng) => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latLng.lat()}&lon=${latLng.lng()}&units=metric&cnt=21&lang=ja&appid=${
        process.env.REACT_APP_OWA_KEY
      }`
    );
    const jsonData = await data.json();
    return jsonData;
  };

  const setMarker = (place) => {
    deleteMarker();
    console.log(center);
    // marker = new window.google.maps.Marker({
    //   position: place,
    // })
    marker = true;
  };

  const deleteMarker = () => {
    marker = false;
  };
  return (
    <div>
      <div className={styles.headerContainer}>
        <Header />
        <Search value={value} setValue={setValue} onClick={onClickSearch} />
      </div>
      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_MJA_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              <Marker position={{ lat: 35, lng: 139 }} visible={true} />
            </GoogleMap>
          </LoadScript>
        </div>
        <WeatherInfo weatherData={weather} cityName={cityName} />
      </div>
    </div>
  );
});

export default App;
