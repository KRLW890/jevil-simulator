var canvas, sprites, fonts;

var party, tpBar, animations;

var keys = {
    all: [],
    up: 38, down: 40, left: 37, right: 39,
    select: 90, cancel: 88,
    pressed: function(code) {
        return keys.all[code];
    }
};
function keyPressed() {
    keys.all[keyCode] = true;
};
function keyReleased() {
    keys.all[keyCode] = false;
};
function handleKeys() {
    for (var i = 0; i < keys.all.length; i++)
        keys.all[i] = false;
};

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
                loadImage("images/kris-icon1.png")
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
                loadImage("images/susie-icon1.png")
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
                loadImage("images/ralsei-icon1.png")
            ]
        },
        menu: {
            hpBar: loadImage("images/hpbar.png"),
            options: loadImage("images/menu.png"),
            selected: loadImage("images/selections.png")
        },
        tpBar: loadImage("images/tpBar.png"),
        tpGraze: loadImage("images/tpgraze.png"),
        soul: loadImage("images/playersoul.png"),
        jevil: {
            misc: loadImage("images/Jevil-misc.png")
        },
        bullets: {
            bombClub: loadImage("images/bullets/bomb-club.png"),
            bombDiamond: loadImage("images/bullets/bomb-diamond.png"),
            bombHeart: loadImage("images/bullets/bomb-heart.png"),
            bombSpade: loadImage("images/bullets/bomb-spade.png"),
            heart: loadImage("images/bullets/bullet-heart.png"),
            spade: loadImage("images/bullets/bullet-ace.png")
        }
    };
};

function loadFonts() {
    fonts = {
        main: loadFont("fonts/8bitoperator_jve.ttf"),
        hp: loadFont("fonts/hpfont.ttf")
    };
};

function initParty() {
    party = [
        new Member("Kris", color(0, 255, 255), 90, 10, 2, 0, 4, 3, 2,
            new SpriteAnimation(sprites.kris.idle, 6), // idle
            new SpriteAnimation(sprites.kris.intro, 12), // intro
            new SpriteAnimation(sprites.kris.fight, 7), // fight
            new SpriteAnimation(sprites.kris.magic, 6), // magic (it's actually Kris' pirouette)
            new SpriteAnimation(sprites.kris.act, 12), // act
            new SpriteAnimation(sprites.kris.item, 7), // item
            null, // mercy   TODO: add SpriteAnimation
            null, // defend  TODO: add SpriteAnimation
        ),
        new Member("Susie", color(255, 0, 255), 110, 14, 2, 1, 5, 5, 2,
            new SpriteAnimation(sprites.susie.idle, 4), // idle
            null, // intro
            new SpriteAnimation("images/susie-attack.png", 6), // fight
            null, // magic
            null, // act
            new SpriteAnimation("images/susie-item.png", 5), // item
            new SpriteAnimation("images/susie-spare.png", 9), // mercy
            new SpriteAnimation("images/susie-defend.png", 6) // defend
        ),
        new Member("Ralsei", color(0, 255, 0), 70, 8, 2, 7, 9, 4, 2,
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
};


function initTPBar() {
    tpBar = {
        percent: 0,
        displayedPercent: 0,
        image: sprites.tpBar,
        display: function () {
            noStroke();
            fill(128, 0, 0);
            rect(42, 46, 19, 187);
            stroke(255);
            strokeWeight(2);
            if (this.percent == this.displayedPercent) {
                fill(255, 160, 64);
                rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
            }
            else if (this.percent > this.displayedPercent) {
                fill(255);
                rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
                fill(255, 160, 64);
                rect(40, (1 - (this.displayedPercent / 100)) * 190 + 45, 23, 189 - (1 - (this.displayedPercent / 100)) * 190);
                this.displayedPercent += (this.percent - this.displayedPercent) / 4;
            }
            else {
                fill(255, 0, 0);
                rect(40, (1 - (this.displayedPercent / 100)) * 190 + 45, 23, 189 - (1 - (this.displayedPercent / 100)) * 190);
                noStroke();
                fill(255, 160, 64);
                rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
                this.displayedPercent += (this.percent - this.displayedPercent) / 4;
            }
            noStroke();

            image(this.image, 9, 41);

            textFont(fonts.main);
            textSize(32);
            if (this.percent < 100) {
                fill(255);
                text(this.percent + "", 9, 135);
                text("%", 14, 160);
            }
            else {
                fill(255, 255, 0);
                text("M", 9, 135);
                text("A", 14, 155);
                text("X", 19, 175);
            }
        }
    };
};

function initAnimations() { // for miscellaneous animations
    animations = {
        playerSoul: new SpriteAnimation(sprites.soul, 2),
        tpGraze: new SpriteAnimation(sprites.tpGraze, 4)
    };
};

function initAll() {
    loadSprites();
    loadFonts();
    initParty();
    initTPBar();
    initAnimations();
};
