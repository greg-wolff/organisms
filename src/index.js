require("./style.scss");
import Switch from "./switch/switch.js";
const uuidv4 = require('uuid/v4');

// random int gen helper fn
const random = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);

// log positions for collision
const positions = [];

const behavior = (s) => {
  if (s.mood) {
    clearInterval(s.mood)
    s.mood = null;
  }
  const state = random(0,50);
  if (state < 33) s.mood = setInterval(() => s.switch.toggle(), random(10000, 20000))
  else if (state < 49) s.mood = setInterval(() => s.switch.toggle(), random(5000, 10000))
  else s.mood = setInterval(() => s.switch.toggle(), random(500, 1500))
}

const createSwitch = (collide) => {
  const x = random(90, window.innerWidth - 140);
  const y = random(90, window.innerHeight - 140);
  let collision = false;
  // console.log(positions)
  positions.forEach(el => {
    if ((el.x < x + 40) && (el.x + 40 > x) && (el.y < y + 35) && (el.y + 35 > y))
      collision = true;
  });
  if (collision && !collide) return;
  positions.push({ "x": x, "y": y });
  const checkbox = Object.assign(
    document.body.appendChild(document.createElement(`input`)),
    {
      name: `switch`,
      type: `checkbox`
    }
  );
  const s = Object.assign({
    "switch": new Switch(checkbox, x, y)
  })
  s.switch.el.addEventListener(`click`, e => {
    e.preventDefault();
    s.switch.toggle();
  });
  behavior(s)
  setInterval(() => behavior(s), random(10000, 20000));
};

const createSwitches = (amt, collide) => {
  if (collide)
    for (var i = 0; i < amt; i++) createSwitch(true);
  else {
    let last = null;
    let curr = 0;
    const timeout = 3000;
    while (positions.length < amt && curr < timeout) {
        if (positions.length == last) curr++;
        createSwitch(false);
        last = positions.length;
        console.log(positions.length);
      }
  }
};

createSwitches(125, false);
