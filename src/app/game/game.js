import Phaser from "phaser";
import logoImg2 from "./assets/dungenTileset.png";
import dungenMap from "./assets/dungen-01.json";
import tilesetterain from "./assets/tropical.png";
import tilesetdecor from "./assets/decor.png";
import tilesetdungon from "./assets/dungon.png";
import tilsetcastle from "./assets/castle.png";
import tilsetpillar from "./assets/pillar.png";
import tilsetwalldecor from "./assets/walldecor.png";
import heroJson from "./assets/hero.json";
import heroPng from "./assets/hero.png";
import lizardPng from "./assets/lizard.png";
import lizardJson from "./assets/lizard.json";
import plantZombieJson from "./assets/plantZombie.json";
import plantZombiePng from "./assets/plantZombie.png";
import demonJson from "./assets/demon.json";
import demonPng from "./assets/demon.png";
import knightJson from "./assets/enemyKnight.json";
import knightPng from "./assets/enemyKnight.png";
import newKnightJson from "./assets/newKnight.json";
import newKnightPng from "./assets/newKnight.png";
import wizardJson from "./assets/wizard.json";
import wizardPng from "./assets/wizard.png";
import ghostJson from "./assets/ghost.json";
import ghostPng from "./assets/ghost.png";
import reaperJson from "./assets/reaper.json";
import reaperPng from "./assets/reaper.png";
import rockJson from "./assets/rock.json";
import rockPng from "./assets/rock.png";
import ghoulJson from "./assets/ghoul.json";
import ghoulPng from "./assets/ghoul.png";
import angelJson from "./assets/angel.json";
import angelPng from "./assets/angel.png";
import tradecompJson from "./assets/tradecomp.json";
import tradecompPng from "./assets/tradecomp.png";
import torchburnJson from "./assets/torch_burn.json";
import torchburnPng from "./assets/torch_burn.png";
import walltorchJson from "./assets/torch.json";
import walltorchPng from "./assets/torch.png";
import chainlinkPng from "./assets/solana.svg";
import weapon from "./assets/weapon_knife.png";
import chestPng from "./assets/chest.png";
import chestJson from "./assets/chest.json";
import coinPng from "./assets/coins.png";
import coinJson from "./assets/coins.json";
import doorPng from "./assets/door.png";
import doorJson from "./assets/door.json";
import spikesPng from "./assets/spikes.png";
import spikesJson from "./assets/spikes.json";
import wallJson from "./assets/wall.json";
import wallPng from "./assets/wall.png";
import flamethrowPng from "./assets/flamethrow.png";
import flamethrowJson from "./assets/flamethrow.json";
import keyPng from "./assets/key.png";
import keyJson from "./assets/key.json";
import doorwoodJSon from "./assets/door_1.json";
import doorwoodPng from "./assets/door_1.png";
import flaskJson from "./assets/flask.json";
import flaskPng from "./assets/flask.png";
import dungeonsound from "./assets/dungeon_theme_2.mp3";
import femalefaint from "./assets/female-faint.mp3";
import dooropen from "./assets/jail_cell_door.mp3";
import knifesound from "./assets/knifesound.mp3";
import coinsound from "./assets/coins-in-hand.mp3";
import femalehurt from "./assets/female-hurt.mp3";
import demonScream from "./assets/demon-screech.mp3";
import rockdie from "./assets/ConsumeSoul.mp3";
import youdied from "./assets/YouDied.mp3";
import spiketrap from "./assets/spike_trap.mp3";
import ghoulsound from "./assets/ghoul_sound.mp3";
import ghostsound from "./assets/ghost_sound.mp3";

import { createLizardAnims } from "./animation/enemiesAnims/lizardAnims";
import { createCharacterAnims } from "./animation/characterAnims/characterAnims";
import { createdZombieAnims } from "./animation/enemiesAnims/plantZombie";
import { createdemonAnims } from "./animation/enemiesAnims/demonAnims";
import { createKnightAnims } from "./animation/enemiesAnims/KnightAnims";
import { createnewKnightAnims } from "./animation/enemiesAnims/newKnightAnims";
import { createChestAnims } from "./animation/treaserAnims/chest";
import { createdoorAnims } from "./animation/doorAnims/door";
import { createspikesAnims } from "./animation/doorAnims/spikes";
import { createwallAnims } from "./animation/doorAnims/wall";
import { createflamethrowAnims } from "./animation/doorAnims/flamethrow";
import { createwizardAnims } from "./animation/characterAnims/wizardAnims";
import { createkeyAnims } from "./animation/doorAnims/keyAnims";
import { createGhostAnims } from "./animation/enemiesAnims/ghostAnims";
import { createReaperAnims } from "./animation/enemiesAnims/reaperAnims";
import { createRockAnims } from "./animation/enemiesAnims/rockAnims";
import { createdoorwoodAnims } from "./animation/doorAnims/doorwoodAnims";
import { createGhoulAnims } from "./animation/enemiesAnims/ghoulAnims";
import { createAngelAnims } from "./animation/enemiesAnims/angelAnims";
import { createflaskAnims } from "./animation/doorAnims/flaskAnims";
import { createtradecompAnims } from "./animation/doorAnims/tradecompanims";
import { createtorchburnAnims } from "./animation/doorAnims/torchburnAnims";
import { createWalltorchAnims } from "./animation/doorAnims/walltorchAnims";

