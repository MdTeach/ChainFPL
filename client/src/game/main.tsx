import Phaser from "phaser";
import { useState, useEffect } from "react";
import { IonPhaser, GameInstance } from "@ion-phaser/react";
import Scenes from "./scenes";

const Main = () => {
  const [initialised, setInitialised] = useState(true);
  const [config, setConfig] = useState<GameInstance>();

  const startGame = async () => {
    let width = 1050;
    let height = width / 1.778;

    setConfig({
      type: Phaser.AUTO,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 10 },
          debug: true,
        },
      },
      scene: Scenes,
      scale: {
        mode: Phaser.Scale.NONE,
        width,
        height,
      },
      fps: {
        target: 60,
      },
      callbacks: {
        preBoot: () => {
          // Makes sure the game doesnt create another game on rerender
          setInitialised(false);
        },
      },
    });
  };

  useEffect(() => {
    startGame();
  }, []);

  return <IonPhaser initialize={initialised} game={config} id="phaser-app" />;
};

export default Main;
