let game;
let gameOptions = {

    // hero horizontal speed, in pixels per second
    heroSpeed: 150
}

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x444444,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 640,
            height: 480
        },
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 0
                }
            }
        },
       scene: playGame
    }
    game = new Phaser.Game(gameConfig);
}
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    preload(){
        this.load.tilemapTiledJSON("level", "level.json");
        this.load.image("tile", "tile.png");
        this.load.image("hero", "hero.png");
    }
    create(){
        this.map = this.make.tilemap({
            key: "level"
        });

        let tile = this.map.addTilesetImage("tileset01", "tile");

        this.layer = this.map.createStaticLayer("layer01", tile);

        this.layer.setCollision(1);

        this.hero = this.physics.add.sprite(260, 376, "hero");

        this.hero.setBounce(1);

        this.hero.setVelocity(gameOptions.heroSpeed * Math.cos(Math.PI / 4), gameOptions.heroSpeed * Math.sin(Math.PI / 4));

        this.input.on("pointerdown", this.changeDirection, this);

        this.cameras.main.setBounds(0, 0, 1920, 1440);

        this.cameras.main.startFollow(this.hero);
    }

    changeDirection(){

        this.hero.body.velocity.y *= -1;
    }

    update(){

        this.physics.world.collide(this.hero, this.layer);

        this.hero.flipX = this.hero.body.velocity.x < 0;
    }
}
