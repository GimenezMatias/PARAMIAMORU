onload = () =>{
    document.body.classList.remove("container");
};

window.onload = () => {
  if (localStorage.getItem("playAudio") === "true") {
    const audio = document.getElementById("musica");

    // Intento de reproducción
    audio.play().catch(() => {
      // fallback si iOS bloquea
      document.body.addEventListener("click", () => {
        audio.play();
      }, { once: true });
    });

    localStorage.removeItem("playAudio");
  }
};
