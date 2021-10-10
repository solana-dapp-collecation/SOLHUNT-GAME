
export const createwallAnims = (anims) => {
  anims.create({
    key: "wall-crackk",
    frames: anims.generateFrameNames("wall", {
      start: 0,
      end: 3,
      prefix: "wall_anim_crack_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 3,
  });

  anims.create({
    key: "wall-idle",
    frames: [{ key: "wall", frame: "wall_anim_crack_f0.png" }],
  });

  anims.create({
    key: "wall-crack",
    frames: [{ key: "wall", frame: "wall_anim_crack_f1.png" }],
  });

  anims.create({
    key: "wall-crackkk",
    frames: [{ key: "wall", frame: "wall_anim_crack_f2.png" }],
  });

  anims.create({
    key: "wall-end",
    frames: [{ key: "wall", frame: "wall_anim_crack_f3.png" }],
  });
};
