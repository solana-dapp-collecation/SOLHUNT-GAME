
export const createChestAnims = (anims) => {
  anims.create({
    key: "chest-empty-open",
    frames: anims.generateFrameNames("treasure", {
      start: 0,
      end: 2,
      prefix: "chest_empty_open_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 5,
  });

  anims.create({
    key: "chest-full-open",
    frames: anims.generateFrameNames("treasure", {
      start: 0,
      end: 2,
      prefix: "chest_full_open_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 5,
  });

  anims.create({
    key: "coins",
    frames: anims.generateFrameNames("coin", {
      start: 0,
      end: 3,
      prefix: "coin_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 5,
  });

  anims.create({
    key: "chest-closed",
    frames: [{ key: "treasure", frame: "chest_mimic_open_anim_f0.png" }],
  });
};

