
export const createspikesAnims = (anims) => {
  anims.create({
    key: "spikes-open",
    frames: anims.generateFrameNames("spikes", {
      start: 0,
      end: 9,
      prefix: "spikes_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 8,
  });

  anims.create({
    key: "spikes-idle",
    frames: [{ key: "spikes", frame: "spikes_anim_f0.png" }],
  });
};
