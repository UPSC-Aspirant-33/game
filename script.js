const game = document.getElementById("game");
const pointsEl = document.getElementById("points");
let points = 0;

/* ADD POINTS */
function addPoints(p) {
  points += p;
  pointsEl.innerText = points;
}

/* CLEAR GAME */
function clearGame() {
  game.innerHTML = "";
  document.onkeydown = null;
}

/* ESCAPE GAME (+1 ON CLICK ONLY) */
function escapeGame() {
  clearGame();
  const e = document.createElement("div");
  e.className = "escape";
  e.innerText = "😊";
  game.appendChild(e);
  moveEscape(e);

  e.onmouseover = () => moveEscape(e);
  e.onclick = () => {
    addPoints(1);
    moveEscape(e);
  };
}

function moveEscape(el) {
  el.style.left = Math.random() * (game.clientWidth - 140) + "px";
  el.style.top = Math.random() * (game.clientHeight - 80) + "px";
}

/* MEMORY GAME (+5 PER PAIR) */
function memoryGame() {
  clearGame();
  const symbols = ["🌸","🌸","🌿","🌿","⭐","⭐","🍀","🍀"];
  symbols.sort(() => Math.random() - 0.5);

  const grid = document.createElement("div");
  grid.className = "grid";
  game.appendChild(grid);

  let first = null, lock = false;

  symbols.forEach(sym => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerText = "❓";
    card.dataset.sym = sym;

    card.onclick = () => {
      if (lock || card.innerText !== "❓") return;
      card.innerText = sym;

      if (!first) {
        first = card;
      } else {
        lock = true;
        if (first.dataset.sym === sym) {
          addPoints(5);
          first = null;
          lock = false;
        } else {
          setTimeout(() => {
            first.innerText = "❓";
            card.innerText = "❓";
            first = null;
            lock = false;
          }, 900);
        }
      }
    };
    grid.appendChild(card);
  });
}

/* BUBBLE GAME (+2 + NEGATIVE WORD BLAST) */
function bubbleGame() {
  clearGame();
  let bubbles = [];
  const negativeWords = ["Stress","Fear","Doubt","Anxiety","Pressure","Overthinking"];

  document.onkeydown = e => {
    const key = e.key.toUpperCase();
    const b = bubbles.find(x => x.innerText === key);
    if (b) {
      addPoints(2);

      const neg = document.createElement("div");
      neg.className = "negative";
      neg.innerText = negativeWords[Math.floor(Math.random() * negativeWords.length)];
      neg.style.left = b.style.left;
      neg.style.top = b.style.top;
      game.appendChild(neg);
      setTimeout(() => neg.remove(), 1500);

      b.remove();
      bubbles = bubbles.filter(x => x !== b);
    }
  };

  setInterval(() => {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerText = letter;
    bubble.style.left = Math.random() * (game.clientWidth - 70) + "px";
    game.appendChild(bubble);
    bubbles.push(bubble);

    setTimeout(() => {
      bubble.remove();
      bubbles = bubbles.filter(x => x !== bubble);
    }, 7000);
  }, 1300);
}

/* 🎁 LUCKY SUPPORT */
function checkLucky() {
  clearGame();
  const msg = document.createElement("div");
  msg.className = "lucky";

  if (points < 10)
    msg.innerText = "🌱 Every small step counts.\nI’m proud of you.";
  else if (points < 75)
    msg.innerText = "🌼 You are doing better than you think.";
  else if (points < 150)
    msg.innerText = "🌸 Your consistency is beautiful.";
  else
    msg.innerText = "🌟 You have the heart of an IAS officer.";

  game.appendChild(msg);
}
