let width = 288;
let height = 192;
let streaming = false;

var photoStage = 0;

const elements = {
  video: document.getElementById('camera-stream'),
  shutterButton: document.getElementById('shutter'),
  canvas: document.getElementById('photoCanvas'),
  ctx: document.getElementById('photoCanvas').getContext('2d')
};

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

  const image = canvas.toDataURL('image/png');
  document.getElementById('img-'+photoStage);

  console.log('snap');
};

elements.shutterButton.addEventListener('click', () => takePhoto());

cameraSetup();