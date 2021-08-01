<template>
  <div id="video">
    <div id="cover-video-container" data-aos="fade-up" class="aos-init aos-animate">
        <div class="video-container">
            <iframe title="Minato Aqua 3rd Anniversary video   湊あくあ3周年記念ビデオ" src="https://www.youtube-nocookie.com/embed/VGyHVcPdzdg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos'

export default {
  methods: {
    initAOS () {
      this.aos = AOS
      this.aos.init({
        disable: 'mobile',
        offset: 120,
        delay: 50,
        duration: 1000,
        mirror: true,
        once: false
      })
    }
  },
  mounted () {
    this.initAOS()
  }
}
</script>

<style scoped>
#cover-video-container {
    display: flex;
    justify-content: center;
    max-width: 1280px;
    position: relative;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
}

.video-container {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
