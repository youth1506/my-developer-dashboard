// 1. Current Time Function
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('current-time').innerHTML = `
        <div>${timeString}</div>
        <div style="font-size: 1.2rem; margin-top: 10px; color: #666;">${dateString}</div>
    `;
}

// Update time immediately and every second
updateTime();
setInterval(updateTime, 1000);

// 2. Weather Function (using a free API)
async function fetchWeather() {
    // We'll use OpenWeatherMap - you'll need a free API key
    const apiKey = '42e1220755aff3700d3ec1b442224c32'; // You'll get this from openweathermap.org
    const city = 'Mumbai'; // Change to your city
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        
        if (data.cod === 200) {
            document.getElementById('weather').innerHTML = `
                <div style="font-size: 2rem; font-weight: bold;">${data.main.temp}°C</div>
                <div>${data.weather[0].description}</div>
                <div>Humidity: ${data.main.humidity}%</div>
                <div>Wind: ${data.wind.speed} m/s</div>
            `;
        } else {
            document.getElementById('weather').innerHTML = 
                'Weather data unavailable<br><small>Get free API key from openweathermap.org</small>';
        }
    } catch (error) {
        document.getElementById('weather').innerHTML = 
            'Failed to fetch weather<br><small>Check console for error</small>';
        console.error('Weather fetch error:', error);
    }
}

// Call weather function
fetchWeather();

// 3. Goals Functionality
function addGoal() {
    const input = document.getElementById('new-goal');
    const goalText = input.value.trim();
    
    if (goalText) {
        const li = document.createElement('li');
        li.textContent = goalText;
        document.getElementById('goals-list').appendChild(li);
        input.value = '';
    }
}

// Add goal on Enter key
document.getElementById('new-goal').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addGoal();
    }
});

// 4. Notes Functionality
function saveNotes() {
    const notes = document.getElementById('notes-text').value;
    localStorage.setItem('dashboard-notes', notes);
    alert('Notes saved locally!');
}

// Load saved notes on page load
window.onload = function() {
    const savedNotes = localStorage.getItem('dashboard-notes');
    if (savedNotes) {
        document.getElementById('notes-text').value = savedNotes;
    }
};