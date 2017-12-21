
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('player', 'assets/steeve.png', 16, 16);

}

var cursors;
var player;
var left;
var right;

function create() {

    game.stage.backgroundColor = '#000000';
    game.world.setBounds(-1000, -1000, 2000, 2000);

    player = game.add.sprite(game.camera.x + (game.width/2), game.camera.y + (game.height/2), 'player', 1);
    player.smoothed = false;
    player.scale.set(4);
    player.fixedToCamera = true;

    var t = game.add.text(0,0, "this text is fixed to the camera", { font: "32px Arial", fill: "#ffffff", align: "center" });
    game.add.text(0, 0, "this text scrolls\nwith the background", { font: "32px Arial", fill: "#f26c4f", align: "center" });
    t.fixedToCamera = true;
    t.cameraOffset.setTo(200, 500);

    left = player.animations.add('left', [12,13,14,15], 10, true);
    right = player.animations.add('right', [8,9,10,11], 10, true);
    player.animations.add('up', [4,5,6,7], 10, true);
    player.animations.add('down', [0,1,2,3], 10, true);

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

}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);

}
