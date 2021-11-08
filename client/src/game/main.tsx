import Phaser from "phaser";
import { useState, useEffect } from "react";
import { IonPhaser, GameInstance } from "@ion-phaser/react";
import { Redirect } from "react-router";
import Scenes from "./scenes";

const Main = () => {
  const [initialised, setInitialised] = useState(true);
  const [config, setConfig] = useState<GameInstance>();

  const startGame = async () => {
    let width = window.innerWidth;
    let height = width / 1.778;

    setConfig({
      type: Phaser.AUTO,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: true,
        },
      },
      scene: Scenes,
      scale: {
        mode: Phaser.Scale.NONE,
        width,
        height,
      },
    });
  };

  return <IonPhaser initialize={initialised} game={config} id="phaser-app" />;
};

export default Main;
