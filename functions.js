function click() {
    console.log("hi");
    alert("You clicked the");
}

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


document.querySelectorAll('.clickable-map a').forEach(function(area) {
  /*area.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      
      // Find the closest ancestor <a> element including the event target itself
      var linkElement = event.target.closest('a');
      
      // If an <a> element is found and it has an xlink:href attribute
      if (linkElement && linkElement.getAttribute('xlink:href')) {
          var link = linkElement.getAttribute('xlink:href');
          window.location.href = link; // Redirect to the specified link
      } else {
          console.error('Link not found');
      }
  });*/
  area.addEventListener('mouseover',function(event){
    var infobox = document.getElementById("info");
    
    infobox.style.opacity = 0.9;
    infobox.style.left = event.clientX + "px";
    infobox.style.top = event.clientY + "px";
    document.getElementById("Piece").innerHTML=event.srcElement.id;

    console.log(event.clientX);

  });
  area.addEventListener('mouseleave', function(event){
    var infobox = document.getElementById("info");
    infobox.style.opacity = 0;
  });
});

document.querySelector('.clickable-map').addEventListener('click', function(event) {
  // Get the SVG element
  var svg = document.querySelector('.clickable-map');

  // Get the viewBox dimensions
  var viewBox = svg.getAttribute('viewBox').split(' ').map(Number);

  // Calculate the coordinates relative to the viewBox
  var x = (event.offsetX / svg.clientWidth) * (viewBox[2] - viewBox[0]) + viewBox[0];
  var y = (event.offsetY / svg.clientHeight) * (viewBox[3] - viewBox[1]) + viewBox[1];

  // Log the coordinates to the console
  console.log('Relative coordinates (x, y):', x, y);
});