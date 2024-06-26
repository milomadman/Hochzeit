document.getElementById('dessertForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
  
    // Get form data
    var formData = new FormData(event.target);
    var name = formData.get('Name');
    var dessert = formData.get('Dessert');
    var message = formData.get('Mitteilung');
  
    // Construct the JSON object to be sent to Airtable
    var requestBody = JSON.stringify({
        "fields": {
            "Name": name,
            "Dessert": dessert,
            "Mitteilung": message,
        }
    });
  
    // Send data to Airtable using fetch API
    fetch('https://api.airtable.com/v0/appk6EuVxPyqNVt7E/Desserts', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer pat8tJOGxiyLKuhvt.c716dd3916a6c3335acfbbc3c14dc4a99728f4eabe4879d144b6b212878f5815',
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Thank you for your submission!');
        startAnimation();
        document.getElementById('Name').value = '';
        document.getElementById('Dessert').value = '';
        document.getElementById('Mitteilung').value = '';
        document.getElementById('Dessert').placeholder = '';
        document.getElementById('Mitteilung').placeholder = '';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sorry, there was a problem with your submission. Please try again.');
    });
});


function startAnimation() {
    const container = document.getElementById('animationContainer');
    container.innerHTML = '';  // Clear previous animations

    for (let i = 0; i < 20; i++) {  // Create 20 sunflowers
        const flower = document.createElement('img');
        flower.src = 'sunflower.svg';  // Path to your sunflower SVG
        flower.classList.add('sunflower');
        flower.style.top = `50%`;
        flower.style.left = `50%`;

        container.appendChild(flower);

        // Animation
        setTimeout(() => {
            flower.style.transform = `translate(${(Math.random() - 0.5) * 3000}px, ${(Math.random() - 0.5) * 2000}px) scale(0)`;
            flower.style.opacity = 0;
        }, 0);  // Start animating slightly after adding to the DOM
    }
}