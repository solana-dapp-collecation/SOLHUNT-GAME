
export const createRockAnims = (anims) => {
  anims.create({
    key: "rock-run",
    frames: anims.generateFrameNames("rock", {
      start: 0,
      end: 5,
      prefix: "rock_walk_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 6,
  });
};
