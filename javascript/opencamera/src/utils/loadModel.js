import * as tf from "@tensorflow/tfjs";
// import { loadGraphModel } from "@tensorflow/tfjs-converter";

const url = {
  model: "http://192.168.137.1:8081/model.json",
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
  // tf.ready().then(() => {
  //   loadModel(url.model, canvas);
  // });
  canvas.reference.addEventListener("loadeddata", async () => {
    tf.ready().then(() => {
      loadModel(url.model, canvas);
    });
  });
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
  // console.log(obj);

  const boxes = await obj[1].array();
  const classes = await obj[2].array();
  const scores = await obj[4].array();
  console.log(boxes[0][0]);

  const ctx = canvas.modelResult.getContext("2d");
  ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

  // boxes[0][0].forEach((pred) => {
  //   ctx.beginPath();
  //   ctx.lineWidth = "4";
  //   ctx.strokeStyle = "blue";
  //   ctx.rect(pred[0], pred[1], pred[2], pred[3]);
  //   ctx.stroke();
  // });

  requestAnimationFrame(() => {
    drawRect(
      boxes[0],
      classes[0],
      scores[0],
      0.8,
      videoWidth,
      videoHeight,
      ctx
    );
  });

  //   const canvasFrame = canvas.reference.toDataURL("image/jpg");
  // const img = tf.browser.fromPixels(canvas.reference);
  // const resized = tf.image.resizeBilinear(img, [videoWidth, videoHeight]);
  // const casted = resized.cast("int32");
  // const expanded = casted.expandDims(0);
  // const obj = await net.executeAsync(expanded);
  // //   console.log(obj);

  // const boxes = await obj[1].array();
  // const classes = await obj[2].array();
  // const scores = await obj[4].array();
  // console.log(boxes, classes, scores);

  // Draw mesh
  // let img = canvas.reference.current.toDataURL("image/png");
  // let ctx = canvas.modelResult.getContext("2d");
  // let ctx2 = canvas.reference.current.getContext("2d");

  // ctx.drawImage(img, videoWidth, videoHeight);

  // 5. TODO - Update drawing utility
  // drawSomething(obj, ctx);
  // requestAnimationFrame(() => {
  //   drawRect(
  //     boxes[0],
  //     classes[0],
  //     scores[0],
  //     0.8,
  //     videoWidth,
  //     videoHeight,
  //     ctx
  //   );
  // });

  tf.dispose(img);
  tf.dispose(resized);
  tf.dispose(casted);
  tf.dispose(expanded);
  tf.dispose(obj);
}

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
    if (boxes[i] && classes[i] && scores[i]) {
      // Extract variables
      console.log("sampe");
      const [y, x, height, width] = boxes[i];
      // const text = classes[i];

      // Set styling
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 4;
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
