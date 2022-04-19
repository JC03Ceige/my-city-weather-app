import React from "react";
/* We import the Card and ListGroup components from reactstrap */
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

/* We create the component using an arrow function. We pass data as props. */
const WeatherDetails = ({ data }) => {
  /* We declare varialble to hold the URL for the API icons to match the current
  weather. As with the base url, this is dynamic and depends on the user input. */
  const iconurl =
    "http://openweathermap.org/img/wn/" +
    `${data.cod !== 404 ? data.weather[0].icon : null}` +
    ".png";

  /* This returns the elements that will be seen in the render. */
  return (
    <div>
      {/* The card component is use to the weather data that has been retrieved. */}
      <Card
        className="card"
        style={{
          width: "18rem",
          backgroundColor: "rgba(215, 235, 235, 0.5)",
        }}
      >
        <Card.Body>
          <Card.Title>
            <span>
              {" "}
              {data.name}, {data.sys.country}
            </span>
            <h1>
              {" "}
              {/* The temperature is returned in Kelvin.
              We need to convert it to Celcius. */}
              {Math.floor(data.main.temp - 273.15)}
              <sup>o</sup> C {"    "}
              {data && <img src={iconurl} alt="weather_icon" />}
            </h1>
            <h3>{data.weather[0].main}</h3>
            <Card.Text>{data.weather[0].description}</Card.Text>
          </Card.Title>
        </Card.Body>

        {/* The ListGroup component lists weather items inside the card. */}
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="list-item">
            <span className="list-content">Feels Like:</span>{" "}
            {Math.floor(data.main.feels_like - 273.15)}
          </ListGroup.Item>
          <ListGroup.Item className="list-item">
            <span className="list-content">Humidity:</span>{" "}
            {Math.floor(data.main.humidity)}
          </ListGroup.Item>
          <ListGroup.Item className="list-item">
            <span className="list-content">Wind Speed:</span> {data.wind.speed}{" "}
            km/h
          </ListGroup.Item>
          <ListGroup.Item className="list-item">
            <span className="list-content">Max-Temp:</span>{" "}
            {Math.floor(data.main.temp_max - 273.15)}
          </ListGroup.Item>
          <ListGroup.Item className="list-item">
            <span className="list-content">Min-Temp:</span>{" "}
            {Math.floor(data.main.temp_min - 273.15)}
          </ListGroup.Item>
          <ListGroup.Item className="list-item">
            <span className="list-content">Sunrise:</span>{" "}
            {/* Time needs to be converted from seconds. */}
            {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
          </ListGroup.Item>
          <ListGroup.Item className="list-item">
            <span className="list-content">Sunset:</span>{" "}
            {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body></Card.Body>
      </Card>
    </div>
  );
};

export default WeatherDetails;
