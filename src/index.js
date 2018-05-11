require("./style.scss");
import Switch from "./switch/switch.js";

// random int gen helper fn
const random = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);

// log positions for collision
const positions = [];

const createSwitch = (collide) => {
  const x = random(90, window.innerWidth - 140);
  const y = random(90, window.innerHeight - 140);
  let collision = false;
  // console.log(positions)
  positions.forEach(el => {
    // if ((el.x < x && el.x + 180 > x) && (el.y < y && el.y + 180 > y) &&
    //     (el.x > x && el.x - 180 < x) && (el.y > y && el.y - 180 < y))
       if ((el.x < x + 100) && (el.x + 100 > x) && (el.y < y + 100) && (el.y + 100 > y))
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
  const s = new Switch(checkbox, x, y);
  s.el.addEventListener(`click`, e => {
    e.preventDefault();
    s.toggle();
  });
  setInterval(() => s.toggle(), random(2000, 10000));
};

const createSwitches = (amt, collision) => {
  for (var i = 0; i < amt; i++) {
    createSwitch(collision);
  }
};

createSwitches(100, true);
