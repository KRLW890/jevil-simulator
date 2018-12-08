# Fun Time Simulator (WIP)
A simulator for the Jevil bossfight in Deltarune. Undertale and Deltarune belong to Toby Fox; I claim nothing.<br>
See what's already done <a href="https://krlw890.github.io/jevil-simulator/Jevil's%20Fun%20Time.html">here</a>.

<br>

<h2>TODO:</h2><br>
<h3>Programming</h3><br>
I'll fill this in later.<br><br>

<h3>Assets</h3><br>
Here's the sprites we have so far for the party:<br>
<table><tbody>
 <tr>
  <th></th>
  <th>Kris</th>
  <th>Susie</th>
  <th>Ralsei</th>
 </tr>
 <tr>
  <td>Idle</td>
  <td>Yes</td>
  <td>Yes</td>
  <td>Yes</td>
 </tr>
 <tr>
  <td>Intro</td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
 </tr>
 <tr>
  <td>Attack</td>
  <td>Yes</td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
 </tr>
 <tr>
  <td>Magic</td>
  <td>The pirouette for Kris.<br>We got this one.</td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
 </tr>
 <tr>
  <td>Act</td>
  <td>Yes</td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
 </tr>
 <tr>
  <td>Item</td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
 </tr>
 <tr>
  <td>Mercy</td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
 </tr>
 <tr>
  <td>Defend</td>
  <td>Yes</td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
 </tr>
 <tr>
  <td>Damage</td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
  <td><strong>No</strong></td>
 </tr>
 <tr>
  <td>Down</td>
  <td>Yes</td>
  <td><strong>No</strong></td>
  <td>Yes</td>
 </tr>
</tbody></table><br>
Additional notes:<br>
<ul>
<li>Intro refers to the short animation at the start of the battle with the characters going from their overworld to their battle sprites.
<li>When magic is selected for Susie or Ralsei, there is a short animation loop played between when the action is selected and when the magic is used. This short animation should be at the beginning of the magic animation.
<li>When Susie is set to select an item, she has a two-frame animation that plays between the selection and the turn, while the others do not. Because of this, Susie's item animation should start with those two frames, while the others should have a frame that is repeated twice at the beginning, so that they're synched up.
<li>The program uses an HTML canvas which doesn't support gifs. All animations should be in the form of spritesheets with frames next to each other on a single row (like <a href="https://github.com/KRLW890/jevil-simulator/blob/master/images/kris-idle.png">this</a>).



