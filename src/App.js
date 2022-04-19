import "./App.css";
/* The WeatherUI component is imported to be rendered in the App. */
import WeatherUI from "./components/WeatherUI";

const App = () => {
  return (
    <div className="App">
      <WeatherUI />
    </div>
  );
};

export default App;
