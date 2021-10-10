
export const createdZombieAnims = (anims) => {
  anims.create({
    key: "zombie-idle",
    frames: anims.generateFrameNames("plantZombie", {
      start: 0,
      end: 3,
      prefix: "big_zombie_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 6,
  });

  anims.create({
    key: "zombie-run",
    frames: anims.generateFrameNames("plantZombie", {
      start: 0,
      end: 3,
      prefix: "big_zombie_run_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 6,
  });
};

