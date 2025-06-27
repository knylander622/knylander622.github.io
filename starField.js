//Create background canvas
const canvas = document.getElementById("starCanvas");
const con = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Check for changes in window size
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
});

const stars = [];
const starCount = 375;

function initStars() {
  stars.length = 0;
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random(),
      delta: Math.random() * 0.02 + 0.005
    });
  }
}
initStars();

function animateStars() {
  con.clearRect(0, 0, canvas.width, canvas.height);

  for (const s of stars) {
    s.alpha += s.delta;
    if (s.alpha <= 0 || s.alpha >= 1) s.delta *= -1;

    con.beginPath();
    con.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    con.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
    con.fill();
  }

  requestAnimationFrame(animateStars);
}

animateStars();
