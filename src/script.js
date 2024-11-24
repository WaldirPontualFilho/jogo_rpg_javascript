let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["porrete"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: "porrete", power: 5 },
  { name: "adaga", power: 30 },
  { name: "martelo", power: 50 },
  { name: "espada", power: 100 },
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fera dentada",
    level: 8,
    health: 60,
  },
  {
    name: "dragão",
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: "praça central",
    "button text": [
      "Ir para a loja",
      "Ir para a caverna",
      "Lutar contra o dragão",
    ],
    "button functions": [goStore, goCave, fightDragon],
    text: 'Você está na praça central. Você vê uma placa que diz "Loja".',
  },
  {
    name: "loja",
    "button text": [
      "Comprar 10 de vida (10 ouro)",
      "Comprar arma (30 ouro)",
      "Voltar para a praça central",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Você entra na loja.",
  },
  {
    name: "caverna",
    "button text": [
      "Lutar contra slime",
      "Lutar contra fera dentada",
      "Voltar para a praça central",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Você entra na caverna. Você vê alguns monstros.",
  },
  {
    name: "luta",
    "button text": ["Atacar", "Esquivar", "Fugir"],
    "button functions": [attack, dodge, goTown],
    text: "Você está lutando contra um monstro.",
  },
  {
    name: "matar monstro",
    "button text": [
      "Voltar para a praça central",
      "Voltar para a praça central",
      "Voltar para a praça central",
    ],
    "button functions": [goTown, goTown, goTown],
    text: 'O monstro grita "Arg!" enquanto morre. Você ganha pontos de experiência e encontra ouro.',
  },
  {
    name: "perder",
    "button text": ["JOGAR NOVAMENTE?", "JOGAR NOVAMENTE?", "JOGAR NOVAMENTE?"],
    "button functions": [restart, restart, restart],
    text: "Você morreu. &#x2620;",
  },
  {
    name: "vencer",
    "button text": ["JOGAR NOVAMENTE?", "JOGAR NOVAMENTE?", "JOGAR NOVAMENTE?"],
    "button functions": [restart, restart, restart],
    text: "Você derrotou o dragão! VOCÊ GANHOU O JOGO! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Voltar para a praça central?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Você encontrou um jogo secreto. Escolha um número acima. Dez números serão sorteados entre 0 e 10. Se o número que você escolheu for sorteado, você ganha!",
  },
];

// Inicializar botões
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Você não tem ouro suficiente para comprar vida.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Agora você tem uma " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " Em seu inventário, você tem: " + inventory;
    } else {
      text.innerText = "Você não tem ouro suficiente para comprar uma arma.";
    }
  } else {
    text.innerText = "Você já tem a arma mais poderosa!";
    button2.innerText = "Vender arma por 15 ouro";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Você vendeu uma " + currentWeapon + ".";
    text.innerText += " Em seu inventário, você tem: " + inventory;
  } else {
    text.innerText = "Não venda sua única arma!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "O " + monsters[fighting].name + " ataca.";
  text.innerText +=
    " Você o ataca com sua " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " Você errou.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Sua " + inventory.pop() + " quebrou.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText =
    "Você se esquivou do ataque do " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["porrete"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText =
    "Você escolheu " + guess + ". Aqui estão os números sorteados:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Parabéns! Você ganhou 20 de ouro!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Que pena! Você não ganhou.";
  }
}
