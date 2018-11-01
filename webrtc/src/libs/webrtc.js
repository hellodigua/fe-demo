export default class WebRTC {
  constructor(options) {
    this.video = options.video;
    this.canvas = options.canvas;
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

  getState() {
    const a = navigator.mediaDevices.getSupportedConstraints();
    console.log(a);
  }

  play() {
    this.getMedia();
  }

  stop() {
    const stream = this.video.srcObject;

    const track = stream.getTracks()[0];

    track.stop();
  }

  captrue() {
    const context = this.canvas.getContext('2d');
    context.drawImage(this.video, 0, 0, 640, 480);

    return this.canvas.toDataURL('image/png');
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

      this.videoState = stream;

      this.video.play();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}