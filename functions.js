var modal = document.getElementById("modal");
var btn = document.getElementById("question");
var span = document.getElementsByClassName("close")[0];

modal.style.display = "block";

function showinfo() {
    modal.style.display = "block";
}


btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const svgContainer = document.querySelector('.clickable-map');

svgContainer.addEventListener('mouseover', function(event) {
  let infobox = document.getElementById("info");

  if (event.target.closest('a') && event.target.classList.contains('Bikepart')) {
    
    infobox.style.opacity = 0.9;
    infobox.style.left = event.clientX + 50 + "px";
    infobox.style.top = event.clientY + "px";
    
    document.getElementById("Piece").innerHTML = event.target.id;
    document.getElementById("cost").innerHTML = "Kosten: "+ event.target.getAttribute("cost") + "CHF";
    document.getElementById("Text").innerHTML = event.target.getAttribute("notes");

  }
  else {
    infobox.style.opacity = 0;
  }
});


var polygon = ""

document.querySelector('.clickable-map').addEventListener('click', function(event) {
  // Get the SVG element
  var svg = document.querySelector('.clickable-map');

  // Get the viewBox dimensions
  var viewBox = svg.getAttribute('viewBox').split(' ').map(Number);

  // Calculate the coordinates relative to the viewBox
  var x = Math.round(10*(event.offsetX / svg.clientWidth) * (viewBox[2] - viewBox[0]) + viewBox[0])/10;
  var y = Math.round(10*(event.offsetY / svg.clientHeight) * (viewBox[3] - viewBox[1]) + viewBox[1])/10;

  // Log the coordinates to the console
  polygon += x + "," + y + " ";

});

document.querySelector('.clickable-map').addEventListener('dblclick', function(event){
  polygon += "'>";
  console.log(polygon);
  polygon = "<polygon class='Bikepart' id='' points='";
});



async function loadBikeParts() {
  const response = await fetch('bikeparts.json');
  const data = await response.json();

  const svgNamespace = "http://www.w3.org/2000/svg";
  const xlinkNamespace = "http://www.w3.org/1999/xlink";

  data.bikeParts.forEach(part => {
    const link = document.createElementNS(svgNamespace, 'a');

    if (part.id == "Dessert"){
      link.setAttributeNS(xlinkNamespace, 'xlink:href', 'DessertGift.html');
    } else {
      link.setAttributeNS(xlinkNamespace, 'xlink:href', 'contactform.html');
    }

    
    const shape = document.createElementNS(svgNamespace, part.type);
    
    for (const [key, value] of Object.entries(part.attributes)) {
      shape.setAttribute(key, value);
    }
    shape.setAttribute('class', 'Bikepart');
    shape.setAttribute('id', part.id);
    shape.setAttribute('cost', part.cost);
    shape.setAttribute('notes', part.text)



    link.appendChild(shape);
    document.getElementById('bikeparts').appendChild(link);
  });
}

loadBikeParts();



