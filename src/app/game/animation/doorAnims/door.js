
export const createdoorAnims = (anims) => {
  anims.create({
    key: "door-open",
    frames: anims.generateFrameNames("door", {
      start: 0,
      end: 13,
      prefix: "door_anim_opening_f",
      suffix: ".png",
    }),
    repeat: 0,
    frameRate: 8,
  });

  anims.create({
    key: "door-closed",
    frames: [{ key: "door", frame: "door_closed.png" }],
  });

  anims.create({
    key: "door-full-open",
    frames: [{ key: "door", frame: "door_fullyopen.png" }],
  });

};
