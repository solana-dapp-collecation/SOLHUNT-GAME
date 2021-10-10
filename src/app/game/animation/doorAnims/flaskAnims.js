
export const createflaskAnims = (anims) => {

  anims.create({
    key: "flask-open",
    frames: anims.generateFrameNames("flask", {
      start: 0,
      end: 1,
      prefix: "flasks_anims_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 8,
  });
};
