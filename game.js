let mapY = 240; //Yposition of everything in the map
let mapX = 300; //Xposition of everything in the map
let gameRunning = true; //medans man kör är denna true.

let playerRadius = 15; //used late for detecting collision

let walls = []; //array for all the walls
let pages = []; //array for the pages (objects to collect)
let pagescollected = 0; //keeps track of how many pages are collected
let monsterX = 50;
let monsterY = -900;
let gameState = "menu"; //determines whether the player is in the menu or playing
let result = "winner"; //"winner" or "loser" depending on if the player won or lost

noStroke();

function setup()
{
  createCanvas(600, 480);

  //walls created in the "walls" array
  walls.push({ x: -300, y: -180, w: 400, h: 50 }); 
  walls.push({ x: 180, y: -180, w: 100, h: 50 });
  walls.push({ x: -300, y: 120, w: 600, h: 50 });
  walls.push({ x: -300, y: -160, w: 80, h: 300 }); 
  walls.push({ x: 220, y: -180, w: 80, h: 330 });
  walls.push({ x: 450, y: -780, w: 80, h: 260 });
  walls.push({ x: -300, y: -340, w: 600, h: 80 });
  walls.push({ x: 300, y: -180, w: 200, h: 50 });
  walls.push({ x: 450, y: -430, w: 80, h: 300 });
  walls.push({ x: 250, y: -660, w: 80, h: 400 });
  walls.push({ x: -300, y: -660, w: 80, h: 400 });
  walls.push({ x: -400, y: -180, w: 200, h: 50 });
  walls.push({ x: -470, y: -480, w: 80, h: 350 });
  walls.push({ x: -470, y: -750, w: 80, h: 200 });
  walls.push({ x: -300, y: -660, w: 600, h: 80 });
  walls.push({ x: -470, y: -830, w: 500, h: 80 });
  walls.push({ x: 130, y: -830, w: 400, h: 80 });
  walls.push({ x: 250, y: -1000, w: 80, h: 200 });
  walls.push({ x: -100, y: -1000, w: 80, h: 200 });
  walls.push({ x: -100, y: -1050, w: 430, h: 80 });
  walls.push({ x: -600, y: -400, w: 200, h: 80 });
  walls.push({ x: -600, y: -700, w: 200, h: 80 });
  walls.push({ x: -670, y: -700, w: 80, h: 380 });

  walls.push({ x: 500, y: -400, w: 300, h: 80 });
  walls.push({ x: 500, y: -700, w: 300, h: 80 });
  walls.push({ x: 750, y: -700, w: 80, h: 380 });

  //pages created in the "pages" array
  pages.push({ x: -150, y: 50});
  pages.push({ x: 200, y: -880});
  pages.push({ x: 0, y: -960});
  pages.push({ x: 560, y: -580});
  pages.push({ x: -560, y: -450});

}

function player()
{
  fill(0);
  ellipse(300, 240, playerRadius * 2, playerRadius * 2);
}

function drawMonster(x, y, monsterX, monsterY){
  push();
  translate(x, y);

  fill("red");
  ellipse(monsterX, monsterY, 20, 20);
  pop();
}

function monsterChase() {
  //convert monster's map position to screen position
  let monsterScreenX = monsterX + mapX;
  let monsterScreenY = monsterY + mapY;

  //the player's fixed screen position
  let playerX = 300;
  let playerY = 240;

  //monster moves toward player position
  if (monsterScreenX < playerX) {
    monsterX += 2; //move monster right toward the player
  } else if (monsterScreenX > playerX) { 
    monsterX -= 2; //move monster left toward the player
  }

  if (monsterScreenY < playerY) {
    monsterY += 2; //move monster down toward the player
  } else if (monsterScreenY > playerY) {
    monsterY -= 2; //move monster up toward the player
  }
}


function draw()
{
  if (gameState === "menu")
  {
    drawMenu();
  }
  else if (gameState === "running")
  {
    drawGame();
  }
  else if (gameState === "gameover")
  {
    drawEndScreen();
  }
}

function drawMenu()
{
  background(40);

  fill(300);
  rect(180, 70, 250, 360);

  fill(250, 50, 50);
  textSize(45);
  text("The Pages", 195, 150);

  textSize(20);
  text("Press [SPACE] to play", 210, 300);

  fill(300, 10, 10);
  ellipse(0, 0, 250);
  ellipse(600, 500, 200);

  
}

