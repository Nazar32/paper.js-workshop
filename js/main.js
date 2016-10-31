
var rectangle,
    automaticModeEnabled = false,
    manualModeEnabled = false;

(function initRectange() {

    var rect = new Rectangle(new Size(100, 200));
    rect.center = new Point(100, 100);
    rectangle = new Path.Rectangle(rect);
    rectangle.fillColor = '#000';

}) ();

var counter = 0;
var destination = Point.random() * view.size;
var automaticFigureMoving ;

document.getElementById('automaticStart').addEventListener('click', function() {
    automaticFigureMoving = setInterval(moveFigure, 1);
});

function moveFigure() {
    var vector = destination - rectangle.position + 120;

    rectangle.position += vector / 300;
    
    if (vector.length < 100) {
        destination = Point.random() * view.size - 120;
        counter++;
        if (counter === 4) {
            clearInterval(automaticFigureMoving);
            moveRectangleAway();
            return;
        }
    }
};

function moveRectangleAway() {

    var interval = setInterval(function() {
        if(rectangle.position._x < 20000 || rectangle.position._y < 20000) {
            rectangle.position += 0.5;
        }
        else {
            clearInterval(interval);
        }
    }, 1);
    
}

var canvas = document.getElementById('myCanvas');
canvas.addEventListener('click', moveFigureInDirection);

function moveFigureInDirection(direction) {
    var iterationNumber = document.getElementById('iterationsNumber').value;
    var animationSpeed = document.getElementById('animationSpeed').value;
    var manualCheck = document.getElementById('manualCheck');
    
    if (!manualCheck.checked || counter >=  iterationNumber) {
        return;    
    }
   
    direction = new Point(direction.clientX, direction.clientY - 120);
    var vector = direction - rectangle.position;
    var interval = setInterval( function() { 
        rectangle.position += vector / (101 - animationSpeed);
        vector = direction - rectangle.position;

        if (vector.length < 10) {
            clearInterval(interval);
            counter++;

            if (counter == iterationNumber) {
                moveRectangleAway();
                return;
            }
        }
    }, 1);
};
