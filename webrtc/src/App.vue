<template>
  <div id="app">
    <div class="header"></div>
    <div class="body">
      <video id="video"></video>
      <canvas id="canvas"
              width="480"
              height="640"></canvas>
      <div :class="['photos', 'grid', { 'active': photoActice }]">
        <div class="item"
             v-for="(item, index) in cachePhotos"
             :key="index">
          <img :src="item" />
        </div>
        </div>
      </div>
      <div class="footer">
        <div class="options"></div>
        <div class="action">
          <div class="photo btn"
               @click="handlePreview">
            <img v-show="previewPhoto" :src="previewPhoto" />
        </div>
            <div class="capture btn"
                 @click="handleCapture"></div>
            <div class="btn"
                 @click="handleSwitch"></div>
          </div>
        </div>
      </div>
</template>
<script>
import WebRTC from './libs/webrtc';

export default {
  props: {},
  data () {
    return {
      obj: null,
      previewPhoto: null,
      isMobile: false,
      cachePhotos: [],
      photoActice: false
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    this.obj = new WebRTC({
      video: document.getElementById('video'),
      canvas: document.getElementById('canvas')
    });

    this.obj.init();
    this.isMobile = this.obj.checkMobile();
  },
  methods: {
    handleSwitch () {
      if (this.isMobile) {
        this.obj.switchSource();
      }
    },
    handleCapture () {
      const tempPhoto = this.obj.captrue();
      this.previewPhoto = tempPhoto;
      this.cachePhotos.push(tempPhoto);
    },
    handlePreview () {
      this.photoActice = !this.photoActice;
      if (this.photoActice) {
        this.obj.stop();
      } else {
        this.obj.play();
      }
    }
  }
};
</script>
<style lang="scss">

</style>
