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
    idle, intro, fight, magic, act, item, mercy, defend,
    damage, down, menuName, icons) {
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

    this.current = JSON.parse(JSON.stringify(this.default)); // the contents need to be converted a string and then converted back st that this.default is a copy, not a pointer
    // TODO: adjust current values based on preferences in localStorage

    this.menuSelection = {
        hasSelected: false,
        category: 0,
        suboption: 0
    };

    // sprite animations. We have to pass these in manually because the number of frames can be different for each one
    this.idle = idle;
    this.intro = intro; // for the beginning of the battle before the first turn
    this.fight = fight;
    this.magic = magic;
    this.act = act;
    this.item = item;
    this.mercy = mercy;
    this.defend = defend;
    this.damage = damage;
    this.down = down;
    this.menuName = menuName;
    this.icons = icons;
}


Member.prototype.drawMenu = function (i) {
    noStroke();
    fill(51, 32, 51)
    rect(i * 213, 326, 216, 2);
    rect(i * 213, 362, 216, 3);
    fill(0);
    rect(i * 213, 328, 216, 34);

    image(this.icons[0], i * 213 + 14, 336);
    image(this.menuName, i * 213 + 51, 339);

    image(sprites.menu.hpBar, i * 213 + 110, 334);
    textFont(fonts.main);
    textSize(20);
    fill(255);
    //TODO: reposition text and hpBar
    //text(this.current.hp, (this.current.hp / this.default.hp), (i + 1) * 213 - 53);
    //text(this.default.hp, (this.current.hp / this.default.hp), (i + 1) * 213 - 8);
    if (this.current.hp > 0) {
        // so that the hp bar doesn't go backwards when the character has negative hp
        fill(this.color);
        rect(i * 213 + 128, 347, 76 * (this.current.hp / this.default.hp), 9);
    }
}


