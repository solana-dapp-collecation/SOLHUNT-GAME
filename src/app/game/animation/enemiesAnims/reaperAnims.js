
export const createReaperAnims = (anims) => {
  anims.create({
    key: "reaper-run",
    frames: anims.generateFrameNames("reaper", {
      start: 0,
      end: 7,
      prefix: "reaper_walk_anims_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 6,
  });
};

