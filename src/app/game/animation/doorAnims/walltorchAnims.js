
export const createWalltorchAnims = (anims) => {
  anims.create({
    key: "walltorch-idle",
    frames: anims.generateFrameNames("walltorch", {
      start: 0,
      end: 5,
      prefix: "torch_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 7,
  });
};
