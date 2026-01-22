var width = 1176;
var height = 1470;

var photoStage = 0;

const QUATER = height/4;

const elements = {
  video: document.getElementById('liveVideo'),
  canvas: document.getElementById('photoCanvas'),
  ctx: document.getElementById('photoCanvas').getContext('2d')
};

// move video to quater
const moveVideoToQuater = i => {
  const { video } = elements;
  video.style.display = 'block';
  video.style.top = i === 0 ? '0' : '25%';
  video.style.left = '0';
  video.style.width = '100%';
  video.style.height = '25%';
};


const cameraSetup= () => {
  navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 2560 }, height: { ideal: 1440 }, facingMode: 'user' }, audio: false })
    .then(stream => { 
        elements.video.srcObject = stream; 
        elements.video.play(); 
        moveVideoToQuater(0);})
    .catch(err => alert('Camera Error: ' + err));
};

function takePhoto(){ 
    
    const context = photoCanvas.getContext("2d");
    const yOffset = photoStage === 0 ? 0 : height/4;

    const targetAspect = width/(height/2), vAspect = elements.video.videoWidth/ elements.video.videoHeight;
    let sx, sy, swidth, sheight;

    if (vAspect > targetAspect) { sheight = elements.video.videoHeight; swidth = elements.video.videoHeight * targetAspect; sx = (elements.video.videoWidth- swidth) / 4; sy = 0; }
    else { swidth = elements.video.videoWidth; sheight = elements.video.videoWidth / targetAspect; sx = 0; sy = (elements.video.videoHeight - sheight) / 4; }


    context.drawImage(elements.video, 0, 0, width, QUATER);

    elements.ctx.save();
    elements.ctx.translate(width, 0);
    elements.ctx.scale(-1, 1);
    elements.ctx.drawImage(elements.video, sx, sy, swidth, sheight, 0, yOffset, width, QUATER);
    elements.ctx.restore();


    photoStage ++;
    
    if(photoStage === 1){moveVideoToQuater(2);}
    else if(photoStage === 2){moveVideoToQuater(3);}
    else if(photoStage === 3){moveVideoToQuater(4);}
    else if (photoStage === 5){console.log("printing photos")}


    console.log(photoStage);
}


cameraSetup();