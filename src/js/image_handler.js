/* eslint-disable no-unused-vars */

class SpriteAnimation {
	constructor(spritesheet, frames) {
		this.spritesheet = spritesheet;
		this.frames = frames;
		this.frameCount = 0;
		this.playing = false;
	}

	play(x, y, loop, framerate, w, h) {
		// plays the animation. It can either loop or stop on the last frame
		// if it is not set to loop, it returns true when the last frame has been played
		// the speed of the animation is divided by framerate
		if (framerate == null) {
			framerate = 1;
		}
		if (h == null) {
			if (w == null) {
				w = this.spritesheet.width/this.frames;
				h = this.spritesheet.height;
			} else {
				h = w * this.spritesheet.height;
				w = w * this.spritesheet.width/this.frames;
			}
		} else {
			h = h * this.spritesheet.height;
			w = w * this.spritesheet.width/this.frames;
		}

		if (this.playing === false) {
			// reset the frame counter if it's the first frame
			this.frameCount = 0;
			this.playing = true;
		}

		p5.instance.image(this.spritesheet, x, y, w, h, (this.spritesheet.width/this.frames) * (Math.floor(this.frameCount / framerate) % this.frames), 0, this.spritesheet.width/this.frames, this.spritesheet.height);

		if (loop || this.frameCount < this.frames - 1) {
			this.frameCount++;
		} else {
			// if the function is not set to loop and has reached the last frame, return true
			return true;
		}
	}

	drawFrame(x, y, frame, w, h) {
		// draws a specific frame of the animation
		if (h == null) {
			if (w == null) {
				w = this.spritesheet.width/this.frames;
				h = this.spritesheet.height;
			} else {
				h = w * this.spritesheet.height;
				w = w * this.spritesheet.width;
			}
		} else {
			h = h * this.spritesheet.height;
			w = w * this.spritesheet.width;
		}

		p5.instance.image(this.spritesheet, x, y, w, h, (this.spritesheet.width/this.frames) * frame, 0, this.spritesheet.width/this.frames, this.spritesheet.height);
	}
}

export { SpriteAnimation };
