import * as tf from "@tensorflow/tfjs";
// import { loadGraphModel } from "@tensorflow/tfjs-converter";

const url = {
  model: "http://127.0.0.1:8081/model.json",
};

async function loadModel(url, canvas) {
  try {
    // For graph model
    const model = await tf.loadGraphModel(url);

    setInterval(() => {
      detect(model, canvas);
    }, 16.7);
  } catch (err) {
    console.log(err);
  }
}

export default function triggerLoadModel(canvas) {
  tf.ready().then(() => {
    loadModel(url.model, canvas);
  });
  // canvas.reference.addEventListener("loadeddata", async () => {
  //   tf.ready().then(() => {
  //     loadModel(url.model, canvas);
  //   });
  // });
}

async function detect(net, canvas) {
  const video = canvas.reference;
  const videoWidth = video.clientWidth;
  const videoHeight = video.clientHeight;
  console.log(videoHeight, videoWidth);

  // video.height = video.clientHeight;
  // video.width = video.clientHeight;

  // canvas.modelResult.width = videoWidth;
  // canvas.modelResult.height = videoHeight;

  const img = tf.browser.fromPixels(video);
  const resized = tf.image.resizeBilinear(img, [videoWidth, videoHeight]);
  const casted = resized.cast("int32");
  const expanded = casted.expandDims(0);
  // console.log(expanded);
  const obj = await net.executeAsync(expanded);
  console.log(obj);

  const boxes = await obj[1].array();
  const classes = await obj[2].array();
  const scores = await obj[4].array();

  const ctx = canvas.modelResult.getContext("2d");
  ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

  requestAnimationFrame(() => {
    drawRect(
      boxes[0],
      classes[0],
      scores[0],
      0.4,
      videoWidth,
      videoHeight,
      ctx
    );
  });

  tf.dispose(img);
  tf.dispose(resized);
  tf.dispose(casted);
  tf.dispose(expanded);
  tf.dispose(obj);
}

const labelMap = {
  1: { name: "Hello", color: "red" },
  2: { name: "Thank You", color: "yellow" },
  3: { name: "I Love You", color: "lime" },
  4: { name: "Yes", color: "blue" },
  5: { name: "No", color: "purple" },
};

// Define a drawing function
export const drawRect = (
  boxes,
  classes,
  scores,
  threshold,
  imgWidth,
  imgHeight,
  ctx
) => {
  for (let i = 0; i <= boxes.length; i++) {
    if (boxes[i] && classes[i] && scores[i] > threshold) {
      // Extract variables
      const [y, x, height, width] = boxes[i];
      const text = classes[i];

      // Set styling
      ctx.strokeStyle = labelMap[text]["color"];
      ctx.lineWidth = 5;
      ctx.fillStyle = "white";
      ctx.font = "30px Arial";

      // DRAW!!
      ctx.beginPath();
      ctx.fillText(
        labelMap[text]["name"] + " - " + Math.round(scores[i] * 100) / 100,
        x * imgWidth,
        y * imgHeight - 10
      );
      console.log(
        labelMap[text]["name"],
        x * imgWidth,
        y * imgHeight,
        (width * imgWidth) / 2,
        (height * imgHeight) / 1.5
      );
      ctx.rect(
        x * imgWidth,
        y * imgHeight,
        (width * imgWidth) / 2,
        (height * imgHeight) / 1.5
      );
      ctx.stroke();
    }
  }
};
