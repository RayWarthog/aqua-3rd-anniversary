<template>
  <div id="home">
      <section class="full-page-height" id="start-sect">
        <AsacocoBoard>
          <img id="welcome-img" src="@/assets/images/thankscoco.png" alt="">
        </AsacocoBoard>
      </section>
      <section>
        <AsacocoBoard boardTitle="Drawpiles" boardTitleJP="ドゥロー・パイル">
          <div class="board-note">Organized by the Hololive Fan Discord server</div>
        </AsacocoBoard>
      </section>
  </div>
</template>

<script>
import AsacocoBoard from '@/components/AsacocoBoard.vue'

export default {
  components: {
    AsacocoBoard
  },
  mounted () {
    // Hide navbar initially
    if (this.$root.$data.lastScrollPosition === 0) {
      this.$root.$data.showNavbar = false
    }
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

</style>
