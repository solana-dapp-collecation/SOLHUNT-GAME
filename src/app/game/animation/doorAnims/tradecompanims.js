
export const createtradecompAnims = (anims) => {
  anims.create({
    key: "tradecomp-idle",
    frames: anims.generateFrameNames("tradecomp", {
      start: 0,
      end: 1,
      prefix: "tradecomp_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 6,
  });

};
