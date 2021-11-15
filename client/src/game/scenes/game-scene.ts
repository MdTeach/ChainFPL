import tile_img2 from "assets/images/iso-64x64-building.png";
import tile_img1 from "assets/images/iso-64x64-outside.png";
import tile_map_data from "assets/tilemaps/isorpg.json";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

export class GameScene extends Phaser.Scene {
  controls?: Phaser.Cameras.Controls.SmoothedKeyControl;
  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    this.cameras.main.setBackgroundColor("#24252A");
    this.load.image("tiles", tile_img1);
    this.load.image("tiles2", tile_img2);
    this.load.tilemapTiledJSON("map", tile_map_data);
  }

  public create(): void {
    var map = this.add.tilemap("map");

    console.log(map);

    var tileset1 = map.addTilesetImage("iso-64x64-outside", "tiles");
    var tileset2 = map.addTilesetImage("iso-64x64-building", "tiles2");

    map.createLayer("Tile Layer 1", [tileset1, tileset2]);
    map.createLayer("Tile Layer 2", [tileset1, tileset2]);
    map.createLayer("Tile Layer 3", [tileset1, tileset2]);
    map.createLayer("Tile Layer 4", [tileset1, tileset2]);
    map.createLayer("Tile Layer 5", [tileset1, tileset2]);

    var cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setZoom(2);

    var controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.04,
      drag: 0.0005,
      maxSpeed: 0.7,
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    );
  }

  public update(time: number, delta: number): void {
    if (this.controls) {
      this.controls.update(delta);
    }
  }
}
