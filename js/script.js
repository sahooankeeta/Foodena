console.log("ajnkj");
let items = document.querySelectorAll(".recommendations-item");
items.forEach((s, i) => {
  console.log(i);
  s.style.transform = `translateX(${100 * i}%)`;
});
