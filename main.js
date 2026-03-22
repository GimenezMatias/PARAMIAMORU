window.addEventListener("load", () => {
  document.body.classList.remove("container");

  const audio = document.getElementById("musica");
  const btn = document.getElementById("startBtn");

  btn.addEventListener("click", () => {
    
    // Espera a que el audio esté listo
    if (audio.readyState >= 3) {
      audio.play();
    } else {
      audio.addEventListener("canplaythrough", () => {
        audio.play();
      }, { once: true });
    }

    btn.style.display = "none";
  });
});
