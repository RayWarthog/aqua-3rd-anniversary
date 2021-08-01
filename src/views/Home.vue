<template>
  <div id="home">
      <section class="full-page-height" id="start-sect" data-aos="fade-in">
        <p>Konaqua!! Aqua, if you are reading this we thank you for the laughs, cries and smiles you have given us these past 3 years. We wish to thank you with some messages and a video, we have plenty more suprises left in the future!!</p>
        <p>こんあくあ！！この3年間、たくさんの笑いと涙や、笑顔をくれてありがとうございました。感謝の気持ちを伝えるために、メッセージとビデオをご用意しました。私達はこれからも、たくさんのサプライズを用意するつもりです！！</p>
      </section>
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
.full-page-height {
  display: flex;
  height: calc(100vh - 56.4px);
}

#start-sect {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

p {
  font-family: 'Kosugi Maru',sans-serif;
  color: white;
  text-shadow: 2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
  font-size: 1.3rem;
  padding-left: 1rem;
  padding-right: 1rem
}

@media (min-width:801px)  {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
  p {
    font-size: 2rem;
    padding-left: 2rem;
    padding-right: 2rem
  }
}

@media (min-width:1281px) {
  p {
    padding-left: 5rem;
    padding-right: 5rem
  }
}
</style>
