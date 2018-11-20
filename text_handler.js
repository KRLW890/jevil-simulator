var letters = [
" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?",
"@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\","]", "^", "_",
"`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
"p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~"
];

var Font = function(spritesheet, width, height, columns, xOffset, yOffset)
{
    this.letterSprites = new Image();
    this.letterSprites.src = spritesheet;
    this.width = width;
    this.height = height;
    this.cols = columns;
    this.xOffset = xOffset || 0;
    this.yOffset = yOffset || 0;
};

Font.prototype.drawText = function(string, x, y, size)
{
    if (size === undefined)
        size = 1;
    
    var cursorX = 0, cursorY = 0;
    for (var i = 0; i < string.length; i++)
    {
        if (string.charAt(i) === "\n")
        {
            cursorX = 0;
            cursorY += this.height*size;
        }
        else {
            for (var j = 0; j < letters.length; j++)
            {
                if (string.charAt(i) === letters[j])
                {
                    ctx.drawImage(this.letterSprites,
                                  this.xOffset+(j%this.cols)*this.width,
                                  this.yOffset+Math.floor(j/this.cols)*this.height,
                                  this.width, this.height, x+cursorX, y+cursorY, this.width*size, this.height*size);
                    cursorX += this.width*size;
                    break;
                }
            }
        }
    }
};

// TODO: double the size of this font
var defaultFont = new Font("images/DefaultFont.png", 10, 16, 16);


var hpFont = new Font("images/hpFont.png", 8, 12, 0);
hpFont.drawText = function(hp, percent, x, y)
{
    var cursor = 0;
    var row = 0;
    if (hp <= 0)
        row = 2;
    else if (percent <= 0.25)
        row = 1;
    
    while (hp > 0)
    {
        ctx.drawImage(this.letterSprites,
                      (hp%10)*this.width, row*this.height, this.width, this.height,
                      x+cursor-this.width, y, this.width, this.height);
        cursor -= this.width;
        
        hp = Math.floor(hp/10);
    }
    if (hp < 0)
    {
        ctx.drawImage(this.letterSprites,
                      10*this.width, row*this.height, this.width, this.height,
                      x+cursor, y, this.width, this.height);
    }
}


