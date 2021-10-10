
export const createGhoulAnims = (anims) => {
  anims.create({
    key: "ghoul-run",
    frames: anims.generateFrameNames("ghoul", {
      start: 0,
      end: 7,
      prefix: "burning-ghoul_anims_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 6,
  });
};

