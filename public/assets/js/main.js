console.log("main.js loaded");

const form = document.getElementById("weather-form");
const input = document.getElementById("location-input");
const placeHolder = document.getElementById("weather-info");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (!location) return;

  placeHolder.classList.remove("show");
  placeHolder.innerHTML = "Loading...";

  const apiKey = "b225f0ba928149e19fa190235250906"; 
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=14`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();

    const city = result.location.name;
    const country = result.location.country;
    const forecast = result.forecast.forecastday;

    let html = `<h2>Forecast for ${city}, ${country}</h2>`;

    forecast.forEach(day => {
      const date = day.date;
      const avgTemp = day.day.avgtemp_c;
      const icon = day.day.condition.icon;
      const text = day.day.condition.text;

      html += `
        <div class="forecast-day">
          <strong>${date}</strong> ${avgTemp}°C 
          <img src="${icon}" alt="${text}" /> ${text}
        </div>
      `;
    });

    placeHolder.innerHTML = html;
    placeHolder.classList.add("show");
  } catch (error) {
    placeHolder.innerHTML = `<p style="color: red;">Error fetching forecast. Please check the location and try again.</p>`;
    placeHolder.classList.add("show");
    console.error("Fetch error:", error);
  }
});
