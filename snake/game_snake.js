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
    myGameArea.init();	
	gameManager.init();	
	document.addEventListener("keydown", keydownHandler = function (e) {	
				
		switch(e.key)
		{
			case 'w':
			case 'W':
				if(gameManager.direction != 3)
					gameManager.direction = 1;
				break;
			case 's':	
			case 'S':
				if(gameManager.direction != 1)
					gameManager.direction = 3;			
				break;
			case 'd':
			case 'D':
				if(gameManager.direction != 2)
					gameManager.direction = 4;
				break;
			case 'a':
			case 'A':
				if(gameManager.direction != 4)
					gameManager.direction = 2;
				break;
			case 'Shift':		
					myGameArea.limitLoop(updateGame, myGameArea.fps * 3);
				break;
			default: 
			break;
		}
	}, false);
	document.addEventListener("keyup", keydownHandler = function (e) {
		switch(e.key)
		{			
			case 'Shift':		
					myGameArea.limitLoop(updateGame, myGameArea.fps);
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
	requestID: 0,
	fps: 20,
    init : function() {	
        this.canvas.width = (Math.floor(getWidth()/10)-2) * 10;
        this.canvas.height = (Math.floor(getHeight()/10)-2) * 10;		
		//this.canvas.style="border:1px solid #000000;";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); 
		this.limitLoop(updateGame, this.fps);	
    },
	limitLoop: function(fn, fps) {	
		window.cancelAnimationFrame(myGameArea.requestID);		
		var then = new Date().getTime();
		// custom fps, otherwise fallback to 60
		fps = fps || 60;
		var interval = 1000 / fps;	
		(function loop(){
			myGameArea.requestID = requestAnimationFrame(loop);
			var now = new Date().getTime();
			var delta = now - then;
			
			if (delta > interval) {				
				then = now - (delta % interval);	 
				fn();
			}
		}());
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
		this.snake = [[11,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]];
		this.direction = 4;
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
			this.end();
		}		
		if(newHead[0] <= 0 || newHead[0] >= myGameArea.canvas.width || newHead[1] <= 0 || newHead[1] >= myGameArea.canvas.height)
		{	
			this.end();	
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
    },
	end: function()
	{
		audioDie.play();
		this.direction = 0;
		died = true;
		if(window.confirm("Score: " + (this.snake.length - 10)))
		{				
			died = false;		
			startGame();
		}
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
window.cancelAnimationFrame = window.cancelAnimationFrame
                              || window.mozCancelAnimationFrame
                              || function(requestID){clearTimeout(requestID)}
function random(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}
