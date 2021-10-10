
export const createnewKnightAnims = (anims) => {
  anims.create({
    key: "newKnight-idle",
    frames: anims.generateFrameNames("newKnight", {
      start: 0,
      end: 5,
      prefix: "knight_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "newKnight-run",
    frames: anims.generateFrameNames("newKnight", {
      start: 0,
      end: 5,
      prefix: "knight_run_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });
};

