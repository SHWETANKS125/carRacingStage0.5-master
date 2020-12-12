class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

play()
{
    form.hide();
    textSize(30);
    text("Game Start",120,100);
    Player.getPlayerInfo();

    if(allPlayers !== undefined)
    {
      var display_pos=130;
      for(var plr in allPlayers)
      {
        if(plr==="player"+player.index){
          fill("red");
        }
        else{
          fill("black");
        }
        display_pos+=20;
        textSize(20);
        text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,display_pos);
      }
    }
    if(keyIsDown(UP_ARROW)&&player.index!==null)
    {
      player.distance+=50;
      player.update();
    }  
}

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerref=await database.ref('playerCount').once("value");
      if(playerref.exists())
      {
        playerCount=playerref.val();
        player.getCount();
      
      }
   
      form = new Form()
      form.display();
    }
  }
}
