const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload(): void {}

  public create(): void {
    // Add layout
  }
  public update(): void {
    // Every frame, we update the player
  }
}
