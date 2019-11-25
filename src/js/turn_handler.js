/* This file handles the flow of each turn

turnPhase values (not necessarily final):
0: Kris selection
1: Susie selection
2: Ralsei selection
TODO: shift other turnPhase numbers to adjust for removal of turnPhases 3-5
6: Kris action
7: Susie action
8: Ralsei action
9: player's attack
10: Jevil's line (and attack setup)
12: Jevil's attack
13: turn reset (single frame)
*/

import { attacks, attackData, executeAttack } from "./attack_handler.js";

const processTurn = function(game) {
	const { sketch, party } = game;

	sketch.text(game.turnPhase, 610, 25); // for debugging purposes

	switch (game.turnPhase) {
	case 1:
	case 2:
		if (keys.pressed(keys.cancel)) {
			if (party[game.turnPhase].current.hp > 0) {
				game.turnPhase -= 2;
			} else if (party[0].current.hp > 0) {
				game.turnPhase -= 4;
			}
		}
		//fallthrough
	case 0:
		if (game.turnPhase <= 2 && party[game.turnPhase].current.hp <= 0) {
			game.turnPhase++;
		}

		if (keys.pressed(keys.select)) {
			game.turnPhase++;
		}
		break;
	// skipping some cases here for now; I want to start adding Jevil's attacks ASAP
	case 10:
		game.textBox.clear();

		attacks[attackData.id].prepareAttack();
		game.turnPhase++;
		break;

	case 11:
		executeAttack(game);
		break;

	case 12:
		attackData.bullets = [];
		attackData.iFrames = 0;
		for (let i = 2; i >= 0; i--) {
			party[i].menuSelection = { category: 0, suboption: 0 };
			if (party[i].current.hp <= 0) {
				party[i].current.hp += Math.floor(party[i].current.maxHp / 7.5);
			}
			if (party[i].current.hp > 0) {
				game.turnPhase = i * 2;
			}
		}
		if (game.turnPhase === 12) {
			game.turnPhase = 6;
		}
		break;
	default:
		game.turnPhase++;
	}
};

export { processTurn };
