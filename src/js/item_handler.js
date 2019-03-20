var Item = function (name, desc, limit) {
    this.name = name;
    this.desc = desc;
    this.limit = limit;
    this.remaining = limit;
};

var Consumable = function (name, desc, limit, fullParty, affect) {
    Item.call(this, name, desc, limit);
    this.fullParty = fullParty; // does the item affect the whole party?
    this.affect = affect || function () { };
};

var Equippable = function (name, desc, limit, kris, susie, ralsei, atk, def, mgc, tp) {
    Item.call(this, name, desc, limit);
    this.equipTo = [kris, susie, ralsei];
    this.atk = atk;
    this.def = def;
    this.mgc = mgc;
    this.tp = tp;
};


var consumables = [
    new Consumable("[empty]", "For masochists", Infinity, true, function (member) { }),
    new Consumable("Dark Candy", "Heals 40HP", Infinity, false, function (member) { }),
    new Consumable("ReviveMint", "Heals Downed Ally", 2, false, function (member) { }),
    new Consumable("Glowshard", "Sell at shops", 1, true, function (member) { }),
    new Consumable("Manual", "Read out of battle", 1, true, function (member) { }),// x read the MANUAL! \n But nothing happened...
    new Consumable("BrokenCake", "Heals 20HP", 0, false, function (member) { }),
    new Consumable("Top Cake", "Heals team 160HP", 1, true, function (member) { }),
    new Consumable("SpinCake", "Heals team 80HP", 1, true, function (member) { }),
    new Consumable("Darkburger", "Heals 70HP", Infinity, false, function (member) { }),
    new Consumable("LancerCookie", "Heals 50HP", 1, false, function (member) { }),
    new Consumable("GigaSalad", "Heals 4HP", 0, false, function (member) { }),
    new Consumable("Life Dew", "Heals Downed Ally", 0, false, function (member) { }),
    new Consumable("HeartsDonut", "Healing varies", Infinity, false, function (member) { }), //10k, 90s, 60r
    new Consumable("ChocDiamond", "Healing varies", Infinity, false, function (member) { }), //80k, 30s, 30r
    new Consumable("ClubsSandwich", "Heals team 30HP", 1, true, function (member) { }),
    new Consumable("FavSandwich", "Heals ALL HP", 0, false, function (member) { }), //500hp
    new Consumable("RouxlsRoux", "Heals 50HP", Infinity, false, function (member) { }),
];

var armors = [
    new Equippable("[empty]", "For masochists", Infinity, true, true, true, 0, 0, 0, 0),
    new Equippable("Pink Ribbon", "+TP range", 0, true, false, true, 0, 0, 0, 1),
    new Equippable("Amber Card", "+1 DF", Infinity, true, true, true, 0, 1, 0, 0),
    new Equippable("Dice Brace", "+2 DF", 1, true, true, true, 0, 2, 0, 0),
    new Equippable("White Ribbon", "+2 DF", 1, true, false, true, 0, 2, 0, 0),
    new Equippable("Iron Shackle", "+2 DF, +1 AT", 1, true, true, true, 1, 2, 0, 0),
    new Equippable("Mouse Token", "+1 DF, +2 MG", 0, true, true, true, 0, 1, 2, 0),
    new Equippable("Jevilstail", "+2 all", 0, true, true, true, 2, 2, 2, 0)
];

var weapons = [
    new Equippable("Wood Blade", "+0 AT", 1, true, false, false, 0, 0, 0, 0),
    new Equippable("Mane Ax", "+0 AT", 1, false, true, false, 0, 0, 0, 0),
    new Equippable("Red Scarf", "+0 AT", 1, false, false, true, 0, 0, 0, 0),
    new Equippable("EverybodyWeapon", "+12 AT, +6 DF, +8 MG", 0, true, true, true, 12, 6, 8, 0),
    new Equippable("Spookysword", "+2 AT", Infinity, true, false, false, 2, 0, 0, 0),
    new Equippable("Brave Ax", "+2 AT", Infinity, false, true, false, 2, 0, 0, 0),
    new Equippable("Devilsknife", "+5 AT, +4 MG, -10 TP cost", 0, false, true, false, 5, 0, 4, 0),
    new Equippable("Trefoil", "+4 AT", 0, true, false, false, 4, 0, 0, 0),
    new Equippable("Ragger", "+2 AT", 1, false, false, true, 2, 0, 0, 0),
    new Equippable("Dainty Scarf", "+2 MG", Infinity, false, false, true, 0, 0, 2, 0)
];


var inventory = [4, 6, 8, 8, 8, 8, 8, 8, 8, 14, 2, 2];


