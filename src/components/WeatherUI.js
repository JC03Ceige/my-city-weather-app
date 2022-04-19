/* This is a statefull component for which we import useState. */
import React, { useState } from "react";
/* We import the Form component from reactstrap */
import Form from "react-bootstrap/Form";
/* We import a JSON file of country codes that we will use to build options. */
import Codes from "../country_codes.json";
/* The WeatherDetails component is imported. */
import WeatherDetails from "./WeatherDetails";

/* This component is built as a arrow function. */
const WeatherUI = () => {
  /* We use hooks to manipulate the states of the component */
  const [myWeather, setMyWeather] = useState([]);
  const [input, setInput] = useState({
    city: "",
    code: "",
  });

  /* Before we fetch the API we create a variable that will host the URL.
  
  **Note that the values passed into the URL are dynamic and depends on the user input.
  For this reason we can't use useEffect as this will attempt to load the API from an invalid URL, breaking the code.*/
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${input.city},${input.code}&APPID=${process.env.REACT_APP_API_KEY}`;

  /* Because we need to access the data as we load it, we make use of an async funtion. */
  const getWeather = async (e) => {
    e.preventDefault();
    /* The API is called using a promise. */
    const data = await fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => data);
    /* Once we have the data from the API we set the state of our array in a key:value format */
    setMyWeather({ data: data });
    console.log(data);
  };
  /* This allows us check the various objects in the API. */
  console.log(myWeather);

  /* This handles the onChange event for the user input. */
  const userInput = (e) => {
    /* We use if statements to check which input the user is typing in and then
    we run through our input object to change the relevant value. */
    if (e.target.name === "city") {
      setInput({ ...input, city: e.target.value });
    }
    if (e.target.name === "country") {
      //console.log(e.target.value);
      setInput({ ...input, code: e.target.value });
    }
  };
  // These log the inputs to see if the state has been updated successfully.
  // console.log(input.city);
  // console.log(input.country);

  /* This is what will be passed to the App.js for the final render. */
  return (
    <div>
      <h1 className="title">My City Weather 🌤️</h1>
      <div className="input-header">
        {/* Form.Control is reactstrap equivalent of input. */}
        {/* This takes text input for the city */}
        <Form.Control
          className="input"
          type="text"
          placeholder="City"
          name="city"
          onChange={userInput}
        />
        {/* This is a select element which we populate with the country codes JSON file
        using a map function. 
        The user is given a selection of country names, which then passes the selected 
        country code from the JSON file, to the fetch url. */}
        <Form.Select
          className="input"
          type="option"
          name="country"
          onChange={userInput}
        >
          <option>Country</option>
          {Object.keys(Codes).map((c) => (
            <option key={Codes[c].Name} value={Codes[c].Code}>
              {Codes[c].Name}
            </option>
          ))}
        </Form.Select>
        <Form.Label className="label"></Form.Label>
      </div>
      {/* This button triggers the getWeather event function. */}
      <button
        type="submit"
        onClick={(e) => {
          getWeather(e);
        }}
      >
        Get Weather
      </button>
      {/* In order to prevent the app from rendering a blank screen we use a ternary
      statement to check if the myWeather object has been defined yet (have we loaded
      the API yet)? The WeatherDetails component only loads when the API has been called
      successfully */}
      {myWeather.data !== undefined ? (
        <WeatherDetails data={myWeather.data} />
      ) : null}
    </div>
  );
};

/* We export the component for use in the App.js */
export default WeatherUI;
