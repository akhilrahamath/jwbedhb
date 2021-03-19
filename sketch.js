var dog,sadDog,happyDog;
var dogfood,addfood,foodobj,foodObj;
var foodS;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/Happydog.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  dogfood=createButton("Feed the dog");
  dogfood.position(700,95);
  dogfood.mousePressed(feedDog);

  addfood=createButton("Add Food");
  addfood.position(800,95);
  addfood.mousePressed(addFoods);

  foodobj=new Food();

}

function draw() {
  background(46,139,87);
  foodobj.display();
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val *0);
  }else{
      foodObj.updateFoodStock(food_stock_val -1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
