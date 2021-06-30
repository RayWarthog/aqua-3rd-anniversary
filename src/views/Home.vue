<template>
  <div id="home">
      <section class="full-page-height" id="start-sect" data-aos="fade-in">
        <AsacocoBoard>
          <img id="welcome-img" src="@/assets/images/thankscoco.png" alt="">
        </AsacocoBoard>
      </section>
      <div class="divider-height"></div>
      <section data-aos="fade-in">
        <AsacocoBoard boardTitle="Drawpiles" boardTitleJP="イラスト">
          <div class="board-note">Organized by the Hololive Fan Discord server</div>
          <div class="drawpile-images">
            <template v-for="drawpile_image in drawpile_images" :key="drawpile_image.src">
              <a class="drawpile-image" :href=drawpile_image.src>
                <img :src=drawpile_image.thumb alt="">
              </a>
            </template>
          </div>
        </AsacocoBoard>
      </section>
      <div class="divider-height"></div>
      <section data-aos="fade-in">
        <AsacocoBoard boardTitle="Videos" boardTitleJP="ファン動画">
          <div class="video-container">
            <div class="youtube-video-title-container">
              <div class="youtube-video-title">I'm a Magic Dragon</div>
              <div class="board-note">by the Tatsunoko Discord server</div>
            </div>
            <div class="youtube-video">
              <div>
                <iframe title="I'm a Magic Dragon 『parody 'Puff the Magic Dragon'』Kiryu Coco tribute" src="https://www.youtube-nocookie.com/embed/cw2gJDILFfw"
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
              </div>
            </div>
          </div>
          <div class="video-container">
            <div class="youtube-video-title-container">
              <div class="youtube-video-title">Shiny Smily Story (EN. Version) Cover</div>
              <div class="board-note">by the Hololive Fan Discord server</div>
            </div>
            <div class="youtube-video">
              <div>
                <iframe title="Hololive Fan Server // Shiny Smily Story (EN. Version) // Our gift to Kiryu Coco" src="https://www.youtube-nocookie.com/embed/f1Hro2er8OQ"
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </AsacocoBoard>
      </section>
      <div class="divider-height"></div>
      <section data-aos="fade-in">
        <AsacocoBoard boardTitle="Individual Messages, Fanart and Videos" boardTitleJP="ココへの贈り物">
          <div id="ind-message-sect-container">
            <router-link id="message-reroute-link" class="nav-item" to="/messages">>>> View all of them here!</router-link>
          </div>
        </AsacocoBoard>
      </section>
      <div class="divider-height"></div>
      <section data-aos="fade-in" id="final-letter-sect" class="full-page-height">
        <AsacocoBoard>
          <div id="final-letter">
            <p>Dear Coco,</p>

            <p>This ending only signals the beginning of something new.<br>
            You've left behind a legacy that can't be measured by numbers or described by words.<br>
            A Kiryu Coco-shaped gift to fans across the world.<br>
            Joy that will be fondly remembered for weeks, months, even years from now.<br>
            Goodbyes are too sad, so we'll part with these words:</p>

            <p>See you again, motherfucker.</p>
          </div>
        </AsacocoBoard>
      </section>
  </div>
</template>

<script>
import AsacocoBoard from '@/components/AsacocoBoard.vue'

import $ from 'jquery'
import 'magnific-popup/dist/jquery.magnific-popup'

import AOS from 'aos'

export default {
  components: {
    AsacocoBoard
  },
  data: () => {
    const drawpileImagesSrc = [
      {
        src: require('@/assets/images/drawpile/drawpile_1.png'),
        thumb: require('@/assets/images/drawpile/thumb/drawpile_1.jpg')
      },
      {
        src: require('@/assets/images/drawpile/drawpile_2.png'),
        thumb: require('@/assets/images/drawpile/thumb/drawpile_2.jpg')
      },
      {
        src: require('@/assets/images/drawpile/drawpile_3.png'),
        thumb: require('@/assets/images/drawpile/thumb/drawpile_3.jpg')
      },
      {
        src: require('@/assets/images/drawpile/drawpile_4.png'),
        thumb: require('@/assets/images/drawpile/thumb/drawpile_4.jpg')
      }
    ]
    return {
      drawpile_images: drawpileImagesSrc
    }
  },
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
    },
    initMagnificPopup () {
      $('.drawpile-image').magnificPopup({
        type: 'image',
        gallery: {
          enabled: true
        }
      })
      document.querySelectorAll('.drawpile-image img').forEach(item => {
        item.addEventListener('load', (e) => {
          if (this.aos) {
            this.aos.refresh()
          }
        })
      })
    }
  },
  mounted () {
    // Hide navbar initially
    if (this.$root.$data.lastScrollPosition === 0) {
      this.$root.$data.showNavbar = false
    }
    this.initMagnificPopup()
    this.initAOS()
  }
}
</script>

<style scoped>
#start-sect {
  margin-top: -56.4px;
  align-items: center;
}

section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.full-page-height {
  min-height: 100vh;
}

.divider-height {
  min-height: 25vh;
}

.board-note {
  text-align: right;
  font-weight: bold;
}

#welcome-img {
  width: 100%;
  height: 100%;
}

.asacoco-board {
  margin: 20px;
  width: 100%;
  max-width: 1200px;
}

#start-sect .asacoco-board .board-content {
  padding: 0;
}

.drawpile-image img {
  width: 100%;
  padding-top: 25px;
  height: 100%;
}

.video-container {
  margin-bottom: 50px;
}

.video-container:last-of-type {
  margin-bottom: 0;
}

.youtube-video-title {
  text-align: center;
  font-size: 2rem;
  font-family: 'Architects Daughter';
}

.youtube-video {
  max-width: 1280px;
  margin: 0px auto;
}

.youtube-video > div {
  position: relative;
  padding-bottom: 75%;
  height: 0px;
}

.youtube-video iframe {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}

#ind-message-sect-container {
  text-align: right;
}

#message-reroute-link {
  font-weight: bolder;
  text-decoration: none;
  color: black;
  font-size: 2rem;
}

#final-letter {
  white-space: pre-wrap;
  font-size: 1.5rem;
  font-family: 'Architects Daughter', cursive;
}

#final-letter-sect {
  display: flex;
  align-items: center;
}

@media (min-width:481px)  {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
  #final-letter, #message-reroute-link {
    font-size: 2rem;
  }
}

@media (min-width:801px)  {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
  #final-letter, #message-reroute-link {
    font-size: 3rem;
  }
}
</style>
