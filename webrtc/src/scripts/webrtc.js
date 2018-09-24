export default class WebRTC {
  constructor() {
    this.video = document.querySelector('#video');
    this.control = document.querySelector('#play');
    this.canvas = document.querySelector('#canvas');
    this.streaming = false;
    this.isMobile = false;
    this.source = 'backend';
  }

  init () {
    this.isMobile = this.checkMobile();
    if (!this.isMobile) {
      this.source = 'frontend';
    }
    this.getMedia();
  }

  checkMobile () {
    const mobileAgent = new Array('iphone', 'ipod', 'ipad', 'android', 'mobile', 'blackberry', 'webos', 'incognito', 'webmate', 'bada', 'nokia', 'lg', 'ucweb', 'skyfire');
    const browser = navigator.userAgent.toLowerCase();
    let isMobile = false;
    for (let i = 0; i < mobileAgent.length; i++) {
      if (browser.indexOf(mobileAgent[i]) != -1) {
        isMobile = true;
        break;
      }
    }
    return isMobile;
  }

  switchSource() {
    if (this.isMobile) {
      if (this.source === 'backend') {
        this.source = 'frontend';
      } else {
        this.source = 'backend';
      }
      this.getMedia();
    } else {
      throw new Error('not mobile device!');
    }
  }

  captrue() {
    const context = this.canvas.getContext('2d');
    const preview = document.getElementById('preview');
    context.drawImage(this.video, 0, 0, 480, 640);

    preview.src = this.canvas.toDataURL('image/png');
  }

  async getMedia () {
    const sourcelist = {
      frontend: 'user', // 前置摄像头
      backend: { exact: 'environment' } // 后置摄像头
    };

    const constraints = {
      video: {
        facingMode: sourcelist[this.source]
      },
      audio: false
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      this.video.srcObject = stream;

      this.video.play();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}