const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

export class GameScene extends Phaser.Scene {
  helloWorld: any;
  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    this.cameras.main.setBackgroundColor("#24252A");
  }

  public create(): void {
    // Add layout
    this.helloWorld = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "Hello World",
      {
        font: "40px Arial",
        backgroundColor: "red",
      }
    );
    this.helloWorld.setOrigin(0.5);
  }
  public update(): void {
    // Every frame, we update the player
    this.helloWorld.angle += 1;
  }
}
