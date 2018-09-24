import './styles/index.scss';

import WebRTC from './scripts/webrtc';

const initDemo = () => {
  const testObj = new WebRTC();

  testObj.init();

  const switchBtn = document.getElementById('switch');
  const captureBtn = document.getElementById('capture');
  const previewBtn = document.getElementById('preview');

  switchBtn.addEventListener('click', () => {
    testObj.switchSource();
  });

  captureBtn.addEventListener('click', () => {
    testObj.captrue();
  });

  previewBtn.addEventListener('click', () => {
    const photos = document.getElementById('photos');
    photos.classList.add('active');
  });
};

const title = 'WebRTC';
document.title = title;

initDemo();

