var Animation = function(spritesheet, frames)
{
    this.sprites = new Image();
    this.sprites.src = spritesheet;
    this.frames = frames;
    this.width = sprites.width/frames;
    this.height = sprites.height;
    this.frameCount = 0;
    this.playing = false;
};

// plays the animation. It can either loop or stop on the last frame
// if it is not set to loop, it returns true when the last frame has been played
Animation.prototype.play = function(x, y, loop, framerate, w, h)
{
    if (framerate == null)
        framerate = 1; // the speed of the animation is divided by framerate
    if (w == null)
    {
        w = this.width;
        h = this.height;
    }
    
    if (this.playing === false) // reset the frame counter if it's the first frame
    {
        this.frameCount = 0;
        this.playing = true;
    }
    
    ctx.drawImage(this.sprites, this.width*(Math.floor(this.frameCount / framerate)%this.frames), 0, this.width, this.height, x, y, w, h);
    
    if (loop || this.frameCount < this.frames-1)
        this.frameCount++;
    else // if the function is not set to loop and has reached the last frame, return true
        return true;
};

// draws a specific frame of the animation
Animation.prototype.drawFrame = function(x, y, frame, w, h)
{
    if (w == null)
    {
        w = this.width;
        h = this.height;
    }
    
    ctx.drawImage(this.sprites, this.width*frame, 0, this.width, this.height, x, y, w, h);
};



