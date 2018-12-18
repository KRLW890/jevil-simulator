var canvas, sprites, fonts;

var party, tpBar;

function loadSprites() {
    sprites = {
        kris: {
            idle: loadImage("images/kris-idle.png"),
            intro: loadImage("images/kris-intro.png"),
            fight: loadImage("images/kris-attack.png"),
            magic: loadImage("images/kris-pirouette.png"),
            act: loadImage("images/kris-act.png"),
            mercy: null, // TODO: Add spritesheet
            item: loadImage("images/kris-item.png"),
            defend: null, // TODO: Add spritesheet
            damage: loadImage("images/kris-damage.png"),
            down: loadImage("images/kris-down.png"),
            menuName: loadImage("images/kris-text.png"),
            icons: [
                loadImage("images/kris-icon0.png"),
                loadImage("images/kris-icon1.png"),
                loadImage("images/kris-icon2.png")
            ]
        },
        susie: {
            idle: loadImage("images/susie-idle.png"),
            intro: null, // TODO: Add spritesheet
            fight: loadImage("images/susie-attack.png"),
            magic: null, // TODO: Add spritesheet
            act: null, // TODO: Add spritesheet
            item: loadImage("images/susie-item.png"),
            mercy: loadImage("images/susie-spare.png"),
            defend: loadImage("images/susie-defend.png"),
            damage: loadImage("images/susie-damage.png"),
            down: loadImage("images/susie-down.png"),
            menuName: loadImage("images/susie-text.png"),
            icons: [
                loadImage("images/susie-icon0.png"),
                loadImage("images/susie-icon1.png"),
                loadImage("images/susie-icon2.png")
            ]
        },
        ralsei: {
            idle: loadImage("images/ralsei-idle.png"),
            intro: loadImage("images/ralsei-intro.png"),
            fight: loadImage("images/ralsei-attack.png"),
            magic: loadImage("images/ralsei-spell.png"),
            act: null, // TODO: Add spritesheet
            item: loadImage("images/ralsei-item.png"),
            mercy: this.magic,
            defend: loadImage("images/ralsei-defend.png"),
            damage: loadImage("images/ralsei-damage.png"),
            down: loadImage("images/ralsei-down.png"),
            menuName: loadImage("images/ralsei-text.png"),
            icons: [
                loadImage("images/ralsei-icon0.png"),
                loadImage("images/ralsei-icon1.png"),
                loadImage("images/ralsei-icon2.png")
            ]
        },
        menu: {
            options: loadImage("images/selections.png"),
            hpBar: loadImage("images/hpbar.png")
        },
        tpBar: loadImage("images/tpBar.png")
    }
}

function loadFonts() {
    fonts = {
        main: loadFont("fonts/8bitoperator_jve.ttf"),
        hp: loadFont("fonts/hpfont.ttf")
    }
}

function initParty() {
    party = [
        new Member("Kris", -16711681, 90, 10, 2, 0, 4, 0, 0,
            new SpriteAnimation(sprites.kris.idle, 6), // idle
            new SpriteAnimation(sprites.kris.intro, 12), // intro
            new SpriteAnimation(sprites.kris.fight, 7), // fight
            new SpriteAnimation(sprites.kris.magic, 6), // magic (it's actually Kris' pirouette)
            new SpriteAnimation(sprites.kris.act, 12), // act
            new SpriteAnimation(sprites.kris.item, 7), // item
            null, // mercy  TODO: add SpriteAnimation
            null, // mercy  TODO: add SpriteAnimation
            sprites.kris.damage, // damage
            sprites.kris.down, // down
            sprites.kris.menuName, // menu name sprite
            sprites.kris.icons // icons
        ),
        new Member("Susie", -65281, 110, 14, 2, 1, 5, 5, 0,
            new SpriteAnimation(sprites.susie.idle, 4) // idle
            // intro
            //new SpriteAnimation("images/susie-attack.png", 6), // fight
            // magic
            // act
            //new SpriteAnimation("images/susie-item.png", 5), // item
            //new SpriteAnimation("images/susie-spare.png", 9), // mercy
            //new SpriteAnimation("images/susie-defend.png", 6) // defend
        ),
        new Member("Ralsei", -16711936, 70, 8, 2, 7, 9, 0, 0,
            new SpriteAnimation(sprites.ralsei.idle, 5), // idle
            new SpriteAnimation(sprites.ralsei.intro, 9), // intro
            new SpriteAnimation(sprites.ralsei.fight, 6), // fight
            new SpriteAnimation(sprites.ralsei.magic, 10) // magic
            // act
            //new SpriteAnimation("images/ralsei-item.png", 8), // item
            //this.magic, // mercy
            //new SpriteAnimation("images/ralsei-defend.png", 8) // defend
        )
    ];
}


function initTPBar() {
    tpBar = {
        percent: 0,
        image: sprites.tpBar,
        display: function () {
            noStroke();
            fill(128, 0, 0);
            rect(42, 46, 19, 187);
            stroke(255);
            strokeWeight(2);
            fill(255, 160, 64);
            rect(40, (1 - (this.percent / 100)) * 189 + 46, 23, 188 - (1 - (this.percent / 100)) * 189);
            noStroke();

            image(this.image, 9, 41);

            if (this.percent < 100) {
                // TODO: Reposition
                text(this.percent + "", 9, 118);
                text("%", 14, 143);
            }
        }
    };
}

function initAll() {
    loadSprites();
    loadFonts();
    initParty();
    initTPBar();
}