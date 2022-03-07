const weatherFrom = document.querySelector('form');
const search = document.querySelector('input');


const renderContent = (event, content) => {
    const paragraphId = `#message-${event}`;
    const messageTarget = document.querySelector(paragraphId);
    
    if (messageTarget) {
        messageTarget.textContent = content;
    }
}

const getWeatherData = address => {
    const geocodeUrl = `/weather?address=${address}`;

    fetch(geocodeUrl).then(response => {
        response.json().then(data => {
            if (data.error) {
                renderContent('first', data.error);
            } else {
                renderContent('first', data.location);
                renderContent('second', JSON.stringify(data.forecastData));
            }
        });
    });
}


weatherFrom.addEventListener('submit', e => {
    e.preventDefault();
    
    renderContent('first', 'Loading...');
    renderContent('second', '');

    const location = search.value;

    getWeatherData(location);
});