import sceneEvents from "./events/eventsCenter";
import Lizard from "./enemies/lizard";
import Treasure from "./treasure/treasure";
import plantZombies from "./enemies/plantZombie";
import demonq from "./enemies/demon";
import Knightz from "./enemies/Knight";
import newKnightz from "./enemies/newKnight";
import doorz from "./treasure/doorr";
import Spike from "./treasure/spikess";
import Wall from "./treasure/walls";
import flamethrowz from "./treasure/flamethrows";
import Wizard from "./hero/wizard";
import Key from "./treasure/key";
import Chainlink from "./enemies/chainlink";
import Ghost from "./enemies/ghost";
import Reaper from "./enemies/reaper";
import Rock from "./enemies/rock";
import DoorWood from "./treasure/doorwood";
import Ghoul from "./enemies/ghoul";
import Angel from "./enemies/angel";
import Flask from "./treasure/flask";
import Tradecomp from "./treasure/tradecomp";
import Torchburn from "./treasure/torchburn";
import Walltorch from "./treasure/walltorch";

var cursors;
var faune;
var hit = 0;
var _health = 3;
var healthStateDead = "healthStateDead";
var idleHealthState = "idleHealthState";
var damageHealthState = "damageHealthState";
var healthState = idleHealthState;
var damageTime = 0;
var knives;
var coin = 0;
var wall_health = 4;
var keyCount = 0;
var keys;
var chainlink_count = 0;
var ghost_health = 4;
var angel_health = 5;
var tradecomp;

let speed = 150;

function bitTest(num, bit) {
  return (num & (1 << bit)) !== 0;
}

class MyGame extends Phaser.Scene {
  init({
    collectTreasures,
    collectedTreasures,
    tokenBalance,
    enqueueSnackbar,
    rewardNFT,
    closeSnackbar,
  }) {
    this.collectTreasures = collectTreasures;
    this.collectedTreasures = collectedTreasures;
    console.log("balance", tokenBalance);
    this.tokenBalance = tokenBalance;
    this.enqueueSnackbar = enqueueSnackbar;
    this.reward = rewardNFT;
    this.closeSnackbar = closeSnackbar;
  }

