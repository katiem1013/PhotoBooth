var width = 288;
var height = 192;

var photoStage = 0;

const elements = {
  video: document.getElementById('liveVideo'),
  canvas: document.getElementById('canvas'),
  ctx: document.getElementById('canvas').getContext('2d'),
};


const cameraSetup= () => {
  navigator.mediaDevices.getUserMedia({ video: { width: width, height: height, facingMode: 'user' }, audio: false })
    .then(stream => { 
        elements.video.srcObject = stream; 
        elements.video.play(); })
    .catch(err => alert('Camera access failed: ' + err));
};

function takePhoto(){ 
    if(photoStage == 0){
        photoStage = +   1;
        const context = canvas.getContext("2d");
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(elements.video, 0, 0, width, height);

            const data = canvas.toDataURL("image/png");
            elements.video.setAttribute("src", data);
        } else {
            clearPhoto();
        }
    }
}

function clearPhoto() {
  const context = canvas.getContext("2d");
  context.fillStyle = "#aaaaaa";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const data = canvas.toDataURL("image/png");
  elements.video.setAttribute("src", data);
}


cameraSetup();