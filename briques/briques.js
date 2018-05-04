var canvas = document.getElementById("myCanvas");

// Variable pour stocker le contenu du rendu 2d 
var ctx = canvas.getContext("2d");

//  BALLE 
var x = canvas.width / 2;
var y = canvas.height - 30; //=> Point de départ
var dx = 2;
var dy = -2; // => Échelle de déplacement : 2px
var ballRadius = 10; //Rayon

// PALETTE
var paddleHeight = 10;
var paddleWidth = 95; //=> Mesures 
var paddleX = (canvas.width - paddleWidth) / 2; // => Position de départ
var rightPressed = false;
var leftPressed = false; // => Stocker les informations des boutons préssés
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false); // => Écouter si les boutons sont préssés
document.addEventListener("mousemove", mouseMoveHandler, false); // => Ecouter si la sourie bouge


// BRIQUES 
var brickRowCount = 10;
var brickColumnCount = 9;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}  // => Tableau à deux dimensions qui contient les coordonnées des briques et le status (touchée ou pas)

// SCORE ET VIES
var score = 0;
var lives = 10;

// CONTROLER LA  BALLE
//=> Avec les flèches
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
// => Avec la souris
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
} //=> Si une touche est appuyée on initie sa var à true

// REBONDIR CONTRE LES BRIQUES
function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) { // => Si la brique a un status de 1 
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) { // => Comparer chaquex et y de la balle et des briques,
                    dy = -dy;  // =>  Si la balle est dedans renvoyer...
                    b.status = 0;  // => ... effacer la case ...
                    score++; // => ... et ajouter un point
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }  // => Si le jeu est finis afficher Alert et reload la partie
                }
            }
        }
    }
}

// AFFICHER SCORE ET VIES
function drawScore() {
    ctx.font = "26px Alegreya Sans SC";
    ctx.fillStyle = "#F63D15";
    ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
    ctx.font = "26px Alegreya Sans SC";
    ctx.fillStyle = "#F63D15";
    ctx.fillText("Lives: " + lives, canvas.width - 95, 20);
}

// DESSINER BALLE
function drawBall() {
    ctx.beginPath(); // Imprimer (un cercle)
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); // Contours : x et y, rayon, angle de fin
    ctx.fillStyle = "#F63D15"; //Remplissage 
    ctx.fill();
    ctx.closePath();
}

// DESSINER PALETTE
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#F63D15";
    ctx.fill();
    ctx.closePath();
}

// DESSINER BRIQUES 
var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop; // => Placer les briques en fonction de la colone et ligne dans laqueelle on se trouve
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#F63D15';  
                // (Math.random() * 0xFFFFFF << 0).toString(16)
                // ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            } // => Si le status de la brique est à 1 la dessiner 
        }
    }
}

// BOUGER BALLE 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Effacer la balle faite précédement dans le rectangle de jeu
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    // FAIRE REBONDIR SUR LES MURS 
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }  // => distance centre de la balle - bord = taille du rayon => changer le mouvement de direction

    if (y + dy < ballRadius) {
        dy = -dy;
    } // => distance centre de la balle - bord = taille du rayon => changer le mouvement de direction
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } //=> Si la balle touche la palette elle rebondis
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        } //Si la balle  touche le sol le jeu est over
    }

    // DIRIGER LA PALETTE
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy; // => Bouger la  position de la balle 
    requestAnimationFrame(draw);//=> La fonction se rappelle à chaque nouvelle forme
}
draw();
