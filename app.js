window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temp-description');
    let temperatureDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let icon = document.querySelector('.icon')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(position);

            const api = `http://api.weatherapi.com/v1/current.json?key=3c043dd4137b4dc29d5152407212611&q=${lat},${long}&aqi=no`;

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
            // icon.textContent = condition.icon;
            const {icon} = condition.icon;

        })

        })
    }else{
        h1.textContent = "Hey it's not working!"
    }
    
    
});