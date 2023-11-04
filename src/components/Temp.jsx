import { useEffect, useState } from "react";

function Temp() {
  const [hourlyTime, setHourlyTime] = useState([]);
  const [hourlyTemperature, setHourlyTemperature] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=33.749&longitude=-84.388&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FNew_York"
        )
      ).json();

      setHourlyTime(data.hourly.time.slice(0, 5));
      setHourlyTemperature(data.hourly.temperature_2m.slice(0, 5));
    };

    dataFetch();
  }, []);

  return (
    <div className="group" style={{ display: "flex" }}>
      {hourlyTemperature.map((temp, index) => (
        <div>
          <p>{new Date(hourlyTime[index]).toLocaleString()}</p>
          <p>{temp} F</p>
        </div>
      ))}
    </div>
  );
}

export default Temp;
