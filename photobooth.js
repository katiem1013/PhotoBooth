let width = 288;
let height = 192;
let streaming = false;

var photoStage = 0;
var frames=1;

import domtoimage from 'dom-to-image-more'; //the issue?

const elements = {
  video: document.getElementById('camera-stream'),
  shutterButton: document.getElementById('shutter'),
  canvas: document.getElementById('photoCanvas'),
  ctx: document.getElementById('photoCanvas').getContext('2d'),
  nextButton: document.getElementById('next-bttn'),
  prevButton: document.getElementById('prev-bttn'),
  downloadButton: document.getElementById('download-bttn'),
};

elements.nextButton.addEventListener("click", nextBTTN);
elements.downloadButton.addEventListener("click", downloadPhoto);
elements.prevButton.addEventListener("click", prevBTTN);

function nextBTTN(){
  frames++;
  if(frames >= 6)
  {
    frames=1;
  }
  frameUpdate();
}

function downloadPhoto(){
  // downloading is not working 
  domtoimage
    .toJpeg(document.getElementById('strip'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
}

function prevBTTN(){
  frames--;
  if(frames <= 0)
  {
    frames=5;
  }
  frameUpdate();
}

const frameUpdate = () => {
  document.getElementById('frame').src="images/frame"+frames+".png";
  console.log(frames);
}

elements.video.addEventListener(
  "canplay",
  (ev) => {
    if(!streaming){
      height= elements.video.videoHeight / (elements.video.videoWidth / width)

      elements.canvas.setAttribute("width",width);
      elements.canvas.setAttribute("height",height);
      elements.video.setAttribute("width",width);
      elements.video.setAttribute("height",height);
      streaming = true;
    }
  },
  false
);

const cameraSetup = () => {
  const { video } = elements;

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia({video:true})){
    navigator.mediaDevices
      .getUserMedia({video:true})
      .then((stream)=>{
        video.srcObject = stream;
        video.play();
      })
  }
};

const takePhoto = () => { 
  photoStage++;
  const { video, ctx, canvas} = elements;
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(video,0, 0, width, height);

  const image = canvas.toDataURL('image.png');
  document.getElementById('img-'+photoStage).src=image;

  console.log('snap');
};


elements.shutterButton.addEventListener('click', () => takePhoto());

cameraSetup();
