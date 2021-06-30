<template>
  <div id="home">
      <section class="full-page-height" id="start-sect" data-aos="fade-in">
        <AsacocoBoard>
          <img id="welcome-img" src="@/assets/images/thankscoco.png" alt="">
        </AsacocoBoard>
      </section>
      <section data-aos="fade-in">
        <AsacocoBoard boardTitle="Drawpiles" boardTitleJP="ドゥロー・パイル">
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

</style>
