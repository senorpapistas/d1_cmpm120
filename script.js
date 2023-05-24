class Logo extends Phaser.Scene {
    constructor() {
        super('Logo');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('logo_img', 'logo2.png');
    }

    create() {
        let logo = this.add.image(-400, 270, 'logo_img');
        logo.setScale(1.7);
        let logo_text = this.add.text(600, 350, '4.doller ', {fontFamily: 'Helvetica', fontSize: '64px'});
        logo_text.setShadow(2, 2, '#ff9900', 0)
        
        let logo_tweens = this.tweens.chain({
            targets: logo,
            tweens: [
                {x: 575, duration: 1000,},
                {angle: -360, duration: 2000,},
                {scale: .2, duration: 0},
                {scale: 1.7, duration: 500},
                {scale: .2, duration: 0},
                {scale: 1.7, duration: 500},
                {scale: .2, duration: 0},
                {scale: 1.7, duration: 500},
                {targets: [logo, logo_text], alpha: 0, duration: 3000}
            ]  
        });
        this.input.once('pointerdown', function ()
        {
            this.scene.start('intro');
        }, this);

    }

    update() {}
}

class intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('trees', 'trees.JPG');
        this.load.image('brick', 'brick.JPG');
        this.load.image('fish', 'fish.JPG');
        this.load.audio('blubub', 'blubub.wav');
    }
    create() {
        let blubub_sound = this.sound.add('blubub');
        blubub_sound.play();
        let trees_img = this.add.image(1500, 555, 'trees');
        trees_img.setScale(1.2);
        let brick_img = this.add.image(2000, 650, 'brick');
        brick_img.setScale(1.1);
        let fish_img = this.add.image(-200, 250, 'fish');
        fish_img.setScale(1.1);
        let fish2_img = this.add.image(1500, 250, 'fish');
        fish2_img.setScale(1.1);
        this.tweens.add({targets: trees_img, x: 200, duration: 4000})
        this.tweens.add({targets: brick_img, x: 900, duration: 4000})
        this.tweens.add({targets: fish_img, angle: -360, duration: 2000})
        fish_img.flipX=true;
        this.tweens.chain({
            tweens: [
                {targets: fish_img, x: 1500, duration: 4000},
                {targets: fish2_img, x: 640, duration: 1000},
                {targets: fish2_img, angle: -720, duration: 1000},
                {targets: fish2_img, alpha: 0, duration: 1000},
                {targets: [trees_img, brick_img], x: -500, duration: 1000}
            ]
        });
        this.input.once('pointerdown', function ()
        {
            this.scene.start('intro2');
        }, this);

    }
    update() {}
}

class intro2 extends Phaser.Scene {
    constructor() {
        super('intro2');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('explosion', 'explosion.png');
        this.load.image('fish', 'fish.JPG');
        this.load.image('fist', 'puncher.png');
        this.load.audio('boing', 'boing.wav');
    }
    create() {
        let boing_sound = this.sound.add('boing');
        boing_sound.play();
        boing_sound.setLoop(true);
        let fish_img = this.add.image(640, 320, 'fish');
        fish_img.setScale(0);
        fish_img.alpha = 0;
        let expl_img = this.add.image(640, 350, 'explosion');
        expl_img.setScale(.8);
        expl_img.alpha = 0;
        let fist_img = this.add.image(200, 1100, 'fist');
        fist_img.setScale(1);
        this.tweens.chain({
            tweens: [
                {targets: fish_img, scale: 1.7, alpha: 1, duration: 1500},
                {targets: fist_img, x: 540, y: 380, angle: 40, duration: 500},
                {targets: expl_img, scale: 1.1, alpha: 1, y: 250, duration: 500},
                {targets: fist_img, x: 200, y: 1100, angle: -40, duration: 1000},
                {targets: [fish_img, expl_img], alpha: 0, duration: 3000}
            ]
        });
        this.input.once('pointerdown', function ()
        {
            boing_sound.setLoop(false);
            this.scene.start('menu');
        }, this);

    }
    update() {}
}

class menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('fish2', 'fish2.JPG');
        this.load.image('fist', 'puncher.png');
    }
    create() {
        let title_text = this.add.text(-500, 70, 'Fish Puncher 2D', {fontFamily: 'Impact', fontSize: '74px', color: '#00ffff'});
        let menu_text = this.add.text(-500, 250, 'New Game', {fontFamily: 'Impact', fontSize: '48px', color: '#ffab40'});
        let menu2_text = this.add.text(-500, 350, 'Continue Game\n\nOptions\n\nQuit', {fontFamily: 'Impact', fontSize: '48px', color: '#ffab40'});
        let fish_img = this.add.image(960, -360, 'fish2');
        fish_img.setScale(1.2);
        let fist_img = this.add.image(1350, 275, 'fist');
        fist_img.setScale(.2);
        fist_img.flipX = true;
        fist_img.angle = -60
        this.tweens.add({targets: fish_img, y: 360, duration: 500})
        this.tweens.chain({
            tweens: [
                {targets: [title_text, menu_text, menu2_text], x: 100, duration: 500},
                {targets: fist_img, x: 380, duration: 500},
                {targets: fist_img, x: 430, duration: 700},
                {targets: fist_img, x: 380, duration: 700},
                {targets: fist_img, x: 430, duration: 700},
                {targets: fist_img, x: 380, duration: 700}
            ]
        })
        menu_text.setInteractive();
        menu_text.once('pointerdown', () => {

            const fx = this.cameras.main.postFX.addWipe(0.3, 0, 1);

            this.scene.transition({
                target: 'gamestart',
                duration: 2000,
                moveBelow: true,
                onUpdate: (progress) => {

                    fx.progress = progress;

                }
            });
        });
    }
    update() {}
}

class gamestart extends Phaser.Scene {
    constructor() {
        super('gamestart');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('bg', 'bg.JPG');
    }
    create() {
        let bg_img = this.add.image(640, 1700, 'bg');
        bg_img.setScale(5);
        let para = this.add.text(400, 800, "It is the year 12000.\nFish have evolved\ninto angry spinning\nflesh spheres of\ndestruction. The only\nway to stop them…\npunching them.\n\nYou must punch them\nif you wish to stay\nalive. Good luck\nsoldier.", {fontFamily:'Verdana', fontSize: '44px', color: '#ffff00'});
        this.tweens.add({targets: para, y: 50, duration: 7000})
        this.tweens.add({targets:bg_img, y: 300, duration: 2700})
    }
    update() {}
}

// using https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
/*let config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    width: window.innerWidth * window.devicePixelRatio,//1280,
    height: window.innerHeight * window.devicePixelRatio,//720,
    backgroundColor: 0x548bb8,
    scene: [Logo, intro, intro2, menu, gamestart]
};*/

var game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
    },

    backgroundColor: 0x548BB8,
    scene: [Logo, intro, intro2, menu, gamestart],
});