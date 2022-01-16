export default function openCvReady(video) {
  const cv = window.cv;
  video.height = video.clientHeight;
  video.width = video.clientWidth;
  let src = new cv.Mat(video.clientHeight, video.clientWidth, cv.CV_8UC4);
  let dst = new cv.Mat(video.clientHeight, video.clientWidth, cv.CV_8UC1);
  let cap = new cv.VideoCapture(video);
  let brightness = 0;
  let contrast = 0;
  const FPS = 30;

  function watchContrastAndBrightness(image) {
    let mean = new cv.Mat();
    let std = new cv.Mat();
    image.read(src);
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    cv.meanStdDev(dst, mean, std);

    return {
      getBrightness: mean.data64F[0],
      getContrast: std.data64F[0],
    };
  }

  function processVideo() {
    try {
      let { getBrightness, getContrast } = watchContrastAndBrightness(cap);
      cap.read(src);
      if (getBrightness <= 40) {
        brightness = 120;
      } else {
        brightness = 20;
      }
      if (getContrast < 47) {
        contrast = getContrast + 65;
      } else {
        contrast = 0;
      }

      if (brightness !== 0) {
        let shadow = 0;
        let highlight = 0;
        if (brightness > 0) {
          shadow = brightness;
          highlight = 255;
        } else {
          shadow = 0;
          highlight = 255 + brightness;
        }
        const alphaB = (highlight - shadow) / 255;
        const gammaB = shadow;

        cv.addWeighted(src, alphaB, src, 0, gammaB, dst);
      } else {
        dst = src;
      }

      // working on contrast
      if (contrast !== 0) {
        const f = (131 * (contrast + 127)) / (127 * (131 - contrast));
        const alphaC = f;
        const gammaC = 127 * (1 - f);

        cv.addWeighted(dst, alphaC, dst, 0, gammaC, dst);
      }

      let begin = Date.now();
      // start processing.
      // cap.read(src);

      cv.imshow("canvasFrame", dst);
      // schedule the next one.
      console.log("hello");
      let delay = 1000 / FPS - (Date.now() - begin);
      setTimeout(processVideo, delay);
    } catch (err) {
      console.error(err);
    }
  }
  setTimeout(processVideo, 0);
}
