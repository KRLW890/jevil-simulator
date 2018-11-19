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

var menu = {
    options: new Image()
};

var Member = function(name, color, hp, atk, def, mgc, weapon, armor1, armor2, idle, intro, fight, magic, act, item, mercy, defend, damage)
{
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
    this.current = this.default;
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
    
    // these don't have frames, so they can be retrieved automatically
    this.down = new Image();
    //this.down.src = "images/" + name.toLowerCase() + "-down.png";
    this.icon = new Image();
    this.icon.src = "images/" + name.toLowerCase() + "-icon.png";
};

Member.prototype.drawMenu = function(processing, i)
{
    processing.noStroke();
    processing.fill(51, 32, 51)
    processing.rect(i*216, 326, 216, 2);
    processing.rect(i*216, 362, 216, 3);
    processing.fill(0);
    processing.rect(i*216, 328, 216, 34);
    
    ctx.drawImage(this.icon, i*216+14, 336);
    
    processing.fill(128, 0, 0);
    processing.rect(i*216+128, 347, 76, 9);
    processing.fill(this.color);
    processing.rect(i*216+128, 347, 76*(this.current.hp/this.default.hp), 9);
};

var party = [
    new Member("Kris", -16711681, 90, 10, 2, 0,  4, 0, 0,
               new Animation("images/kris-idle.png", 72, 78, 6) // idle
               // intro
               // fight
               // magic (the pirouette animation for kris)
               // act
               // item
               // mercy
               // defend
               // damage
    ),
    new Member("Susie", -65281, 110, 14, 2, 1,  5, 5, 0,
               new Animation("images/susie-idle.png", 106, 82, 7) // idle
               // intro
               // fight
               // magic
               // act
               // item
               // mercy
               // defend
               // damage
    ),
    new Member("Ralsei", -16711936, 70, 8, 2, 7,  9, 0, 0,
               new Animation("images/ralsei-idle.png", 57, 86, 5) // idle
               // intro
               // fight
               // magic (kris' can just be an empty placeholder)
               // act
               // item
               // mercy
               // defend
               // damage
    )
];



var tp = {
    percent: 0,
    image: new Image(),
    draw: function(processing)
    {
        processing.noStroke();
        processing.fill(128, 0, 0);
        processing.rect(42, 46, 19, 187);
        processing.stroke(255);
        processing.strokeWeight(2);
        processing.fill(255, 160, 64);
        processing.rect(40, (1-(this.percent/100))*189+46, 23, 188-(1-(this.percent/100))*189);
        
        ctx.drawImage(this.image, 9, 41);
        if (this.percent < 100)
        {
            defaultFont.drawText(this.percent+"", 9, 118);
            defaultFont.drawText("%", 14, 143);
        }
    }
};
tp.image.src = "images/tp.png";

