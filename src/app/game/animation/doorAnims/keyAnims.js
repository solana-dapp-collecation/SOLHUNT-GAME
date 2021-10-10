
export const createkeyAnims = (anims) => {
  anims.create({
    key: "key-idle",
    frames: [{ key: "key", frame: "keys_anim_f0.png" }],
  });

  anims.create({
    key: "key-open",
    frames: anims.generateFrameNames("key", {
      start: 0,
      end: 3,
      prefix: "keys_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 8,
  });
};
