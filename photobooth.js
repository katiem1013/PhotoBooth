let width = 288;
let height = 192;
let streaming = false;

var photoStage = 0;
var frames=1;
var filter=1;


const elements = {
  video: document.getElementById('camera-stream'),
  shutterButton: document.getElementById('shutter'),
  canvas: document.getElementById('photoCanvas'),
  ctx: document.getElementById('photoCanvas').getContext('2d'),
  nextButton: document.getElementById('next-bttn'),
  prevButton: document.getElementById('prev-bttn'),
  clearButton: document.getElementById('clear-bttn'),
  downloadButton: document.getElementById('download-bttn'),
  photostrip: document.getElementById('strip'),
  countdownImg: document.getElementById('countdown'),
  prevFilter: document.getElementById('prev-filter'),
  nextFilter: document.getElementById('next-filter'),
};

elements.nextFilter.addEventListener("click", nextfilter);
elements.prevFilter.addEventListener("click", prevfilter);

function nextfilter(){
  filter++;
  if(filter >= 6)
  {
    filter=1;
  }
  
  filterUpdate();
}

function prevfilter(){
  filter--;
  if(filter <= 0)
  {
    filter=5;
  }
  
  filterUpdate();
}

const filterUpdate = () => {
  const { canvas, ctx} = elements;

  if (filter === 1) {
    canvas.style.filter = `${"none"} translateZ(0)`;
    ctx.filter = "none";
} 
else if (filter === 2) {
    canvas.style.filter = `${"grayscale(100%)"} translateZ(0)`;
    canvas.style.webkitFilter = `${"grayscale(100%)"} translateZ(0)`;
    ctx.filter = "grayscale(100%)";
}

  
  console.log(filter);
  
}


elements.nextButton.addEventListener("click", nextBTTN);
elements.clearButton.addEventListener("click", clearPhotos);
elements.prevButton.addEventListener("click", prevBTTN);

function nextBTTN(){
  frames++;
  if(frames >= 6)
  {
    frames=1;
  }
  frameUpdate();
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

function countdown(time){
  if(photoStage < 4){
    elements.countdownImg.style.display = 'flex'
    elements.countdownImg
    elements.countdownImg.innerHTML = time;
    if (time>0){
      console.log(time);
      setTimeout(function(){countdown(time-1)},1000);
    }
    else{
      takePhoto();
    };
  }

  else{
    elements.countdownImg.style.display = 'none'
  }

  elements.shutterButton.style.display = 'none'
}

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
  if(photoStage < 4){
    photoStage++;
    const { video, ctx, canvas} = elements;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(video,0, 0, width, height);

    const image = canvas.toDataURL('image.png');
    document.getElementById('img-'+photoStage).src=image;

    console.log('snap');
    
    countdown(3);
  }
};

function clearPhotos(){
  document.getElementById('img-1').src='images/background.PNG';
  document.getElementById('img-2').src='images/background.PNG';
  document.getElementById('img-3').src='images/background.PNG';
  document.getElementById('img-4').src='images/background.PNG';

  photoStage=0;

  elements.shutterButton.style.display = 'inline-block';
}

 const h2c = window.html2canvas || html2canvas;

document.getElementById('download-bttn').onclick = function(){
  const { photostrip} = elements;

  h2c(photostrip,{
    allowTaint: true,
    useCORS: true,
    scale: 2,
    width: photostrip.scrollWidth,
    height: photostrip.scrollHeight,
    x: -3.5,
    y: -10,
    scrollX: 0,
    scrollY: 0,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: document.documentElement.offsetHeight
  }).then((canvas) =>{
    const base64image = canvas.toDataURL("image/png");
    var anchor = document.createElement('a');
    anchor.setAttribute("href", base64image);
    anchor.setAttribute("download", "photostrip.png");
    anchor.click();
    anchor.remove();
  }).catch(err => {
    console.error("html2canvas failed:", err);
  });
}

elements.shutterButton.addEventListener('click', () => countdown(3));

cameraSetup();
