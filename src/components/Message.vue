<template>
  <div class="message-card"
  v-bind:class="{
    has_image: message.images.length > 0 ? true : false,
    has_video: message.youtube_id ? true : false
  }">
  <div class="message-card-sender">{{ message.name }}</div>
    <div class="message-card-message"><p :lang=message.lang>{{ message.message }}</p></div>
    <template v-for="image in message.images" :key="image.idx">
      <div class="image-container">
        <a class="message-image" :href=image.image_file :author=message.name :title=message.message>
          <img loading="lazy" :src=image.image_file_small alt="">
        </a>
      </div>
    </template>
    <template v-if="message.youtube_id">
      <div class="video-container">
        <div class="video-inner-wrapper">
          <a class="message-youtube-vid mfp-iframe" :href="'http://www.youtube.com/watch?v=' + message.youtube_id" :author=message.name :title=message.message>
            <img
            :src="'https://img.youtube.com/vi/' + message.youtube_id + '/hqdefault.jpg'"
            alt="">
          </a>
          <small class="video-caption">YouTube</small>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: Object
  }
}
</script>

<style scoped>
.message-card {
  padding: 1.5rem;
  background-color: white;
  margin: 1rem;
  width: calc(100% - 5rem - 2px);
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
}

.image-container {
  display: flex;
  justify-content: center;
}

.video-container {
  display: flex;
  justify-content: center;
}

.video-inner-wrapper {
  display: flex;
  flex-direction: column;
}

.message-card-sender {
  font-family: 'Patrick Hand',cursive;
  font-size: 1.5rem;
  font-weight: 700;
}

.message-card-message {
  font-family: 'Architects Daughter',cursive;
  font-size: 1.25rem;
}

.message-card-message p {
  font-family: 'Architects Daughter',cursive;
  font-size: 1.25rem;
  white-space: pre-wrap;
}

.message-card-message p:lang(ja) {
    font-family: 'Kosugi Maru', sans-serif;
}

img {
  max-height: 100%;
  max-width: 100%;
}

.message-youtube-vid {
  position: relative;
  display: inline-block;
}

.message-youtube-vid:before {
  content: "";
  position: absolute;
  background: transparent url('~@/assets/images/yt_icon_rgb.png') center center no-repeat;
  background-size: 15%;
  width: 100%;
  height: 100%;
  z-index: 10;
}

@media (min-width:801px)  {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
  .message-card {
    width: calc(50% - 5rem - 2px);
  }
  .message-card.has_image {
    width: calc(100% - 5rem - 2px);
  }
}
@media (min-width:1025px) {
  /* big landscape tablets, laptops, and desktops */
  .message-card {
    width: calc(33% - 5rem - 2px);
  }
  .message-card.has_image {
    width: calc(66% - 5rem - 2px);
  }
}
@media (min-width:1281px) {
  /* hi-res laptops and desktops */
  .message-card {
    width: calc(25% - 5rem - 2px);
  }
  .message-card.has_image {
    width: calc(50% - 5rem - 2px);
  }
}
</style>
