
export const createGhostAnims = (anims) => {
  anims.create({
    key: "ghost-run",
    frames: anims.generateFrameNames("ghost", {
      start: 0,
      end: 7,
      prefix: "ghost_walk_anims_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 6,
  });

};

