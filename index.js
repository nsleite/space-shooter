const player = document.querySelector('.player');
const playArea = document.querySelector('#main-play-area');



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
    console.log("moving up!");
    
}
function moveDown(){
    console.log("moving Down!");
}
function shoot(){
    console.log("shooting!");
}
function nothing(){

};

document.querySelector('body')
        .addEventListener('keydown', function(event){
            play(event.key);
        })