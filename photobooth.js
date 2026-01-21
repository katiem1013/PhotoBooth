const elements = {
  video: document.getElementById('liveVideo'),
  canvas: document.getElementById('canvas'),
  ctx: document.getElementById('canvas').getContext('2d'),
};


const cameraSetup= () => {
  navigator.mediaDevices.getUserMedia({ video: { width: 288, height: 192, facingMode: 'user' }, audio: false })
    .then(stream => { 
        elements.video.srcObject = stream; 
        elements.video.play(); })
    .catch(err => alert('Camera access failed: ' + err));
};

cameraSetup();