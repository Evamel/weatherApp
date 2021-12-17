window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temp-description');
    let temperatureDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('degree-section');
    const temperatureSpan = document.querySelector('.temperature span');
    let humidity = document.querySelector('.humidity');
    let pressure = document.querySelector('.pressure');
    let image = document.getElementById('img');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(position);

            const api = `https://api.weatherapi.com/v1/current.json?key=3c043dd4137b4dc29d5152407212611&q=${lat},${long}&aqi=no`;

            fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data =>{
            console.log(data);

            const {temp_c, condition} = data.current;

            temperatureDegree.textContent = temp_c;
            temperatureDescription.textContent = condition.text;
            locationTimezone.textContent = data.location.name;
            

            //Getting the icon info and using it to display the image
            const toSubstr = data.current.condition.icon;
            const substr = toSubstr.substr(20);
            image.src = `${substr}`;

            humidity.textContent = data.current.humidity;
            pressure.textContent = data.current.pressure_mb;

            temperatureDegree.addEventListener('click', () => {
                if(temperatureSpan.textContent === "°F"){
                    temperatureSpan.textContent = "°C";
                }else{
                    temperatureSpan.textContent = "°F";
                }
            });

            temperatureDegree.addEventListener('click', () => {
                if(temperatureSpan.textContent === "°F"){
                    temperatureDegree.textContent = data.current.temp_f;
                }else{
                    temperatureDegree.textContent = data.current.temp_c;
                }
            });
        })

        })
    }else{
        h1.textContent = "Hey it's not working!"
    }
    
});