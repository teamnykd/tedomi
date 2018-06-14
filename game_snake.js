var audioDie = new Audio('haha.mp3');
var audioHit = new Audio('oh.mp3');
var died = false;

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

function startGame() { 
	//alert(getWidth()+"="+getHeight());
    myGameArea.init();	
	gameManager.init();	
	document.addEventListener("keydown", keydownHandler = function (e) {	
				
		switch(e.key)
		{
			case 'w':
				if(gameManager.direction != 3)
					gameManager.direction = 1;
				break;
			case 's':	
				if(gameManager.direction != 1)
					gameManager.direction = 3;			
				break;
			case 'd':
				if(gameManager.direction != 2)
					gameManager.direction = 4;
				break;
			case 'a':
				if(gameManager.direction != 4)
					gameManager.direction = 2;
				break;
			default: 
			break;
		}
	}, false);
}
function updateGame() {
    //myGameArea.clear(); 
	if(!died)
		gameManager.update();	
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    init : function() {	
        this.canvas.width = (Math.floor(getWidth()/10)-2) * 10;
        this.canvas.height = (Math.floor(getHeight()/10)-2) * 10;		
		//this.canvas.style="border:1px solid #000000;";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);     
		this.interval = setTimeout(this.update, 30);
    },
	update: function(){
		limitLoop(updateGame, 20);
	},
    stop : function() {
        clearInterval(this.interval);
    }, 
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }	
}
var gameManager = {
	snake: [[1,1]],
	target: [101,101],
	direction: 4,
	init : function() {	
		this.snake = [[101,1],[91,1],[81,1],[71,1],[61,1],[51,1],[41,1],[31,1],[21,1],[11,1],[1,1]];
    },
	draw: function(node, color)
	{				
		//this.snake.forEach(function(node) {
			myGameArea.context.draw
			myGameArea.context.beginPath();
			myGameArea.context.rect(node[0], node[1], 8, 8);
			myGameArea.context.fillStyle = color;
			myGameArea.context.fill();
			myGameArea.context.closePath();		
		//});
	},
	clear: function(node)
	{	
			myGameArea.context.draw
			myGameArea.context.beginPath();
			myGameArea.context.rect(node[0], node[1], 8, 8);
			myGameArea.context.fillStyle = "white";
			myGameArea.context.fill();
			myGameArea.context.closePath();		
	},
	update : function() {
		let newHead = [this.snake[0][0],this.snake[0][1]];		
		switch(this.direction)
		{
			case 1:
				newHead[1] -= 10;				
				break;
			case 2:
				newHead[0] -= 10;
				break;
			case 3:
				newHead[1] += 10;
				break;
			case 4:
				newHead[0] += 10;
			break;
			default:				
				break;
		}
		///////////////////test///////////
		let a = JSON.stringify(this.snake);
		let b = JSON.stringify(newHead);
		var c = a.indexOf(b);
		if(c != -1){
			audioDie.play();
			this.direction = 0;
			died = true;
		}		
		if(newHead[0] <= 0 || newHead[0] >= myGameArea.canvas.width || newHead[1] <= 0 || newHead[1] >= myGameArea.canvas.height)
		{	
				audioDie.play();
				this.direction = 0;
				died = true;
		}
		else
		{		
			this.snake.unshift([newHead[0], newHead[1]]);			
			if(this.target[0] != newHead[0] || this.target[1] != newHead[1])
			{	
				this.clear(this.snake.pop());				
			}
			else
			{
				audioHit.play();				
				this.target = [random(3, myGameArea.canvas.width/10 - 3)*10+1, random(3, myGameArea.canvas.height/10 - 3)*10+1];
				//console.log("HIT - new target ("+this.target[0]+":"+this.target[1]+")");
			}				
		}
		this.draw(this.snake[0], "black");
		this.draw(this.snake[1], "red");		
		this.draw(this.target, "blue");
    }
}



window.requestAnimationFrame = function() {
    return window.requestAnimationFrame ||
       	window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(f) {
			window.setTimeout(f,1e3/60);
		}
}();
var limitLoop = function (fn, fps) {
 
    // Use var then = Date.now(); if you
    // don't care about targetting < IE9
    var then = new Date().getTime();

    // custom fps, otherwise fallback to 60
    fps = fps || 60;
    var interval = 1000 / fps;
 
    return (function loop(time){
        requestAnimationFrame(loop);
 
        // again, Date.now() if it's available
        var now = new Date().getTime();
        var delta = now - then;
 
        if (delta > interval) {
            // Update time
            // now - (delta % interval) is an improvement over just 
            // using then = now, which can end up lowering overall fps
            then = now - (delta % interval);
 
            // call the fn
            fn();
        }
    }(0));
};
function random(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}
