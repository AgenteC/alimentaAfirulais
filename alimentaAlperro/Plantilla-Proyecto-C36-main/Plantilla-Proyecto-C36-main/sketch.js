var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed
var FeedDog
//crea aquí las variables feed y lastFed 


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro
  FeedDog=createButton("Alimeta al perro")
  FeedDog.position(815,125)
  FeedDog.mousePressed(feedDog)

  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
lastFed=data.val();
});
  
 
  //escribe el código para mostrar el texto lastFed time aquí
  if(lastFed>=12){
    fill("white")
    textSize(21)
    text("Última hora en que se alimentó : "+ lastFed%12 + " PM", 200,30);
    }else if(lastFed==0){
      fill("white")
      textSize(21)
    text("Última hora en que se alimentó : 12 AM",200,30);
    }else{
      fill("white")
      textSize(21)
    text("Última hora en que se alimentó : "+ lastFed + " AM", 200,30);
    }
 

 
drawSprites();
}
//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
 dog.addImage(happyDog)
 if(foodObj.getFoodStock()<= 0){
 foodObj.updateFoodStock(foodObj.getFoodStock()*0); 
 }else{ foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 } 
 database.ref('/').update({ Food:foodObj.getFoodStock(),
 FeedTime:hour() })

 if(foodStock === 0){
   dog.addImage(sadDog)
 }
 } 
 
  
  
  


//funcón para agregar alimento al almacén
function addFoods(){
dog.addImage(sadDog)
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
