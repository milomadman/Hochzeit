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

    var picHeight = (window.innerWidth*245)/400;
    if (event.clientX > 0.7*window.innerWidth){
      infobox.style.top = event.clientY - 0.33*picHeight + "px";
      infobox.style.left = event.clientX - 0.12*window.innerWidth + "px";
    } else if (event.clientY > 0.7*picHeight){
      infobox.style.top = event.clientY - 0.13*picHeight + "px";
      infobox.style.left = event.clientX + 50 + "px";
    } else {
      infobox.style.top = event.clientY + "px";
      infobox.style.left = event.clientX + 50 + "px";
    }
    

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
  console.log(polygon);
  polygon = "";
});


async function loadBikeParts() {
  try {
    const response = await fetch('bikeparts.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const svgNamespace = "http://www.w3.org/2000/svg";
    const xlinkNamespace = "http://www.w3.org/1999/xlink";
    const bikePartsContainer = document.getElementById('bikeparts');

    if (!bikePartsContainer) {
      console.error('The element #bikeparts does not exist!');
      return;
    }

    data.bikeParts.forEach(part => {
      const link = document.createElementNS(svgNamespace, 'a');

      link.setAttributeNS(xlinkNamespace, 'xlink:href', part.id === "Dessert" ? 'DessertGift.html' : 'contactform.html');


      const group = document.createElementNS(svgNamespace, 'g');
      group.setAttribute('data-id', part.id); // Use custom data attribute for more flexibility
      group.setAttribute('class', 'BikepartGroup');


      if (part.type === "ellipse" || part.type === "polygon") {
        const elementsToCreate = part.type === "polygon" ? part.polygons : [part];
        elementsToCreate.forEach(elementData => {
          const shape = document.createElementNS(svgNamespace, part.type);
          if (part.type === "polygon") {
            shape.setAttribute("points", elementData.points);
          }
          if (elementData.attributes) {
            for (const [key, value] of Object.entries(elementData.attributes)) {
              shape.setAttribute(key, value);
            }
          }
          shape.setAttribute('class', 'Bikepart');
          shape.setAttribute('id', part.id);
          shape.setAttribute('cost', part.cost);
          shape.setAttribute('notes', part.text);

          group.appendChild(shape);

          shape.addEventListener('mouseover', function(event) {
            shape.style.cursor = 'pointer';
            shape.style.fill = 'rgba(92, 206, 219, 0.3)';
            shape.style.stroke = 'white';
            shape.style.strokeWidth = '0.2px';
          });

          shape.addEventListener('mouseout', function(event) {
            shape.style.cursor = 'default';
            shape.style.fill = ''; // Reset fill to default
            shape.style.stroke = ''; // Reset stroke to default
            shape.style.strokeWidth = ''; // Reset stroke width to default
          });
                    

        });
      }
      link.appendChild(group);
      bikePartsContainer.appendChild(link);
    });

  } catch (error) {
    console.error('Failed to load bike parts:', error);
  }

  document.querySelectorAll('.BikepartGroup').forEach(group => {
    group.addEventListener('mouseover', () => {
      group.childNodes.forEach(node => {
        node.style.fill = 'rgba(92, 206, 219, 0.3)';
        node.style.stroke = 'white';
        node.style.strokeWidth = '0.2px';
      });
    });

    group.addEventListener('mouseout', () => {
      group.childNodes.forEach(node => {
        node.style.fill = ''; // Reset fill
        node.style.stroke = ''; // Reset stroke
        node.style.strokeWidth = ''; // Reset stroke width
      });
    });
  });
}

loadBikeParts();

/*,*/