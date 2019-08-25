const ctx = canvas.getContext('2d');

// Simple keyboard handler
const keyboard = (() => {
  document.addEventListener("keydown", keyHandler);
  document.addEventListener("keyup", keyHandler);
  const keyboard = {
    right: false,
    left: false,
    up: false,
    any : false,
  };
  function keyHandler(e) {
    const state = e.type === "keydown"
    if (e.keyCode == 39) {
      keyboard.right = state;
    } else if (e.keyCode == 37) {
      keyboard.left = state;
    } else if (e.keyCode == 38) {
      keyboard.up = state;
      e.preventDefault();
    }
    if(state) { keyboard.any = true } // must reset when used
  }
  return keyboard;
})();

// define the player.
// update() updates position and response to keyboard
// draw() draws the player
// start() sets start position and state
const banda = {
  x: 0,
  y: 0,
  dx: 0, // delta x and y
  dy: 0,
  size: 30,
  color: 'black',
  onGround: false,
  jumpPower: -9,  // power of jump smaller jumps higher eg -10 smaller than -5
  moveSpeed: 4,
  update() {
    // react to keyboard state
    if (keyboard.up && this.onGround) { this.dy = this.jumpPower }
    if (keyboard.left) { this.dx = -this.moveSpeed }
    if (keyboard.right) { this.dx = this.moveSpeed }
 
    // apply gravity drag and move banda
    this.dy += world.gravity;
    this.dy *= world.drag;
    this.dx *= this.onGround ? world.groundDrag : world.drag;
    this.x += this.dx;
    this.y += this.dy;

    // test ground contact and left and right limits
    if (this.y + this.size >= world.ground) {
      this.y = world.ground - this.size;
      this.dy = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }
    if (this.x > ctx.canvas.width) {
      this.x -= ctx.canvas.width;
    } else if (this.x + this.size < 0) {
      this.x += ctx.canvas.width;
    }
  },
  draw() {
    drawRect(this.x, this.y, this.size, this.size, this.color);
    drawCircle(this.x + this.size / 2, this.y - this.size / 2, this.size / 2, this.color);
  },
  start() {
    this.x = ctx.canvas.width / 2 - this.size / 2;
    this.y = world.ground - this.size;
    this.onGround = true;
    this.dx = 0;
    this.dy = 0;
  }
}

const bandi = {
    x: 1000,
    y: 0,
    dx: 0, // delta x and y
    dy: 0,
    size: 30,
    color: 'pink',
    onGround: false,
    jumpPower: -7,  // power of jump smaller jumps higher eg -10 smaller than -5
    moveSpeed: 3.5,
    
    update() {
      // apply gravity drag and move banda
      this.dy += world.gravity;
      this.dy *= world.drag;
      this.dx *= this.onGround ? world.groundDrag : world.drag;
      this.x += this.dx;
      this.y += this.dy;
  
      // test ground contact and left and right limits
      if (this.y + this.size >= world.ground) {
        this.y = world.ground - this.size;
        this.dy = 0;
        this.onGround = true;
      } else {
        this.onGround = false;
      }
      if (this.x > ctx.canvas.width) {
        this.x -= ctx.canvas.width;
      } else if (this.x + this.size < 0) {
        this.x += ctx.canvas.width;
      }
    },
    draw() {
        drawRect(this.x, this.y, this.size, this.size, this.color);
        drawCircle(this.x + this.size / 2, this.y - this.size / 2, this.size / 2, this.color);
    },
    start() {
      this.x = ctx.canvas.width / 2 - this.size / 2;
      this.y = world.ground - this.size;
      this.onGround = true;
      this.dx = 0;
      this.dy = 0;
    }
  }

  const bf = {
    x: 1200,
    y: 0,
    dx: 0, // delta x and y
    dy: 0,
    size: 30,
    color: 'green',
    onGround: false,
    jumpPower: 0,  // power of jump smaller jumps higher eg -10 smaller than -5
    moveSpeed: 3.5,
    
    update() {
      
    if (banda.x >= this.x) { this.dx = this.moveSpeed }
    if (banda.x <= this.x) { this.dx = -this.moveSpeed }

      // apply gravity drag and move banda
      this.dy += world.gravity;
      this.dy *= world.drag;
      this.dx *= this.onGround ? world.groundDrag : world.drag;
      this.x += this.dx;
      this.y += this.dy;
  
      // test ground contact and left and right limits
      if (this.y + this.size >= world.ground) {
        this.y = world.ground - this.size;
        this.dy = 0;
        this.onGround = true;
      } else {
        this.onGround = false;
      }
      if (this.x > ctx.canvas.width) {
        this.x -= ctx.canvas.width;
      } else if (this.x + this.size < 0) {
        this.x += ctx.canvas.width;
      }
    },
    draw() {
        drawRect(this.x, this.y, this.size, this.size, this.color);
        drawCircle(this.x + this.size / 2, this.y - this.size / 2, this.size / 2, this.color);
    },
    start() {
      this.x = ctx.canvas.width / 2 - this.size / 2;
      this.y = world.ground - this.size;
      this.onGround = true;
      this.dx = 0;
      this.dy = 0;
    }
  }