//the end screen varies between a lose or winscreen depending on the outcome
function drawEndScreen()
{
   background(20);

  if (result === "winner")
  {
    textSize(52);
    fill("red");
    text("You Escaped", 100, 200);
    textSize(20);
    fill(200);
    text("[SPACE]   Play Again", 110, 300);
    textSize(20);
    fill(100);
    text("[1]   Main Menu", 110, 340);
  }
  else if (result === "loser")
  {
    textSize(40);
    fill("red");
    text("You Were Caught!", 100, 200);
    textSize(20);
    fill(200);
    text("[SPACE]   Play Again", 110, 300);
    textSize(20);
    fill(100);
    text("[1]   Main Menu", 110, 340);
  }

}

//draws map based on x and y offset so player is always in the middle of the screen
function drawMap(x, y)
{ 
  push();
  translate(x, y);
  fill (50);
  for (let wall of walls) //makes a rect for each wall declared
  {
    rect( wall.x, wall.y, wall.w, wall.h);
  }

  fill (300, 300, 300);
  for (let page of pages)
  {
    rect(page.x, page.y, 20, 30);
  }
  pop();
}

//function for the game logic
function drawGame()
{
  background(100);
  
  let moveX = 0;
  let moveY = 0;
  
  drawMap(mapX, mapY);
  player();
  drawMonster(mapX, mapY, monsterX, monsterY);
  //key input for movement
  if (keyIsDown(87)) moveY += 4; //"W" key moves the map up
  if (keyIsDown(65)) moveX += 4; //"A" key moves the map left
  if (keyIsDown(83)) moveY -= 4; //"S" key moves the map down
  if (keyIsDown(68)) moveX -= 4; //"D" key moves the map right

  //allows the player to move if theres no collision
  if (!isColliding(moveX, moveY)) {
    mapX += moveX;
    mapY += moveY; 
  }

  //allows the player to pick up the pages on the ground
  checkPageCollision(); 

  //activates after the 2nd page is collected
  if (pagescollected >= 2) {
    monsterChase(); //monster is chasing
    checkMonsterCollision(); //monster collision with player
  }
  if(pagescollected === 5)
  {
    result = "winner";
    gameState = "gameover";
  }

  textSize(30);
  fill(0);
  text(pagescollected + " / 5", 10, 10, 500);
}



//function to check collision with all walls whenever the player moves
function isColliding(moveX, moveY) {
  let playerX = 300;
  let playerY = 240;

  //triggers once for every wall, checks every wall of the map for collision with the player
  for (let wall of walls) {
    //calculate the wall's new position after movement
    let newWallX = mapX + moveX + wall.x;
    let newWallY = mapY + moveY + wall.y;

    //check collision with this wall
    let closestX = constrain(playerX, newWallX, newWallX + wall.w);
    let closestY = constrain(playerY, newWallY, newWallY + wall.h);

    let distanceX = playerX - closestX;
    let distanceY = playerY - closestY;

    if (sqrt(distanceX * distanceX + distanceY * distanceY) < playerRadius) {
      return true; //collision detected
    }
  }

  return false; //no collision with any wall
}

//function to check for collision with pages
function checkPageCollision() {
  let playerX = 300; //player is always centered
  let playerY = 240; 

  //loop through pages to check collision
  for (let i = pages.length - 1; i >= 0; i--) {
    let page = pages[i];
    let pageX = mapX + page.x; //adjust page position relative to map
    let pageY = mapY + page.y;

    //check if the player is overlapping the page
    let distanceX = playerX - (pageX + 10); //center of the page (10 is half of its width)
    let distanceY = playerY - (pageY + 15); //center of the page (15 is half of its height)

    if (abs(distanceX) < playerRadius + 10 && abs(distanceY) < playerRadius + 15) {
      //collision detected, remove page
      pages.splice(i, 1);
      pagescollected += 1;
    }
  }
}

function checkMonsterCollision() {
  //convert monster's map position to screen position
  let monsterScreenX = monsterX + mapX;
  let monsterScreenY = monsterY + mapY;

  //player's fixed screen position
  let playerX = 300;
  let playerY = 240;

  //calculate the distance between monster and player
  let distance = dist(monsterScreenX, monsterScreenY, playerX, playerY);

  //check if distance is less than the sum of the radii (15 is the player's radius, 10 is the monster's radius)
  if (distance < 15 + 10) {
    result = "loser";
    gameState = "gameover"; //stop the game or handle losing state
  }
}


//function for leaving main menu using the space key
function keyPressed() 
{
  if(gameState === "menu" || gameState === "gameover")
  {
    if(key === " ")
    {
      gameState = "running";
    }
    else if(key === "1")
      {
        gameState = "menu";
      }
  }
}