# Fun Time Simulator (WIP)
A simulator for the Jevil bossfight in Deltarune. Undertale and Deltarune belong to Toby Fox; I claim nothing.<br>
See what's already done <a href="https://krlw890.github.io/jevil-simulator/">here</a>.

<strong>Update: We now have infrustructure to start working on Jevil's attacks.</strong><br>
I (KRLW890) also added one attack (the heart bombs from the 3rd turn), and I've filled out some of the information for other attacks, although the damage for the final Neo Chaos attack is giving me sass; I'm pretty sure it uses a unique damage formula. I mostly skipped over the earlier parts of the turn leading up to Jevil's attack, so I plan to go back and work on those parts. If you're one of the other programmers, please feel free to add other attacks.<br><br>
<strong>Here's a rundown of how attacks are being handled:</strong><br>
In the new bullet_handler file, there's a Bullet parent constructor. From that, each different bullet type should have its own constructor. Each Bullet child constructor needs a .move() prototype function, which determines how the bullet behaves once spawned. All the other properties are to help .move()<br>
In the attack_handler file, you'll see an Attack constructor and an array of Array objects. I already have the base damage for each of these attacks, and each of them have a comment labeling them with a description of the attack. When you go to make a new attack, you'll need to make a .spawnBullets() function for whichever one you're working on. This function should be pretty short for most attacks. Just look at the one that's already there and you should be fine.
