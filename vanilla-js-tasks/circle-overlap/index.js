const container = document.getElementById("container");
const axis = [];

container.addEventListener("click", function (event) {
  const x = event.clientX;
  const y = event.clientY;
  const newCircle = document.createElement("div");
  newCircle.classList.add("circle");

  const radius = 50;
  const top = y - radius;
  const bottom = y + radius;
  const left = x - radius;
  const right = x + radius;

  newCircle.style.top = top + "px";
  newCircle.style.left = left + "px";

  let isOverlapping = false;
  for (let { t, b, l, r } of axis) {
    if (!(right < l || left > r || bottom < t || top > b)) {
      isOverlapping = true;
      break;
    }
  }

  if (isOverlapping) {
    newCircle.classList.add("red");
  }

  axis.push({ t: top, b: bottom, l: left, r: right });

  container.appendChild(newCircle);
});
