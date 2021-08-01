<template>
  <div id="credits">
    <CreditsBoard credit_title="Project Creators">
      <p>Corneus</p>
      <p>Waffles</p>
      <p>CD165</p>
    </CreditsBoard>
    <CreditsBoard credit_title="Website Creators">
      <p>advent</p>
      <p><a href="https://github.com/RayWarthog" target="_blank">Warthog</a></p>
    </CreditsBoard>
    <CreditsBoard credit_title="Translators">
      <p>Sjcl</p>
      <p>Just Sam</p>
    </CreditsBoard>
    <CreditsBoard credit_title="Video Creator and Editor">
      <p>Gebishi</p>
    </CreditsBoard>
  </div>
</template>

<script>

import CreditsBoard from '@/components/CreditsBoard.vue'

import Masonry from 'masonry-layout'

export default {
  components: {
    CreditsBoard
  },
  methods: {
    initMasonry () {
      this.masonry = new Masonry(
        document.querySelector('#credits'),
        {
          itemSelector: '.credits-board',
          columnWidth: '.credits-board',
          gutter: 15
        }
      )
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initMasonry()
      window.addEventListener('load', () => {
        if (this.masonry) {
          this.masonry.layout()
        }
      })
    })
  }
}
</script>

<style scoped>
.board-note {
  text-align: right;
  font-weight: bold;
}

.credits-board {
  margin-bottom: 15px;
}

.credit-names a {
  text-decoration: none;
  color: #36B5F5;
}

.canvas-credits-container, .participants {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.participants-partial {
  padding-right: 10px;
}

.canvas-credit-title {
  font-weight: bold;
}

.canvas-credit {
  margin-top: 5px;
  padding-right: 10px;
}

p {
  margin: 0;
}

@media (min-width:801px)  {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
  #credits {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
