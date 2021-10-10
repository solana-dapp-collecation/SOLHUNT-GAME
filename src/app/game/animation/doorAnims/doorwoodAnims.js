
export const createdoorwoodAnims = (anims) => {
  anims.create({
    key: "doorwood-closed",
    frames: [{ key: "doorwood", frame: "doors_leaf_closed.png" }],
  });

  anims.create({
    key: "doorwood-full-open",
    frames: [{ key: "doorwood", frame: "doors_leaf_open.png" }],
  });
};
