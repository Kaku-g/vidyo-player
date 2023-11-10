export const checkAudioPresence = (url) => {
  return new Promise((resolve) => {
    const mediaSource = new MediaSource();

    mediaSource.addEventListener("sourceopen", () => {
      const mediaRecorder = new MediaRecorder(mediaSource);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          resolve(true); // The video has audio.
        } else {
          resolve(false); // The video does not have audio.
        }
      };

      mediaRecorder.start();
      mediaRecorder.stop();
    });

    mediaSource.addEventListener("error", (e) => {
      console.error("Error opening media source:", e);
      resolve(false);
    });

    const videoElement = document.createElement("video");
    videoElement.src = url;
  });
};
