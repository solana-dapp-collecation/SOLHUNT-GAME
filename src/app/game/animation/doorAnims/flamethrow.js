
export const createflamethrowAnims = (anims) => {
  anims.create({
    key: "flamethrow-front",
    frames: anims.generateFrameNames("flamethrow", {
      start: 0,
      end: 3,
      prefix: "flamethrow_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 4,
  });
};
