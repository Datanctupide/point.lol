const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const object = {
  x: 60,
  y: 120,
  w: 60,
  h: 60,
  drag: false
};

const button = {
  x: 250,
  y: 120,
  w: 100,
  h: 60
};

const door = {
  x: 450,
  y: 80,
  w: 40,
  h: 140,
  open: false
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#E0E0E0";
  ctx.fillRect(button.x, button.y, button.w, button.h);
  ctx.strokeRect(button.x, button.y, button.w, button.h);
  ctx.fillStyle = "#000";
  ctx.fillText("КНОПКА", button.x + 20, button.y + 35);

  ctx.fillStyle = "#42A5F5";
  ctx.fillRect(object.x, object.y, object.w, object.h);
  ctx.fillStyle = "#fff";
  ctx.fillText("ОБЪЕКТ", object.x + 5, object.y + 35);

  if (door.open) {
    ctx.fillStyle = "green";
    ctx.fillText("ДВЕРЬ ОТКРЫТА", door.x - 30, door.y - 10);
  } else {
    ctx.fillStyle = "red";
    ctx.fillRect(door.x, door.y, door.w, door.h);
    ctx.fillText("ДВЕРЬ ЗАКРЫТА", door.x - 35, door.y - 10);
  }
}

draw();

function isOnButton(obj, btn) {
  return (
    obj.x + obj.w > btn.x &&
    obj.x < btn.x + btn.w &&
    obj.y + obj.h > btn.y &&
    obj.y < btn.y + btn.h
  );
}

canvas.addEventListener("mousedown", e => {
  const r = canvas.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;

  if (
    x >= object.x && x <= object.x + object.w &&
    y >= object.y && y <= object.y + object.h
  ) {
    object.drag = true;
  }
});

canvas.addEventListener("mousemove", e => {
  if (!object.drag) return;

  const r = canvas.getBoundingClientRect();
  object.x = e.clientX - r.left - object.w / 2;
  object.y = e.clientY - r.top - object.h / 2;

  door.open = isOnButton(object, button);
  draw();
});

canvas.addEventListener("mouseup", () => {
  object.drag = false;
  door.open = isOnButton(object, button);
  draw();
});

door.open = isOnButton(object, button);