
export const createKnightAnims = (anims) => {
  anims.create({
    key: "Knight-idle",
    frames: anims.generateFrameNames("Knight", {
      start: 0,
      end: 3,
      prefix: "knight_f_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 9,
  });

  anims.create({
    key: "Knight-run",
    frames: anims.generateFrameNames("Knight", {
      start: 0,
      end: 3,
      prefix: "knight_f_run_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 9,
  });
};

