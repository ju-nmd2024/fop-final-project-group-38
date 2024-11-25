let mapYposition = 240; //Yposition of everything in the map
let mapXposition = 300; //Xposition of everything in the map
let gameRunning = true; //medans man kör är denna true.

function setup() 
{
  createCanvas(600, 480);
}

function player()
{
  fill(0);
  ellipse(300, 240, 30, 30);
}

function map(x, y)
{
  fill (50);
  rect (x + 100, y, 200, 120);
}

function draw() 
{
  background(100);

  
  map(mapXposition, mapYposition);
  player();


  if (keyIsDown(87)) //KeyCode for "w"
  {
    mapYposition += 4;
  }
  if (keyIsDown(65)) //KeyCode for "w"
  {
    mapXposition += 4;
  }
  if (keyIsDown(83)) //KeyCode for "w"
  {
    mapYposition -= 4;
  }
  if (keyIsDown(68)) //KeyCode for "w"
  {
    mapXposition -= 4;
  }

}
