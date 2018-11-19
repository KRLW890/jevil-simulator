/*
    TODO:
Lots and lots of sprites and animations.
HTML canvases don't support GIFs, so all animations need to be laid out as spritesheets,
with each frame immediately next to each other horizontally.
I'm unhappy with the sprites I currently have, since many of them are fuzzy between pixels,
but they're still usable if necessary.

fight animations - pause on first frame between selection and attack.
act animations   - 
magic animations - 
item animations  - 
spare animations - no animation until the turn is active
defend animation - full animation immediately upon selection
*/

var Member = function(name, hp, atk, def, mgc, weapon, armor1, armor2, idle, intro, fight, act, item, mercy, defend, damage)
{
    this.name = name;
    this.default = {
        hp: hp,
        atk: atk,
        def: def,
        mgc: mgc,
        weapon: weapon,
        armor: [armor1, armor2]
    };
    this.current = this.default;
    
    // sprite animations
    this.idle = idle;
    this.intro = intro;
    this.fight = fight;
    this.act = act; // this also counts for magic animations for Susie and Ralsei
    this.item = item;
    this.mercy = mercy;
    this.defend = defend;
    this.damage = damage;
};


var party = [
    new Member("Kris", 90, 10, 2, 0,  4, 0, 0,
               new Animation("images/kris-idle.png", 72, 78, 6)
    ),
    new Member("Susie", 110, 14, 2, 1,  5, 5, 0,
               new Animation("images/susie-idle.png", 106, 82, 7)
    ),
    new Member("Ralsei", 70, 8, 2, 7,  9, 0, 0,
               new Animation("images/ralsei-idle.png", 57, 86, 5)
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

