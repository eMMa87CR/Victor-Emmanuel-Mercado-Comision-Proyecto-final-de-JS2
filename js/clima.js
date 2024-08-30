const API_KEY = "981703f573d6f40c1b2f85ca554224cf";
const CIUDAD = "Comodoro Rivadavia";

export function obtenerClima() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CIUDAD}&appid=${API_KEY}&units=metric&lang=es`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const temperatura = data.main.temp;
      const descripcion = data.weather[0].description;
      const icono = data.weather[0].icon;

      const climaHTML = `
                <p>Clima en ${CIUDAD}: ${temperatura}°C, ${descripcion}</p>
                <img src="http://openweathermap.org/img/wn/${icono}.png" alt="Icono del clima">
            `;

      document.getElementById("clima").innerHTML = climaHTML;
    })
    .catch((error) => {
      document.getElementById("clima").innerHTML =
        "<p>No se pudo obtener la información del clima. Por favor, verifica tu conexión a internet o intenta de nuevo más tarde.</p>";
    });
}
