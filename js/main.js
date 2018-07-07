let gameScene = new Phaser.Scene('Game');
let config = {
	type: Phaser.CANVAS,
	width: 800,
	height: 600,
	scene: gameScene,
	title: "Tutorial",
	physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
	pixelArt: false
};

let game = new Phaser.Game(config);
gameScene.init = function(){

};
gameScene.preload = function(){
	this.load.image('background','tedomi/assets/images/disgusting.jpg');
	this.load.image('test','tedomi/assets/images/Ogre.png');
};
gameScene.create = function(){
	this.background = this.add.image(0, 0,'background');
	this.background.setOrigin(0,0);
	this.background.displayWidth=game.config.width;
	this.background.displayHeight=game.config.height;
	var particles = this.add.particles('test');



    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },        
        blendMode: 'REMOVE'
    });
    var logo = this.physics.add.image(0, 0, 'test');
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
    emitter.startFollow(logo);
};


