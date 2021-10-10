
export const createAngelAnims = (anims) => {
  anims.create({
    key: "angel-run",
    frames: anims.generateFrameNames("angel", {
      start: 0,
      end: 7,
      prefix: "angel_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 6,
  });
};
