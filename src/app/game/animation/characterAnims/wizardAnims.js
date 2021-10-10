
export const createwizardAnims = (anims) => {
  anims.create({
    key: "wizard-idle",
    frames: anims.generateFrameNames("wizard", {
      start: 0,
      end: 3,
      prefix: "wizzard_f_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 6,
  });
};
