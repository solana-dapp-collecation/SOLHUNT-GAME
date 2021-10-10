
export const createtorchburnAnims = (anims) => {
  anims.create({
    key: "burn-idle",
    frames: anims.generateFrameNames("torchburn", {
      start: 0,
      end: 3,
      prefix: "torch_burn_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 7,
  });
};
