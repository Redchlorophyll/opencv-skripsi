import * as tf from "@tensorflow/tfjs";
const blazeface = require("@tensorflow-models/blazeface");

console.log("Using TensorFlow backend: ", tf.getBackend());

async function detectFaces(video) {
  let model = await blazeface.load();
  let ctx = video.modelResult.getContext("2d");
  video.width = video.reference.clientWidth;
  video.height = video.reference.clientHeight;
  const prediction = await model.estimateFaces(video.reference, false);
  console.log(prediction);

  ctx.drawImage(
    video.reference,
    0,
    0,
    video.modelResult.clientWidth,
    video.modelResult.clientHeight
  );
  prediction.forEach((pred) => {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "blue";
    ctx.rect(
      pred.topLeft[0],
      pred.topLeft[1],
      pred.bottomRight[0] - pred.topLeft[0],
      pred.bottomRight[1] - pred.topLeft[1]
    );
    ctx.stroke();
  });
}

export default function runBlazeModel(video) {
  setInterval(() => {
    detectFaces(video);
  }, 1000 / 30);
}
