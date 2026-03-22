onload = () =>{
    document.body.classList.remove("container");
};

window.addEventListener("load", () => {

  // esto mantiene la animación funcionando
  document.body.classList.remove("container");

  // esto es lo del audio
  if (localStorage.getItem("playAudio") === "true") {
    const audio = document.getElementById("musica");

    audio.play().catch(() => {
      document.body.addEventListener("click", () => {
        audio.play();
      }, { once: true });
    });

    localStorage.removeItem("playAudio");
  }

});
