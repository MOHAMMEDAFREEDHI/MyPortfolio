export const playSound = (src: string, volume: number = 0.7) => {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.preload = "auto";

  const tryPlay = () => {
    audio.play().catch(() => {
      console.warn("Autoplay blocked. Waiting for user gesture...");
      const unlock = () => {
        audio.play();
        document.removeEventListener("click", unlock);
        document.removeEventListener("keydown", unlock);
      };
      document.addEventListener("click", unlock);
      document.addEventListener("keydown", unlock);
    });
  };

  tryPlay();
  return audio; // So you can pause/stop later
};
