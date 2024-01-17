const player = document.querySelector('.player');
const playArea = document.querySelector('#main-play-area');
const shotURL = 'https://cdn-icons-png.flaticon.com/512/9644/9644961.png?ga=GA1.1.1699188909.1702300763&'
const enemies = ['https://cdn-icons-png.freepik.com/512/784/784925.png?ga=GA1.1.1699188909.1702300763&'
                ,'https://cdn-icons-png.freepik.com/512/784/784923.png?ga=GA1.1.1699188909.1702300763&'
                ,'https://cdn-icons-png.freepik.com/512/784/784922.png?ga=GA1.1.1699188909.1702300763&']
const explosion = 'https://cdn-icons-png.freepik.com/512/616/616500.png?ga=GA1.1.1699188909.1702300763&';

function play(key){
    var KEYS = {
    'ArrowUp': moveUp,
    'ArrowDown': moveDown,
    ' ': shoot,
    'default' : nothing,
    };
    // console.log("entered here");
    // console.log(key);
    return (KEYS[key]() || KEYS['default'])();
}

function moveUp(){
    // console.log("moving up!");
    position = parseInt(getComputedStyle(player).top);
    if(position <= 30){
        return;
    }
    // console.log(position);
    player.style.top = `${(position - 30)}px`;
}
function moveDown(){
    // console.log("moving up!");
    position = parseInt(getComputedStyle(player).top);
    if(position >= 600){
        return;
    }
    // console.log(position);
    player.style.top = `${(position + 30)}px`;
}

function nothing(){

};

document.querySelector('body')
        .addEventListener('keydown', function(event){
            play(event.key);
        });

function createShot(){
    let playerPositionX = parseInt(window.getComputedStyle(player)
                                        .getPropertyValue('left'));
    let playerPositionY = parseInt(window.getComputedStyle(player)
                                        .getPropertyValue('top'));
    // console.log(playerPositionX, playerPositionY)
    let newShot = document.createElement('img');
    newShot.classList.add('shot');
    newShot.src = shotURL;
    newShot.style.left = `${(playerPositionX - 30)}px`;
    newShot.style.top = `${(playerPositionY - 20)}px`;
    return newShot;
}

function shoot(){
    let shot = createShot();
    playArea.appendChild(shot);
    moveShot(shot);
}

function moveShot(shot){
    let moveShotInterval = setInterval(()=>{
        let shotPosition = parseInt(shot.style.left);
        let aliens = document.querySelectorAll('.enemy');
        console.log(aliens);
        aliens.forEach((alien)=>{
            if(checkCollision(shot, alien)){
                alien.src = explosion;
                alien.classList.remove('alien');
                alien.classList.add('dead-enemy');
            };
        })
        // console.log(shotPosition);
        if(shotPosition >= 550){
            clearInterval(moveShotInterval);
            shot.remove();
            
        } else {
            shot.style.left = `${(shotPosition + 10)}px`;
        }
    }, 20);
}

function createEnemy(){
    let enemy = document.createElement('img');
    let enemyType = enemies[Math.floor(Math.random() * enemies.length)];
    enemy.src = enemyType;
    enemy.classList.add('enemy');
    enemy.style.left = '650px';
    enemy.style.top = `${(Math.floor(Math.random() * 600) + 100)}px`;
    playArea.appendChild(enemy);
    moveEnemy(enemy);
}

function moveEnemy(enemy){
    let moveEnemyInterval = setInterval(()=>{
        let enemyPosition = parseInt(window.getComputedStyle(enemy)
                                        .getPropertyValue('left'));
        if(enemyPosition <= 50){
            if(Array.from(enemy.classList).includes('dead-enemy')){
                enemy.remove();
            } else {
                // gameover();\
                enemy.remove();
            }
        } else {
            enemy.style.left = `${enemyPosition - 3}px`;
        }
    }, 30)
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

function playGame(){

}

function gameover(){

}