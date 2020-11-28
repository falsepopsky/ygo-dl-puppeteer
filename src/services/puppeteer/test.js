var select = document.querySelector('.select');
var hijos = select.querySelectorAll('.inner');

hijos.forEach((hijo, index) => {
  let pepito = hijo.innerHTML.trim();
  console.log(pepito);
});
