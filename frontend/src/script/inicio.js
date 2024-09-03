const $btn = document.querySelector("#btn");

$btn.addEventListener("click", async (event) => {
  preventDefault(event);
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(username, password);
});

$btn.addEventListener("click");
