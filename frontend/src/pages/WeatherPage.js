import AddWeather from "../components/AddWeather";
import WeatherList from "../components/WeatherList";

export default function WeatherPage() {
  return (
    <>
      <h1>Weather Data</h1>
      <AddWeather />
      <WeatherList />
    </>
  );
}
