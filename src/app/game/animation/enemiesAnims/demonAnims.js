
export const createdemonAnims = (anims) => {
  anims.create({
    key: "demon-idle",
    frames: anims.generateFrameNames("demon", {
      start: 0,
      end: 3,
      prefix: "big_demon_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 6,
  });

  anims.create({
    key: "demon-run",
    frames: anims.generateFrameNames("demon", {
      start: 0,
      end: 3,
      prefix: "big_demon_run_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 6,
  });
};

