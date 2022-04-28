import GridEngine from "grid-engine";
import Phaser from 'phaser';
import './App.css';

//assets

import tileset from "./assets/cloud_tileset.png"
import cloudJson from "./assets/cloud-city.json"
import characters from "./assets/characters.png"
import React, { useEffect } from "react";


function preload() {
  this.load.image("tiles", tileset);
  this.load.tilemapTiledJSON("cloud-city-map", cloudJson);
  this.load.spritesheet("player", characters, {
    frameWidth: 26,
    frameHeight: 36,
  });
}

function create() {
  const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
  cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
  for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
    const layer = cloudCityTilemap.createLayer(i, "Cloud City", 0, 0);
    layer.scale = 3;
  }

  console.log(cloudCityTilemap.layers);

  var playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 3;
  console.log(playerSprite);
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 4, y: 5 },
      },
    ],
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);

  // EXPOSE TO EXTENSION
  window.__GRID_ENGINE__ = this.gridEngine;
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    this.gridEngine.move("player", "left");
  } else if (cursors.right.isDown) {
    this.gridEngine.move("player", "right");
  } else if (cursors.up.isDown) {
    this.gridEngine.move("player", "up");
  } else if (cursors.down.isDown) {
    this.gridEngine.move("player", "down");
  }
}


class App extends React.Component{
  constructor(){
    super();
    this.game = null;
  }

  componentDidMount(){
    if(this.game === null){
      this.game = new Phaser.Game({
            title: "GridEngineExample",
              render: {
                antialias: false,
              },
              type: Phaser.AUTO,
              physics: {
                default: 'arcade',
              },
              plugins: {
                scene: [
                  {
                    key: "gridEngine",
                    plugin: GridEngine,
                    mapping: "gridEngine",
                  },
                ],
              },
              scene: {
                preload,
                create,
                update,
              },
              scale: {
                width: 720,
                height: 528,
                autoCenter: Phaser.Scale.CENTER_BOTH,
              },
              parent: "game",
              backgroundColor: "#48C4F8",
          });
    }      
  }


  render(){
    return (
      <div id="game"></div>
    ) 
  }
}

// function App() {
  
//   useEffect(()=> {
//     const game = 
//   },[])

//   return (
//     <></>
//   );
// }







export default App;
