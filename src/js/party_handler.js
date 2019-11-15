/* eslint-disable no-unused-vars */

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

import { armors, weapons } from "./item_handler.js";

class Member {
	constructor(
		sketch, name, color, partyIndex,
		hp, atk, def, mgc, weapon, armor1, armor2,
		idle, intro, fight, magic, act, item, mercy, defend
	) {
		this.sketch = sketch;

		this.name = name;
		this.color = color;
		this.partyIndex = partyIndex;
		this.default = {
			hp: hp,
			atk: atk,
			def: def,
			mgc: mgc,
			weapon: weapon,
			armor: [armor1, armor2]
		};

		this.current = Object.assign({}, this.default); // the contents need to be converted a string and then converted back so that this.current is a copy, not a pointer
		this.current.maxHp = this.current.hp; // for the pirouette HP scramble
		// TODO: adjust current values based on preferences in localStorage

		this.current.atk += weapons[this.current.weapon].atk;
		this.current.def += weapons[this.current.weapon].def;
		this.current.mgc += weapons[this.current.weapon].mgc;
		for (var i = 0; i < 2; i++) {
			this.current.atk += armors[this.current.armor[i]].atk;
			this.current.def += armors[this.current.armor[i]].def;
			this.current.mgc += armors[this.current.armor[i]].mgc;
		}

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
	}

	drawSprite(x, y) {

	}

	options() {
		if (this.menuSelection.category == 5) {
			this.menuSelection.category = 1;
		}

		if (keys.pressed(keys.left)) {
			if (this.menuSelection.category == 0) {
				this.menuSelection.category = 4;
			} else {
				this.menuSelection.category--;
			}
		} else if (keys.pressed(keys.right)) {
			if (this.menuSelection.category == 4) {
				this.menuSelection.category = 0;
			} else {
				this.menuSelection.category++;
			}
		}

		const { sketch } = this;

		sketch.image(sprites.menu.options, this.partyIndex * 212 + 15, 333, 171, 32, 0, 0, 171, 32); // all 5 options, unselected (magic, not act)

		if (this.partyNumi == 0 && this.menuSelection.category == 1) {
			sketch.image(sprites.menu.options, this.partyIndex * 212 + 50, 333, 31, 32, 175, 32, 31, 32);
		} else if (this.partyIndex == 0) {
			// selected act option
			sketch.image(sprites.menu.options, this.partyIndex * 212 + 50, 333, 31, 32, 175, 0, 31, 32);
		} // unselected act option


		if (this.menuSelection.category != 1 || this.partyIndex != 0) {
			sketch.image(sprites.menu.options, this.partyIndex * 212 + this.menuSelection.category * 35 + 15, 333, 31, 32, this.menuSelection.category * 35, 32, 31, 32);
		} // selected option, other than act

		/*/ I feel like these should probably be moved somewhere else, but I couldn't think of a better place for now
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
        }*/
	}


	drawIcon() {
		const { sketch } = this;

		if (this.current.hp <= 0) {
			sketch.image(this.icons[0], this.partyIndex * 212 + 14, 336 - this.menuHeight);
		} else if (turnPhase > this.partyIndex && this.menuSelection.category != -1) {
			// default icon
			sketch.noStroke();
			sketch.fill(this.color);
			sketch.rect(this.partyIndex * 212 + 18, 335 - this.menuHeight, 22, 24);
			sketch.image(sprites.menu.selected, this.partyIndex * 212 + 18, 335 - this.menuHeight, 22, 24, this.menuSelection.category * 22, 0, 22, 24);
		} else {
			sketch.image(this.icons[0], this.partyIndex * 212 + 14, 336 - this.menuHeight);
		} // default icon

		sketch.image(this.menuName, this.partyIndex * 212 + 51, 339 - this.menuHeight);
	}

	drawHP() {
		const { sketch } = this;

		sketch.image(sprites.menu.hpBar, this.partyIndex * 212 + 110, 334 - this.menuHeight);
		sketch.textFont(fonts.hp);
		sketch.textSize(6);
		sketch.textAlign(sketch.RIGHT);
		if (this.current.hp <= 0) {
			sketch.fill(255, 0, 0);
		} else if (this.current.hp / this.current.maxHp <= 0.25) {
			sketch.fill(255, 255, 0);
		} else {
			sketch.fill(255);
		}
		sketch.text(this.current.hp, (this.partyIndex + 1) * 212 - 52, 344 - this.menuHeight);
		sketch.text(this.current.maxHp, (this.partyIndex + 1) * 212 - 7, 344 - this.menuHeight);
		sketch.textAlign(sketch.LEFT);

		if (this.current.hp > 0) {
			// so that the hp bar doesn't go backwards when the character has negative hp
			sketch.fill(this.color);
			sketch.rect(this.partyIndex * 212 + 128, 347 - this.menuHeight, Math.ceil(76 * (this.current.hp / this.current.maxHp)), 9);
		}
	}

	drawMenu() {
		const { sketch } = this;

		if (turnPhase == this.partyIndex) {
			this.menuHeight += (32 - this.menuHeight) / 2;
			sketch.fill(0);
			sketch.strokeWeight(2);
			sketch.stroke(this.color);
			sketch.rect(this.partyIndex * 212 + 1, 328, 210, 35);
		} else {
			this.menuHeight /= 2;
		}

		sketch.noStroke();
		sketch.fill(51, 32, 51);
		sketch.rect(this.partyIndex * 212, 326, 216, 2);
		sketch.rect(this.partyIndex * 212, 362, 216, 3);
		sketch.fill(0);
		sketch.rect(this.partyIndex * 212, 328 - this.menuHeight, 212, 34);
		if (turnPhase == this.partyIndex) {
			this.options(this.partyIndex);
			sketch.noFill();
			sketch.stroke(this.color);
			sketch.rect(this.partyIndex * 212 + 1, 327 - this.menuHeight, 211, 36);
			sketch.noStroke();
		}

		this.drawIcon();
		this.drawHP();

	}
}

export { Member };