// define world
const world = {
  gravity: 0.3, // strength per frame of gravity
  drag: 0.99, // play with this value to change drag
  groundDrag: 0.8, // play with this value to change ground movement
  ground: 500,
}
// set start
banda.start();
// call first frame. This will run after all the rest of the code has run
requestAnimationFrame(mainLoop); // start when ready

// From OP
function drawRect(x, y, width, height, color) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawCircle(x, y, radius, color) {
    var circle = new Path2D();
    circle.moveTo(x, y);
    circle.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill(circle);
}

function drawGround(x, y, count = 1) {
  drawRect(x, y, canvas.width, canvas.height - y, '#684027');
  drawRect(x, y, canvas.width, 20, 'green');
}

function drawText(alignment, fontsize, typeface, color, text, x , y) {
    ctx.textAlign = alignment;
    ctx.font = fontsize + "px " + typeface;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

// show instruction
var showI = false;
var showBF = false;
// main animation loop
function mainLoop(time) { // time passed by requestAnimationFrame        
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGround(0, world.ground, 16);
  banda.draw();
  bandi.draw();
  banda.update();
  bandi.update();
  if (showBF) {
      bf.update();
      bf.draw();
  }

  if(Math.abs(banda.x - bandi.x) <= 100) {
      bandi.color = 'red';
      showI = true;
      showBF = true;
  } else {
      bandi.color = 'pink';
  }
  drawText("center", "36", "arial", "#000", "I like her", ctx.canvas.width / 2, 50);
  if(showI){
     if(keyboard.any){
         keyboard.any = false;
         showI = false;
     }
     drawText("center", "24", "arial", "#f00", "But then she had a boyfriend!", ctx.canvas.width / 2, 90);
    }
    requestAnimationFrame(mainLoop);
  }
  
  // make sure window has focus for keyboard input.
  window.focus();


  // ****************************************************************************************
// ****************************************************************************************
// ****************************************************************************************
// ****************************************************************************************

  // var main = function() {
//     $(document).keydown(function(e){
//         switch (e.which){
//         case 37:    //left arrow key
//             $(".banda img").animate({
//                 left: "-=5",
//             });
//             break;
        
//         case 39:    //right arrow key
//             $(".banda img").finish().animate({
//                 left: "+=5",
//                 top: "+=55"
//             });
//             break;
//         case 32:    //space key
//             $(".banda img").finish().animate({
                
//             });
//             break;
//         }
//     });
//     function throttle(f, t) {
//         return function(args) {
//             let previousCall = this.lastCall;
//             this.lastCall = Date.now();
//             if(previousCall == undefined || (this.lastCall - previousCall) > t) {
//                 f(args);
//             };
//         }
//     }
//     $(document).keyup(throttle(function(e){
//         switch (e.which) {
//             case 38:    //up arrow key
//                 $(".banda img").finish().animate({
//                     top: "-=55"
//                 }, 400)
//                 .queue(function() {
//                     $(this).animate({
//                         top: "+=55"
//                     }, 200).dequeue();
//                 });
//             break;
//         }
//     }, 600));
// }

// $(document).ready(main);