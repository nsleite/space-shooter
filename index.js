const player = document.querySelector('.player');
const playArea = document.querySelector('#main-play-area');
const initText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
const enemies = ['type1','type2','type3']

var colided = false;
var lifes = 3;
var score = 0;
var enemyTimeInterval = 1500;

function play(key){
    var KEYS = {
    'ArrowUp': moveUp,
    'ArrowDown': moveDown,
    ' ': shoot,
    'default' : nothing,
    };
    return (KEYS[key]() || KEYS['default'])();
}

function moveUp(){
    position = parseInt(getComputedStyle(player).top);
    if(position <= 30){
        return;
    }
    player.style.top = `${(position - 30)}px`;
}
function moveDown(){
    position = parseInt(getComputedStyle(player).top);
    if(position >= 600){
        return;
    }
    player.style.top = `${(position + 30)}px`;
}

function nothing(){

};

function createShot(){
    let playerPosition = getPosition(player);
    let newShot = document.createElement('div');
    newShot.classList.add('shot');
    newShot.style.left = `${playerPosition.x + 50}px`;
    newShot.style.top = `${playerPosition.y + 17}px`;
    return newShot;
}

function shoot(){
    let shot = createShot();
    playArea.appendChild(shot);
    console.log(shot.style.left, shot.style.top);
    moveShot(shot);
}

function moveShot(shot){
    let moveShotInterval = setInterval(()=>{
        let shotPosition = parseInt(shot.style.left);
        let aliens = document.querySelectorAll('.enemy');

        console.log(aliens);
        aliens.forEach((alien)=>{
            if(checkCollision(shot, alien)){
                alien.classList.remove('enemy');
                alien.classList.add('dead-enemy');
                shot.remove();
                score ++;
                updateScore();
                clearInterval(moveShotInterval);
            };
        })
        // console.log(shotPosition);
        if(shotPosition >= 550){
            shot.remove();
            clearInterval(moveShotInterval);
            // return;   
        } else {
            shot.style.left = `${(shotPosition + 2)}px`;
        }
    }, 3);
}

function createEnemy(){
    let enemy = document.createElement('div');
    let enemyType = enemies[Math.floor(Math.random() * enemies.length)];
    enemy.classList.add('enemy');
    enemy.classList.add(enemyType);
    enemy.style.left = '650px';
    enemy.style.top = `${Math.floor(Math.random()*550) + 50}px`;
    playArea.appendChild(enemy);
    moveEnemy(enemy);
}

function moveEnemy(enemy){
    let moveEnemyInterval = setInterval(()=>{
        let enemyPosition = getPosition(enemy);
        if(enemyPosition.x <= 20){
            if(Array.from(enemy.classList).includes('dead-enemy')){
                enemy.remove();
            } else {
                enemy.remove();
                lifes -= 1;
                updateScore();
                if (lifes===0){
                    gameover();
                }
            }
        } else {
            enemy.style.left = `${enemyPosition.x - 2}px`;
        }
    }, 17);
}

function getPosition(element){
    elementAttributes = window.getComputedStyle(element);
    x = parseInt(elementAttributes.left);
    y = parseInt(elementAttributes.top);
    width = parseInt(elementAttributes.width);
    height = parseInt(elementAttributes.height);
    return {"x":x, "y":y, "width": width, "height": height};
}

function checkCollision(shot, enemy){
    shotCoord = getPosition(shot);
    enemyCoord = getPosition(enemy);
    return  shotCoord.x + shotCoord.width >= enemyCoord.x && 
            shotCoord.x <= enemyCoord.x + enemyCoord.width && 
            shotCoord.y + shotCoord.height >= enemyCoord.y &&
            shotCoord.y <= enemyCoord.y + enemyCoord.height;
}

startButton.addEventListener('click', () => {
    score = 0;
    lifes = 3;
    addScore();
    playGame();
})
function addScore(){
    startButton.style.display = 'none';
    initText.style.display = 'none';
    let scoreText = document.createElement('h4');
    scoreText.classList.add('game-instruction');
    scoreText.setAttribute('id', 'score');
    playArea.appendChild(scoreText);
}

function updateScore(){
    document.getElementById('score').innerHTML = `score: ${score} \t lifes: ${lifes}`;
}
function playGame(){
    window.addEventListener('keydown', function(event){
        play(event.key);
    });
    enemyInterval = setInterval(() => {
        createEnemy();
    }, enemyTimeInterval);
}

function gameover(){
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => enemy.remove());
    let shots = document.querySelectorAll('.shot');
    shots.forEach((shot) => shot.remove());
    setTimeout(() => {
        alert('game over!');
        player.style.top = "250px";
        startButton.style.display = "block";
        initText.style.display = "block";
    });
}