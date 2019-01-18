/*
    TODO:
Lots and lots of sprites and animations.
HTML canvases don't support GIFs, so all animations need to be laid out as spritesheets,
with each frame immediately next to each other horizontally.
I'm unhappy with the sprites I currently have, since many of them are fuzzy between pixels,
but they're still usable if necessary.

fight animations - pause on first frame between selection and attack.
magic animations - there's an animation loop between the selection and when they use the spell, then the spell itself is another animation
act animations   - ^ ditto. susie and ralsei have acting animations for hypnosis
item animations  - susie has a two-frame animation between selection and the turn, the others do not
spare animations - no animation until the turn is active. kris uses act animation, ralsei uses magic animation, susie is unique
defend animation - full animation immediately upon selection
*/

var Member = function (name, color,
    hp, atk, def, mgc, weapon, armor1, armor2,
    idle, intro, fight, magic, act, item, mercy, defend) {
    this.name = name;
    this.color = color;
    this.default = {
        hp: hp,
        atk: atk,
        def: def,
        mgc: mgc,
        weapon: weapon,
        armor: [armor1, armor2]
    };

    this.current = JSON.parse(JSON.stringify(this.default)); // the contents need to be converted a string and then converted back so that this.current is a copy, not a pointer
    // TODO: adjust current values based on preferences in localStorage

    this.menuSelection = {
        category: 0,
        suboption: 0
    };
    this.menuHeight = 0; // so that the menu slides up for the turn selection

    // sprite animations. We have to pass these in manually because the number of frames can be different for each one
    this.idle = idle;
    this.intro = intro; // for the beginning of the battle before the first turn
    this.fight = fight;
    this.magic = magic;
    this.act = act;
    this.item = item;
    this.mercy = mercy;
    this.defend = defend;
    
    // these can be retrieved automatically
    this.damage = sprites[this.name.toLowerCase()].damage;
    this.down = sprites[this.name.toLowerCase()].down;
    this.menuName = sprites[this.name.toLowerCase()].menuName;
    this.icons = sprites[this.name.toLowerCase()].icons;
};


Member.prototype.options = function(i) {
    if (this.menuSelection.category == 5)
        this.menuSelection.category = 1;
    
    if (keys.pressed(keys.left)) {
        if (this.menuSelection.category == 0)
            this.menuSelection.category = 4;
        else
            this.menuSelection.category--;
    }
    else if (keys.pressed(keys.right)) {
        if (this.menuSelection.category == 4)
            this.menuSelection.category = 0;
        else
            this.menuSelection.category++;
    }
    
    image(sprites.menu.options, i * 213 + 15, 333, 171, 32, 0, 0, 171, 32); // all 5 options, unselected (magic, not act)
    
    if (i == 0 && this.menuSelection.category == 1)
        image(sprites.menu.options, i * 213 + 50, 333, 31, 32, 175, 32, 31, 32); // selected act option
    else if (i == 0)
        image(sprites.menu.options, i * 213 + 50, 333, 31, 32, 175, 0, 31, 32); // unselected act option
    
    
    if (this.menuSelection.category != 1 || i != 0)
        image(sprites.menu.options, i * 213 + this.menuSelection.category*35 + 15, 333, 31, 32, this.menuSelection.category*35, 32, 31, 32); // selected option, other than act
    
    // I feel like these should probably be moved somewhere else, but I couldn't think of a better place for now
    if (keys.pressed(keys.select)) {
        turnPhase++;
        if (i == 0 && this.menuSelection.category == 1)
            this.menuSelection.category = 5;
        keys.all[keys.select] = false;
    }
    else if (keys.pressed(keys.cancel)) {
        if (turnPhase > 0)
            turnPhase--;
        keys.all[keys.cancel] = false;
    }
};

Member.prototype.drawIcon = function(i) {
    if (this.current.hp <= 0)
        image(this.icons[2], i * 213 + 14, 336-this.menuHeight); // down icon
    else if (turnPhase > i && this.menuSelection.category != -1) {
        noStroke();
        fill(this.color);
        rect(i * 213 + 14, 336-this.menuHeight, 22, 24);
        image(sprites.menu.selected, i * 213 + 14, 336-this.menuHeight, 22, 24, this.menuSelection.category*22, 0, 22, 24);
    }
    else
        image(this.icons[0], i * 213 + 14, 336-this.menuHeight); // default icon
    
    image(this.menuName, i * 213 + 51, 339-this.menuHeight);
};

Member.prototype.drawHP = function(i) {
    image(sprites.menu.hpBar, i * 213 + 110, 334-this.menuHeight);
    textFont(fonts.hp);
    textSize(6);
    textAlign(RIGHT);
    if (this.current.hp <= 0)
        fill(255, 0, 0);
    else if (this.current.hp/this.default.hp <= 0.25)
        fill(255, 255, 0);
    else
        fill(255);
    text(this.current.hp, (i + 1) * 213 - 53, 344-this.menuHeight);
    text(this.default.hp, (i + 1) * 213 - 8, 344-this.menuHeight);
    textAlign(LEFT);
    
    if (this.current.hp > 0) {
        // so that the hp bar doesn't go backwards when the character has negative hp
        fill(this.color);
        rect(i * 213 + 128, 347-this.menuHeight, Math.ceil(76 * (this.current.hp / this.default.hp)), 9);
    }
};

Member.prototype.drawMenu = function(i) {
    if (turnPhase == i) {
        this.menuHeight += (33-this.menuHeight)/2;
        fill(0);
        strokeWeight(2);
        stroke(this.color);
        rect(i * 214, 328, 214, 35);
    }
    else
        this.menuHeight /= 2;
    
    noStroke();
    fill(51, 32, 51);
    rect(i * 214, 326, 216, 2);
    rect(i * 213, 362, 216, 3);
    fill(0);
    if (turnPhase == i) {
        this.options(i);
        stroke(this.color);
    }
    rect(i * 214, 328-this.menuHeight, 214, 34);
    noStroke();
    
    this.drawIcon(i);
    this.drawHP(i);
    
};


