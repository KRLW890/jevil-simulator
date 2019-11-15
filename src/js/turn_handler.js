/* eslint-disable no-unused-vars */

/* This file handles the flow of each turn

turnPhase values (not necessarily final):
0-1: Kris selection
2-3: Susie selection
4-5: Ralsei selection
6: Kris action
7: Susie action
8: Ralsei action
9: player's attack
10: Jevil's line (and attack setup)
12: Jevil's attack
13: turn reset (single frame)
*/

import { attacks, attackData, executeAttack } from "./attack_handler.js";

var processTurn = function(game) {
	const { sketch } = game;

	sketch.text(turnPhase, 610, 25); // for debugging purposes

	switch (turnPhase) {
	case 2:
	case 4:
		if (keys.pressed(keys.cancel)) {
			if (party[Math.floor((turnPhase-2)/2)].current.hp > 0) {
				turnPhase -= 2;
			} else if (party[0].current.hp > 0) {
				turnPhase -= 4;
			}
		}
		//fallthrough
	case 0:
		if (keys.pressed(keys.select)) {
			turnPhase++;
			while (turnPhase < 6 && party[Math.floor(turnPhase/2)].current.hp <= 0) {
				turnPhase += 2;
			}
		}
		break;

	case 1:
	case 3:
	case 5:
		do { // temporary
			turnPhase++;
		} while (turnPhase < 6 && party[Math.floor(turnPhase/2)].current.hp <= 0);

		if (keys.pressed(keys.select)) {
			do {
				turnPhase++;
			} while (turnPhase < 6 && party[Math.floor(turnPhase/2)].current.hp <= 0);
		} else if (keys.pressed(keys.cancel)) {
			turnPhase--;
		}
		break;

		// skipping some cases here for now; I want to start adding Jevil's attacks ASAP
	case 6:
	case 7:
	case 8:
	case 9:
		turnPhase++;
		break;

	case 10:
		game.textBox.clear();

		attacks[attackData.id].prepareAttack();
		turnPhase++;
		break;

	case 11:
		executeAttack(sketch);
		break;

	case 12:
		attackData.bullets = [];
		attackData.iFrames = 0;
		for (var i = 2; i >= 0; i--) {
			party[i].menuSelection = { category: 0, suboption: 0 };
			if (party[i].current.hp <= 0) {
				party[i].current.hp += Math.floor(party[i].current.maxHp/7.5);
			}
			if (party[i].current.hp > 0) {
				turnPhase = i*2;
			}
		}
		if (turnPhase == 12) {
			turnPhase = 6;
		}
		break;
	}
};

export { processTurn };
