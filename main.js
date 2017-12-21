
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('player', 'assets/steeve.png', 16, 16);
    game.load.image('bullet', 'assets/purple_ball.png');
    game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('dungeon', 'assets/dungeon_sheet.png');

}

var cursors;
var player;
var left;
var right;

var fireRate = 100;
var nextFire = 0;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = this.game.add.tilemap('map');
    map.addTilesetImage('Dungeon', 'dungeon');

    layer = map.createLayer('Map');
    layer.resizeWorld();
    layer.wrap = true;
    layer.setScale(2);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    player = game.add.sprite(100,100, 'player', 1);
    player.smoothed = false;
    //player.fixedToCamera = true;
    player.scale.setTo(2);

    //var t = game.add.text(0,0, "this text is fixed to the camera", { font: "32px Arial", fill: "#ffffff", align: "center" });
    //game.add.text(0, 0, "this text scrolls\nwith the background", { font: "32px Arial", fill: "#f26c4f", align: "center" });
    //t.fixedToCamera = true;
    //game.camera.scale.x = 1.5;
    //game.camera.scale.y = 1.5;

    left = player.animations.add('left', [12,13,14,15], 10, true);
    right = player.animations.add('right', [8,9,10,11], 10, true);
    player.animations.add('up', [4,5,6,7], 10, true);
    player.animations.add('down', [0,1,2,3], 10, true);

    player.anchor.set(0.5);
    game.camera.follow(player);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    player.body.velocity.set(0);

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
        player.body.velocity.x = -100;
        player.play('left');
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
        player.body.velocity.x = 100;
        player.play('right');
    }
    else if (cursors.up.isDown)
    {
        game.camera.y -= 4;
        player.body.velocity.y = -100;
        player.play('up');
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
        player.body.velocity.y = 100;
        player.play('down');
    }
    else
    {
        player.animations.stop();
    }

    if (game.input.activePointer.isDown)
    {
        fire();
    }

}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(player.x + 20, player.y + 30);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);

}