  preload() {
    this.load.image("tiles", logoImg2);
    this.load.image("tilesterrain", tilesetterain);
    this.load.image("tiledecor", tilesetdecor);
    this.load.image("tiledungon", tilesetdungon);
    this.load.image("tilecastle", tilsetcastle);
    this.load.image("tilsepillar", tilsetpillar);
    this.load.image("tilsetwalldecor", tilsetwalldecor);
    this.load.tilemapTiledJSON("dungeon", dungenMap);
    this.load.atlas("faune", heroPng, heroJson);
    this.load.atlas("lizard", lizardPng, lizardJson);
    this.load.atlas("treasure", chestPng, chestJson);
    this.load.atlas("coin", coinPng, coinJson);
    this.load.atlas("plantZombie", plantZombiePng, plantZombieJson);
    this.load.atlas("demon", demonPng, demonJson);
    this.load.atlas("Knight", knightPng, knightJson);
    this.load.atlas("newKnight", newKnightPng, newKnightJson);
    this.load.atlas("wizard", wizardPng, wizardJson);
    this.load.atlas("ghost", ghostPng, ghostJson);
    this.load.atlas("reaper", reaperPng, reaperJson);
    this.load.atlas("rock", rockPng, rockJson);
    this.load.atlas("ghoul", ghoulPng, ghoulJson);
    this.load.atlas("angel", angelPng, angelJson);
    this.load.atlas("torchburn", torchburnPng, torchburnJson);
    this.load.atlas("walltorch", walltorchPng, walltorchJson);
    this.load.atlas("door", doorPng, doorJson);
    this.load.atlas("spikes", spikesPng, spikesJson);
    this.load.atlas("wall", wallPng, wallJson);
    this.load.atlas("flamethrow", flamethrowPng, flamethrowJson);
    this.load.atlas("key", keyPng, keyJson);
    this.load.atlas("doorwood", doorwoodPng, doorwoodJSon);
    this.load.image("knife", weapon);
    this.load.atlas("tradecomp", tradecompPng, tradecompJson);
    this.load.atlas("flask", flaskPng, flaskJson);
    this.load.image("chainlink", chainlinkPng);
    this.load.audio("dungeonsound", dungeonsound);
    this.load.audio("femalefaint", femalefaint);
    this.load.audio("dooropen", dooropen);
    this.load.audio("knifesound", knifesound);
    this.load.audio("coinsound", coinsound);
    this.load.audio("femalehurt", femalehurt);
    this.load.audio("demonscreech", demonScream);
    this.load.audio("rockdie", rockdie);
    this.load.audio("youdied", youdied);
    this.load.audio("spiketrap", spiketrap);
    this.load.audio("ghoulsound", ghoulsound);
    this.load.audio("ghostsound", ghostsound);

    cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.scene.run("game-ui");
    this.scene.run("coins", { tokenBalance: this.tokenBalance });

    createCharacterAnims(this.anims);
    createLizardAnims(this.anims);
    createdZombieAnims(this.anims);
    createdemonAnims(this.anims);
    createKnightAnims(this.anims);
    createChestAnims(this.anims);
    createnewKnightAnims(this.anims);
    createdoorAnims(this.anims);
    createspikesAnims(this.anims);
    createwallAnims(this.anims);
    createflamethrowAnims(this.anims);
    createwizardAnims(this.anims);
    createkeyAnims(this.anims);
    createGhostAnims(this.anims);
    createReaperAnims(this.anims);
    createRockAnims(this.anims);
    createdoorwoodAnims(this.anims);
    createGhoulAnims(this.anims);
    createAngelAnims(this.anims);
    createflaskAnims(this.anims);
    createtradecompAnims(this.anims);
    createtorchburnAnims(this.anims);
    createWalltorchAnims(this.anims);

    const map = this.make.tilemap({ key: "dungeon" });
    const tileset = map.addTilesetImage("dungenTileset", "tiles");
    const tilesetterrain = map.addTilesetImage("tropical", "tilesterrain");
    const tilesetdecorr = map.addTilesetImage("decor", "tiledecor");
    const tilesetdungong = map.addTilesetImage("dungon", "tiledungon");
    const tilesetcastle = map.addTilesetImage("castle", "tilecastle");
    const tilesetpillar = map.addTilesetImage("pillar", "tilsepillar");
    const tilesetwalldecor = map.addTilesetImage(
      "walldecor",
      "tilsetwalldecor"
    );

    map.createLayer("Ground", [
      tileset,
      tilesetdungong,
      tilesetdecorr,
      tilesetterrain,
      tilesetpillar,
      tilesetcastle,
      tilesetwalldecor,
    ]);
    const wallsLayer = map.createLayer("Walls", [
      tileset,
      tilesetdungong,
      tilesetdecorr,
      tilesetterrain,
      tilesetpillar,
      tilesetcastle,
      tilesetwalldecor,
    ]);
    const SkeletonLayer = map.createLayer("Skeleton", [
      tileset,
      tilesetdungong,
      tilesetdecorr,
      tilesetterrain,
      tilesetpillar,
      tilesetcastle,
      tilesetwalldecor,
    ]);

    SkeletonLayer.setCollisionByProperty({ collides: true });
    wallsLayer.setCollisionByProperty({ collides: true });

    faune = this.physics.add.sprite(128, 128, "faune", "walk-down-3.png");
    faune.body.setSize(faune.width * 0.5, faune.height * 0.8);

    //tradecomp = this.physics.add.image(160,150,'tradecomp')

    // this.dungeonsound = this.sound.add('dungeonsound')
    // this.dungeonsound.play();

    const chainlinks = this.physics.add.group({
      classType: Chainlink,
      createCallback: (go) => {
        /* @type {demon} */
        const cht = go;
        cht.body.onCollide = true;
      },
    });
    chainlinks.get(1209, 622, "chainlink").setImmovable();

    let count = 0;

    const chests = this.physics.add.group({
      classType: Treasure,
      createCallback: (go) => {
        /* @type {demon} */
        const chest = go;
        count++;
        chest.id = count;
        if (bitTest(this.collectedTreasures, count)) {
          chest.anims.play("chest-empty-open");
        }
        chest.body.onCollide = true;
      },
    });
    chests.get(549, 325, "treasure").setImmovable();
    chests.get(30, 490, "treasure").setImmovable();
    chests.get(390, 980, "treasure").setImmovable();
    chests.get(650, 980, "treasure").setImmovable();
    chests.get(1515, 895, "treasure").setImmovable();
    chests.get(1481, 1401, "treasure").setImmovable();
    chests.get(930, 56, "treasure").setImmovable();
    chests.get(1010, 56, "treasure").setImmovable();

    const doors = this.physics.add.group({
      classType: doorz,
      createCallback: (go) => {
        /* @type {demon} */
        const doorh = go;
        doorh.body.onCollide = true;
      },
    });
    doors.get(520, 1088, "door").setImmovable();
    //doors.get(907, 1000, 'door').setImmovable();

    const flasks = this.physics.add.group({
      classType: Flask,
      createCallback: (go) => {
        /* @type {demon} */
        const dorh = go;
        dorh.body.onCollide = true;
      },
    });
    flasks.get(968, 56, "flask").setImmovable();
    //flasks.get(220, 256, 'flask').setImmovable();

    const torchburnn = this.physics.add.group({
      classType: Torchburn,
      createCallback: (go) => {
        /* @type {demon} */
        const orh = go;
        orh.body.onCollide = true;
      },
    });
    //flasks.get(968, 56, 'flask').setImmovable();
    torchburnn.get(500, 325, "torchburn").setImmovable();
    torchburnn.get(528, 300, "torchburn").setImmovable();
    torchburnn.get(1505, 81, "torchburn").setImmovable();

    const walltorchh = this.physics.add.group({
      classType: Walltorch,
      createCallback: (go) => {
        /* @type {demon} */
        const h = go;
        h.body.onCollide = true;
      },
    });
    //flasks.get(968, 56, 'flask').setImmovable();
    walltorchh.get(140, 24, "walltorch").setImmovable();
    walltorchh.get(455, 24, "walltorch").setImmovable();
    walltorchh.get(760, 24, "walltorch").setImmovable();
    walltorchh.get(296, 248, "walltorch").setImmovable();
    walltorchh.get(496, 248, "walltorch").setImmovable();
    walltorchh.get(148, 409, "walltorch").setImmovable();
    walltorchh.get(519, 409, "walltorch").setImmovable();
    walltorchh.get(790, 409, "walltorch").setImmovable();
    walltorchh.get(968, 21, "walltorch").setImmovable();
    walltorchh.get(1505, 21, "walltorch").setImmovable();
    walltorchh.get(750, 858, "walltorch").setImmovable();
    walltorchh.get(920, 858, "walltorch").setImmovable();
    walltorchh.get(605, 858, "walltorch").setImmovable();
    walltorchh.get(435, 858, "walltorch").setImmovable();
    walltorchh.get(168, 858, "walltorch").setImmovable();
    walltorchh.get(310, 858, "walltorch").setImmovable();
    //walltorchh.get(500, 325, 'walltorch').setImmovable();

    const tradecompp = this.physics.add.group({
      classType: Tradecomp,
      createCallback: (go) => {
        /* @type {demon} */
        const drh = go;
        drh.body.onCollide = true;
      },
    });
    //flasks.get(968, 56, 'flask').setImmovable();
    tradecompp.get(609, 730, "tradecomp").setImmovable();

    const doorwoods = this.physics.add.group({
      classType: DoorWood,
      createCallback: (go) => {
        /* @type {demon} */
        const doorh = go;
        doorh.body.onCollide = true;
      },
    });
    doorwoods.get(1209, 968, "doorwood").setImmovable();

    const spikess = this.physics.add.group({
      classType: Spike,
      createCallback: (go) => {
        /* @type {demon} */
        const spikeh = go;
        spikeh.body.onCollide = true;
      },
    });
    spikess.get(426, 275, "spikes").setImmovable();
    spikess.get(450, 275, "spikes").setImmovable();
    spikess.get(426, 386, "spikes").setImmovable();
    spikess.get(450, 386, "spikes").setImmovable();
    //left side flask room 1st row from down
    spikess.get(880, 248, "spikes").setImmovable();
    spikess.get(900, 248, "spikes").setImmovable();
    spikess.get(920, 248, "spikes").setImmovable();
    spikess.get(940, 248, "spikes").setImmovable();
    spikess.get(960, 248, "spikes").setImmovable();
    spikess.get(980, 248, "spikes").setImmovable();
    spikess.get(1000, 248, "spikes").setImmovable();
    spikess.get(1020, 248, "spikes").setImmovable();
    //left side 2nd row from bottom
    spikess.get(880, 116, "spikes").setImmovable();
    spikess.get(900, 116, "spikes").setImmovable();
    spikess.get(920, 116, "spikes").setImmovable();
    spikess.get(940, 116, "spikes").setImmovable();
    spikess.get(960, 116, "spikes").setImmovable();
    spikess.get(980, 116, "spikes").setImmovable();
    spikess.get(1000, 116, "spikes").setImmovable();
    //right side flask room 1st row from down
    spikess.get(935, 181, "spikes").setImmovable();
    spikess.get(955, 181, "spikes").setImmovable();
    spikess.get(975, 181, "spikes").setImmovable();
    spikess.get(995, 181, "spikes").setImmovable();
    spikess.get(1015, 181, "spikes").setImmovable();
    spikess.get(1035, 181, "spikes").setImmovable();
    spikess.get(1055, 181, "spikes").setImmovable();
    //spikess.get(1050, 160, 'spikes').setImmovable();

    const wallss = this.physics.add.group({
      classType: Wall,
      createCallback: (go) => {
        /* @type {demon} */
        const wallh = go;
        wallh.body.onCollide = true;
      },
    });
    wallss.get(1496, 297, "wall").setImmovable();
    wallss.get(1510, 297, "wall").setImmovable();
    wallss.get(1526, 297, "wall").setImmovable();

    const wizards = this.physics.add.group({
      classType: Wizard,
      createCallback: (go) => {
        /* @type {demon} */
        const wizardh = go;
        wizardh.body.onCollide = true;
      },
    });
    wizards.get(1503, 52, "wizard").setImmovable();

    keys = this.physics.add.group({
      classType: Key,
      createCallback: (go) => {
        /* @type {demon} */
        const keyh = go;
        keyh.body.onCollide = true;
      },
    });
    //wallss.get(817, 153, 'wall').setImmovable();

    const flamethrows = this.physics.add.group({
      classType: flamethrowz,
      createCallback: (go) => {
        /* @type {demon} */
        const flamethrowh = go;
        flamethrowh.body.onCollide = true;
      },
    });
    flamethrows.get(100, 30, "flamethrow").setImmovable();

    //lizard = this.physics.add.sprite(256, 256, 'lizard', 'lizard_m_idle_anim_f0.png')
    knives = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
    });
    //console.log(knives);

    const lizards = this.physics.add.group({
      classType: Lizard,
      createCallback: (go) => {
        /* @type {Lizard} */
        const LizGo = go;
        LizGo.body.onCollide = true;
      },
    });
    lizards.get(256, 256, "lizard");

    const newKnights = this.physics.add.group({
      classType: newKnightz,
      createCallback: (go) => {
        /* @type {Lizard} */
        const knighh = go;
        knighh.body.onCollide = true;
      },
    });
    newKnights.get(550, 259, "newKnight");
    newKnights.get(130, 490, "newKnights");
    newKnights.get(1100, 270, "newKnights");

    const plantZombie = this.physics.add.group({
      classType: plantZombies,
      createCallback: (go) => {
        /* @type {plantZombie} */
        const zombiego = go;
        zombiego.body.onCollide = true;
      },
    });
    plantZombie.get(406, 256, "plantZombie");
    plantZombie.get(1205, 1195, "plantZombie");

    const demon = this.physics.add.group({
      classType: demonq,
      createCallback: (go) => {
        /* @type {demon} */
        const demn = go;
        demn.body.onCollide = true;
      },
    });
    demon.get(220, 260, "demon");
    demon.get(1100, 270, "demon");
    demon.get(500, 470, "demon");

    const angell = this.physics.add.group({
      classType: Angel,
      createCallback: (go) => {
        /* @type {demon} */
        const angn = go;
        angn.body.onCollide = true;
      },
    });
    angell.get(1115, 1105, "angel");

    const ghostt = this.physics.add.group({
      classType: Ghost,
      createCallback: (go) => {
        /* @type {demon} */
        const ghmn = go;
        ghmn.body.onCollide = true;
      },
    });
    //ghostt.get(220, 260, 'ghost')
    ghostt.get(520, 900, "ghost");

    const ghoult = this.physics.add.group({
      classType: Ghoul,
      createCallback: (go) => {
        /* @type {demon} */
        const ghoun = go;
        ghoun.body.onCollide = true;
      },
    });
    ghoult.get(630, 260, "ghoul");
    ghoult.get(1215, 1095, "ghoul");

    const rockk = this.physics.add.group({
      classType: Rock,
      createCallback: (go) => {
        /* @type {demon} */
        const rockmn = go;
        rockmn.body.onCollide = true;
      },
    });
    rockk.get(690, 360, "rock");
    rockk.get(1515, 595, "rock");
    rockk.get(1215, 1190, "rock");

    const reaperr = this.physics.add.group({
      classType: Reaper,
      createCallback: (go) => {
        /* @type {demon} */
        const rhmn = go;
        rhmn.body.onCollide = true;
      },
    });
    reaperr.get(620, 260, "reaper");
    reaperr.get(320, 460, "reaper");
    reaperr.get(1515, 695, "reaper");

    const Knight = this.physics.add.group({
      classType: Knightz,
      createCallback: (go) => {
        /* @type {Knitghtz} */
        const knigh = go;
        knigh.body.onCollide = true;
      },
    });
    Knight.get(220, 260, "Knight");
    Knight.get(130, 490, "Knight");
    Knight.get(1100, 270, "Knight");
    Knight.get(1515, 900, "Knight");

    this.physics.world.setBounds(0, 0, 2000, 2000);
    this.cameras.main.setBounds(0, 0, 2000, 2000);
    this.cameras.main.startFollow(faune, true, 0.5, 0.5);

    this.physics.add.collider(faune, wallsLayer);
    this.physics.add.collider(lizards, wallsLayer);
    this.physics.add.collider(knives, wallsLayer);
    //this.physics.add.collider(knives, wallcollapse)
    this.physics.add.collider(plantZombie, wallsLayer);
    this.physics.add.collider(plantZombie, demon);
    this.physics.add.collider(plantZombie, lizards);
    this.physics.add.collider(demon, wallsLayer);
    this.physics.add.collider(ghostt, wallsLayer);
    this.physics.add.collider(reaperr, wallsLayer);
    this.physics.add.collider(rockk, wallsLayer);
    this.physics.add.collider(demon, lizards);
    this.physics.add.collider(demon, plantZombie);
    this.physics.add.collider(newKnights, wallsLayer);
    this.physics.add.collider(newKnights, lizards);
    this.physics.add.collider(newKnights, plantZombie);
    //this.physics.add.collider(newKnights, faune)
    this.physics.add.collider(Knight, wallsLayer);
    this.physics.add.collider(Knight, plantZombie);
    this.physics.add.collider(Knight, demon);
    this.physics.add.collider(Knight, lizards);
    this.physics.add.collider(chests, lizards);
    this.physics.add.collider(chests, demon);
    this.physics.add.collider(chests, Knight);
    this.physics.add.collider(chests, plantZombie);
    this.physics.add.collider(wallss, faune);
    this.physics.add.collider(ghoult, wallsLayer);
    this.physics.add.collider(ghoult, demon);
    this.physics.add.collider(ghoult, Knight);
    this.physics.add.collider(ghoult, newKnights);
    this.physics.add.collider(ghoult, lizards);
    this.physics.add.collider(ghoult, plantZombie);
    this.physics.add.collider(ghoult, doorwoods);
    this.physics.add.collider(ghostt, doorwoods);
    this.physics.add.collider(ghostt, wallsLayer);
    this.physics.add.collider(angell, doorwoods);
    this.physics.add.collider(angell, ghostt);
    this.physics.add.collider(angell, wallsLayer);
    //this.physics.add.collider(doors, faune)

    //this.physics.add.collider(chests, faune)

    this.physics.add.collider(
      knives,
      lizards,
      this.handleKnifeLizardCollision,
      undefined,
      this
    );
    this.physics.add.collider(
      knives,
      demon,
      this.handleKnifeDemonCollision,
      undefined,
      this
    );
    this.physics.add.collider(
      knives,
      Knight,
      this.handleKnifeKnightCollision,
      undefined,
      this
    );
    this.physics.add.collider(
      knives,
      plantZombie,
      this.handleKnifeLizardCollision,
      undefined,
      this
    );
    this.physics.add.collider(
      knives,
      newKnights,
      this.handleKnifeLizardCollision,
      undefined,
      this
    );
    this.physics.add.collider(
      knives,
      wallsLayer,
      this.handleKnifewallsCollision,
      undefined,
      this
    );
    //this.physics.add.collider(knives, ghostt, this.handleKnifeLizardCollision, undefined, this)
    this.physics.add.collider(
      knives,
      reaperr,
      this.handleKnifeLizardCollision,
      undefined,
      this
    );
    this.physics.add.collider(
      knives,
      rockk,
      this.handleknifeRockcollide,
      undefined,
      this
    );
    this.physics.add.collider(
      knives,
      ghoult,
      this.handleKnifeghoulCollision,
      undefined,
      this
    );
    this.physics.add.collider(
      wallsLayer,
      knives,
      this.handleKnifewallsCollision,
      undefined,
      this
    );

    this.physics.add.collider(
      lizards,
      faune,
      this.handlePlayerLizardCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      plantZombie,
      faune,
      this.handlePlayerPlantZombieCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      demon,
      faune,
      this.handlePlayerdemonCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      Knight,
      faune,
      this.handlePlayerKnightCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      newKnights,
      faune,
      this.handlePlayernewKnightCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      spikess,
      faune,
      this.handlePlayerSpikeCollide,
      undefined,
      this
    );

    this.physics.add.collider(
      faune,
      chests,
      this.handlePlayerTreasureCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      doors,
      this.handlePlayerDoorCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      knives,
      wallss,
      this.handleknifewallCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      flamethrows,
      this.handlePlayerflamethrowCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      wizards,
      this.handlePlayerWizardCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      keys,
      this.handlePlayerKeyCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      chainlinks,
      this.handleplayerchainlinkcollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      ghostt,
      this.handlePlayerghostCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      reaperr,
      this.handlePlayerreaperCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      rockk,
      this.handlePlayerRockCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      doorwoods,
      this.handlePlayerDoorwoodCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      knives,
      ghostt,
      this.handleknifeghostcollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      ghoult,
      this.handlePlayerGhoulCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      knives,
      angell,
      this.handleknifeangelcollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      angell,
      this.handlePlayerangelCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      flasks,
      this.handleplayerflaskcollide,
      undefined,
      this
    );
    this.physics.add.collider(
      faune,
      tradecomp,
      this.handleplayertradecompcollide,
      undefined,
      this
    );
    //lizards.setVelocity(faune.x, faune.y)
  }

  throwKnife() {
    //console.log('throw');

    if (faune.anims.currentAnim) {
      const parts = faune.anims.currentAnim.key.split("-");
      const direction = parts[2];
      //console.log(parts)

      const vec = new Phaser.Math.Vector2(0, 0);

      switch (direction) {
        case "up":
          vec.y = -1;
          break;

        case "down":
          vec.y = 1;
          break;

        default:
        case "side":
          //console.log(faune.scaleX);
          if (faune.scaleX < 0) {
            vec.x = -1;
          } else {
            vec.x = 1;
          }
          break;
      }

      const angle = vec.angle();
      //console.log(knives);
      if (knives) {
        this.knifesound = this.sound.add("knifesound");
        this.knifesound.play();

        const k = knives.get(faune.x, faune.y, "knife");
        k.setRotation(angle);
        k.setVelocity(vec.x * 300, vec.y * 300);
      }
    }
  }

  handleplayertradecompcollide(obj1, obj2) {
    console.log("trade");
  }

  handleKnifewallsCollision(obj1, obj2) {
    console.log(obj1);
    obj1.destroy();
  }

  handleKnifeLizardCollision(obj1, obj2) {
    obj2.destroy();
    obj1.destroy();
  }

  handleknifeRockcollide(obj1, obj2) {
    obj2.destroy();
    obj1.destroy();

    this.rockdie = this.sound.add("rockdie");
    this.rockdie.play();
  }

  handleKnifeDemonCollision(obj1, obj2) {
    obj2.destroy();
    obj1.destroy();
    this.demonScream = this.sound.add("demonscreech");
    this.demonScream.play();
  }

  handleKnifeghoulCollision(obj1, obj2) {
    obj2.destroy();
    obj1.destroy();
    this.ghoulsound = this.sound.add("ghoulsound");
    this.ghoulsound.play();
  }

  handleKnifeKnightCollision(obj1, obj2) {
    obj1.destroy();
    obj2.destroy();
  }

  // TODO duplicate need to check
  // handlePlayerLizardCollide(obj1, obj2) {
  //   const lizardObj = obj2;

  //   const dx = faune.x - lizardObj.x;
  //   const dy = faune.y - lizardObj.y;
  //   const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(200);

  //   this.handleDamage(dir);

  //   hit = 1;
  //   healthState = damageHealthState;

  //   sceneEvents.emit("player-healt-changed", _health);
  // }

  handleknifeghostcollide(obj1, obj2) {
    obj1.destroy();

    ghost_health--;

    if (ghost_health === 4) {
      console.log("hit1", ghost_health);
    }

    if (ghost_health === 3) {
      console.log("hit2", ghost_health);
    }

    if (ghost_health === 2) {
      console.log("hit3", ghost_health);
    }

    if (ghost_health === 1) {
      console.log("hit3", ghost_health);
    }

    if (ghost_health === 0) {
      this.ghostsound = this.sound.add("ghostsound");
      this.ghostsound.play();
      obj2.destroy();
      //keys.get(obj2.x + 18, obj2.y + 18, 'key').setImmovable();
    }
    //obj2.destroy()
  }

  handleknifeangelcollide(obj1, obj2) {
    obj1.destroy();

    angel_health--;

    if (angel_health === 5) {
      console.log("hit1", angel_health);
    }

    if (angel_health === 4) {
      console.log("hit1", angel_health);
    }

    if (angel_health === 3) {
      console.log("hit2", angel_health);
    }

    if (angel_health === 2) {
      console.log("hit3", angel_health);
    }

    if (angel_health === 1) {
      console.log("hit3", angel_health);
    }

    if (angel_health === 0) {
      obj2.destroy();
      this.ghostsound = this.sound.add("ghostsound");
      this.ghostsound.play();
      keys.get(obj2.x + 18, obj2.y + 18, "key").setImmovable();
      //keyCount = keyCount + 1
    }
  }

  handlePlayerTreasureCollide(obj1, obj2) {
    this.coinsound = this.sound.add("coinsound");
    this.coinsound.setRate(1.2);
    //rate = coinsound.rate
    this.coinsound.play();

    if (obj2.anims.currentAnim.key !== "chest-empty-open") {
      console.log(obj2);
      this.tokenBalance = this.tokenBalance + 20;
      this.mintReward(obj2.id);
      console.log("coinCOunt", this.tokenBalance);
      sceneEvents.emit("player-coin-mint", this.tokenBalance);
      obj2.anims.play("chest-empty-open");
    } else if (bitTest(this.collectedTreasures, obj2.id)) {
      this.enqueueSnackbar("Treasure already collected", {
        preventDuplicate: true,
      });
    }
  }

  handlePlayerKeyCollide(obj1, obj2) {
    if (keyCount === 0) {
      keyCount = keyCount + 1;

      console.log("keyCOunt", keyCount);
      sceneEvents.emit("player-key-mint", keyCount);
      //obj2.destroy()

      //obj2.anims.play('key-idle')
    }
    if (keyCount === 1) {
      //keyCount = keyCount + 1
      obj2.destroy();
    }
  }

  handleplayerchainlinkcollide(obj1, obj2) {
    if (chainlink_count === 0) {
      chainlink_count = chainlink_count + 1;
      this.rewardNFT();
      //obj2.destroy()
      console.log("keyCOunt", chainlink_count);
      sceneEvents.emit("player-chainlink-mint", chainlink_count);
      //obj2.anims.play('key-idle')
    }
    if (chainlink_count === 1) {
      obj2.destroy();
    }
  }

  handlePlayerWizardCollide(obj1, obj2) {
    console.log("chest");
    if (obj2.anims.currentAnim.key === "wizard-idle") {
      console.log("ture");
      obj2.anims.play("wizard-idle");
      keys.get(obj2.x + 18, obj2.y + 18, "key").setImmovable();

      //this.physics.add.sprite(840,100, 'key')
    }
  }

  handlePlayerDoorCollide(obj1, obj2) {
    console.log("key", keyCount);
    if (keyCount === 0) {
      this.enqueueSnackbar("FIND KEY!!", {
        preventDuplicate: true,
      });
      obj2.anims.play("door-closed");
    }
    if (keyCount === 1) {
      this.dooropen = this.sound.add("dooropen");
      this.dooropen.play();

      obj2.anims.play("door-open");
      console.log("keycollide", keyCount);

      keyCount--;

      console.log("keyminus", keyCount);
      sceneEvents.emit("player-key-mint", keyCount);

      obj2.body.enable = false;
    }
  }

  handlePlayerDoorwoodCollide(obj1, obj2) {
    console.log("key", keyCount);
    if (keyCount === 0) {
      this.enqueueSnackbar("FIND KEY!!", {
        preventDuplicate: true,
      });
      obj2.anims.play("doorwood-closed");
    }
    if (keyCount === 1) {
      this.dooropen = this.sound.add("dooropen");
      this.dooropen.play();

      obj2.anims.play("doorwood-full-open");
      console.log("keycollide", keyCount);

      keyCount--;

      console.log("keyminus", keyCount);
      sceneEvents.emit("player-key-mint", keyCount);

      obj2.body.enable = false;
    }
  }

  handleknifewallCollide(obj1, obj2) {
    obj1.destroy();
    wall_health--;

    if (wall_health === 4) {
      console.log("wall", wall_health);
    }

    if (wall_health === 3) {
      // wall_health--
      console.log("wallj", wall_health);
      obj2.anims.play("wall-crack");
    }

    if (wall_health === 2) {
      // wall_health--
      console.log("wallh", wall_health);
      obj2.anims.play("wall-crackkk");
    }

    if (wall_health === 1) {
      // wall_health--
      console.log("wallh", wall_health);
      obj2.anims.play("wall-end");
    }

    if (wall_health === 0) {
      wall_health = 3;
      obj2.destroy();
    }
  }

  handlePlayerLizardCollide(obj1, obj2) {
    const lizardObj = obj2;

    const dx = faune.x - lizardObj.x;
    const dy = faune.y - lizardObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(200);

    this.handleDamage(dir);

    hit = 1;
    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);
  }

  handleDamage(dir) {
    if (healthState === "damageHealthState") {
      return;
    }

    faune.setVelocity(dir.x, dir.y);
    faune.setTint(0xff0000);

    _health = _health - 1;

    console.log(_health);

    if (_health <= 0) {
      healthState = healthStateDead;

      this.femalefaint = this.sound.add("femalefaint");
      this.femalefaint.play();

      this.youdied = this.sound.add("youdied");
      this.youdied.play();
      faune.anims.play("faune-faint", true);
    }
  }

  handlePlayerPlantZombieCollide(obj1, obj2) {
    const plantZombieObj = obj2;

    const dx = faune.x - plantZombieObj.x;
    const dy = faune.y - plantZombieObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(250);

    this.handleDamage(dir);

    hit = 1;
    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);

    faune.setVelocity(dir.y, dir.x);
    faune.setTint(0xff0000);
  }

  handlePlayerdemonCollide(obj1, obj2) {
    const demonObj = obj2;

    const dx = faune.x - demonObj.x;
    const dy = faune.y - demonObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(250);

    this.handleDamage(dir);
    hit = 1;
    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);

    faune.setVelocity(dir.y, dir.x);
    faune.setTint(0xff0000);
  }

  handlePlayerreaperCollide(obj1, obj2) {
    const reaperObj = obj2;

    const dx = faune.x - reaperObj.x;
    const dy = faune.y - reaperObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(250);

    this.handleDamage(dir);
    hit = 1;
    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);

    faune.setVelocity(dir.y, dir.x);
    faune.setTint(0xff0000);
  }

  handlePlayerangelCollide(obj1, obj2) {
    const reaperObj = obj2;

    const dx = faune.x - reaperObj.x;
    const dy = faune.y - reaperObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(250);

    this.handleDamage(dir);
    hit = 1;
    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);

    faune.setVelocity(dir.y, dir.x);
    faune.setTint(0xff0000);
  }

  handlePlayerRockCollide(obj1, obj2) {
    const rockObj = obj2;

    const dx = faune.x - rockObj.x;
    const dy = faune.y - rockObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(250);

    this.handleDamage(dir);
    hit = 1;
    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);

    faune.setVelocity(dir.y, dir.x);
    faune.setTint(0xff0000);
  }

  handlePlayerKnightCollide(obj1, obj2) {
    const KnightObj = obj2;

    const dx = faune.x - KnightObj.x;
    const dy = faune.y - KnightObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(200);

    this.handleDamage(dir);

    hit = 1;
    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);

    faune.setVelocity(dir.y, dir.x);
    faune.setTint(0xff0000);
  }

  handlePlayerghostCollide(obj1, obj2) {
    const ghostObj = obj2;

    const dx = faune.x - ghostObj.x;
    const dy = faune.y - ghostObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(200);

    this.handleDamage(dir);

    hit = 1;
    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);

    faune.setVelocity(dir.y, dir.x);
    faune.setTint(0xff0000);
  }

  handlePlayerGhoulCollide(obj1, obj2) {
    const ghoulObj = obj2;

    const dx = faune.x - ghoulObj.x;
    const dy = faune.y - ghoulObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(200);

    this.handleDamage(dir);

    hit = 1;
    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);

    faune.setVelocity(dir.y, dir.x);
    faune.setTint(0xff0000);
  }

  handlePlayernewKnightCollide(obj1, obj2) {
    const newKnightObj = obj2;

    const dx = faune.x - newKnightObj.x;
    const dy = faune.y - newKnightObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(200);

    this.handleDamage(dir);

    hit = 1;
    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);

    faune.setVelocity(dir.y, dir.x);
    faune.setTint(0xff0000);
  }

  handlePlayerSpikeCollide(obj1, obj2) {
    const SpikeObj = obj2;

    const dx = faune.x - SpikeObj.x;
    const dy = faune.y - SpikeObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(200);

    this.handleDamage(dir);

    hit = 1;

    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);

    faune.setVelocity(dir.y, dir.x);
    faune.setTint(0xff0000);

    this.spiketrap = this.sound.add("spiketrap");
    this.spiketrap.play();
  }

  handlePlayerflamethrowCollide(obj1, obj2) {
    const SpikeObj = obj2;

    const dx = faune.x - SpikeObj.x;
    const dy = faune.y - SpikeObj.y;
    const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(200);

    this.handleDamage(dir);

    hit = 1;
    healthState = damageHealthState;

    this.femalehurt = this.sound.add("femalehurt");
    this.femalehurt.play();

    sceneEvents.emit("player-healt-changed", _health);

    faune.setVelocity(dir.y, dir.x);
    faune.setTint(0xff0000);
  }

  handleplayerflaskcollide(obj1, obj2) {
    speed = 280;
    obj2.destroy();
  }

  preUpdate(dt) {
    switch (healthState) {
      case idleHealthState:
        break;

      case damageHealthState:
        damageTime += dt;
        if (this.damageTime >= 250) {
          healthState = idleHealthState;
          faune.setTint(0xffffff);
          damageTime = 0;
        }
        break;
      default:
        break;
    }
  }

  getHealth() {
    return _health;
  }

  update(t, dt) {
    if (_health <= 0) {
      faune.setVelocity(0, 0);
      //console.log('player dead');
    } else {
    }

    if (hit > 0) {
      ++hit;
      if (hit > 10) {
        hit = 0;
      }
      return;
    }

    if (!cursors || !faune) {
      //console.log('empty');
    }
    healthState = idleHealthState;
    faune.setTint();

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      this.throwKnife();
      return;
    }

    if (_health > 0) {
      if (cursors.left?.isDown) {
        faune.anims.play("faune-run-side", true);
        faune.setVelocity(-speed, 0);

        faune.scaleX = -1;
        faune.body.offset.x = 24;
      } else if (cursors.right?.isDown) {
        faune.anims.play("faune-run-side", true);
        faune.setVelocity(speed, 0);

        faune.scaleX = 1;
        faune.body.offset.x = 8;
      } else if (cursors.up?.isDown) {
        faune.anims.play("faune-run-up", true);
        faune.setVelocity(0, -speed);
      } else if (cursors.down?.isDown) {
        faune.anims.play("faune-run-down", true);
        faune.setVelocity(0, speed);
      } else {
        //const parts = this.anims.currentAnim.split('-')
        // faune.anims.play('faune-idel-down', true)
        faune.setVelocity(0, 0);
      }
    }
  }

  async mintReward(id) {
    this.enqueueSnackbar("Treasure collected! Adding tokens to your wallet", {
      variant: "success",
      preventDuplicate: true,
      persist: true,
    });
    await this.collectTreasures(id);
    this.closeSnackbar("Treasure collected! Adding tokens to your wallet");
    this.enqueueSnackbar("Token added to your wallet", {
      preventDuplicate: true,
      variant: "success",
    });
  }

  async rewardNFT() {
    this.enqueueSnackbar("Congratulation! Adding NFT to your wallet", {
      variant: "success",
      preventDuplicate: true,
      persist: true,
    });
    await this.reward();
    this.closeSnackbar("Congratulation! Adding NFT to your wallet");
    this.enqueueSnackbar("Success! NFT is added to your wallet", {
      preventDuplicate: true,
      variant: "success",
    });
  }
}

export const config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  width: 800,
  height: 330,
  scale: {
    zoom: 2,
  },
};

export default MyGame;
