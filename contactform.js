
document.getElementById('giftForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
  
    // Get form data
    var formData = new FormData(event.target);
    var name = formData.get('Name');
    var email = formData.get('Email');
    var gift = formData.get('Geschenk');
    //var betrag = formData.get('Betrag');
  
    // Construct the JSON object to be sent to Airtable
    var requestBody = JSON.stringify({
        "fields": {
            "Name": name,
            "Email": email,
            "Geschenk": gift,
            //"Betrag": betrag 
        }
    });
  
    // Send data to Airtable using fetch API
    fetch('https://api.airtable.com/v0/appk6EuVxPyqNVt7E/Geschenke', {
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
        document.getElementById('giftForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sorry, there was a problem with your submission. Please try again.');
    });
  });

  
document.getElementById('dessertForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
  
    // Get form data
    var formData = new FormData(event.target);
    var name = formData.get('Name');
    var email = formData.get('Email');
    var gift = formData.get('Dessert');
  
    // Construct the JSON object to be sent to Airtable
    var requestBody = JSON.stringify({
        "fields": {
            "Name": name,
            "Email": email,
            "Dessert": dessert,
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
        document.getElementById('giftForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sorry, there was a problem with your submission. Please try again.');
    });
  });