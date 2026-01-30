import { useEffect, useRef } from "react";
import Phaser from "phaser";

function Rough() {
  const gameRef = useRef(null);

  useEffect(() => {
    class MainScene extends Phaser.Scene {
      constructor() {
        super("MainScene");
      }

      preload() {
        this.load.image(
          "player",
          "https://labs.phaser.io/assets/sprites/phaser-dude.png"
        );
        this.load.image(
          "ground",
          "https://labs.phaser.io/assets/sprites/platform.png"
        );
      }

      create() {
        // 🧱 Ground
        const ground = this.physics.add.staticImage(400, 380, "ground");
        ground.setScale(2).refreshBody();

        // 🧍 Player
        this.player = this.physics.add.sprite(400, 200, "player");
        this.player.setCollideWorldBounds(true);

        // Collision
        this.physics.add.collider(this.player, ground);

        // 🎮 Keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
      }

      update() {
        const speed = 200;

        // ⬅️➡️ Left / Right
        if (this.cursors.left.isDown) {
          this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(speed);
        } else {
          this.player.setVelocityX(0);
        }

        // ⬆️ Jump (only when on ground)
        if (
          this.cursors.up.isDown &&
          this.player.body.touching.down
        ) {
          this.player.setVelocityY(-350);
        }
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 400,
      parent: "phaser-game",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 500 },
          debug: false,
        },
      },
      scene: MainScene,
    };

    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div>
      <h2>Phaser Movement Demo</h2>
      {/* <div id="phaser-game" /> */}
    </div>
  );
}

export default Rough;
