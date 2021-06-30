<template>
  <div class="message-card"
  v-bind:class="{
    has_image: message.images.length > 0 ? true : false,
    has_video: message.youtube_id ? true : false
  }">
    <div class="message-card-top">
      <div class="message-card-sender">{{ message.name }}</div>
      <div class="sender-icons">
        <span :class="'product ' + message.product"></span>
        <span :class="'crest ' + message.crest"></span>
      </div>
    </div>
    <div class="message-card-message"><p :lang=message.lang>{{ message.message }}</p></div>
    <template v-for="image in message.images" :key="image.idx">
      <div class="image-container">
        <div class="image-inner-wrapper">
          <a class="message-image" :href=image.image_file :author=message.name :title=message.message>
            <img loading="lazy"
            :src=image.image_file_small
            alt=""
            @click="unblur"
            v-bind:class="{
              is_nsfw: message.nsfw,
              blur: (message.nsfw && !(message.idx in spoiler_dismissed)) ? true: false
            }">
          </a>
          <small class="nsfw-caption" v-if="message.nsfw">NSFW</small>
        </div>
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
  },
  data: function () {
    return {
      spoiler_dismissed: {}
    }
  },
  methods: {
    unblur: function (event) {
      if (this.message.nsfw && !(this.message.idx in this.spoiler_dismissed)) {
        this.spoiler_dismissed[this.message.idx] = true
        event.stopPropagation()
        event.preventDefault()
      }
    }
  }
}
</script>

<style scoped>
.blur {
  filter: blur(30px);
}

.message-card {
  padding: 1.5rem;
  background-color: white;
  margin: 1rem;
  width: calc(100% - 5rem - 2px);
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  box-shadow: 3px 3px #888888;
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

.image-inner-wrapper {
  display: flex;
  flex-direction: column;
}

.nsfw-caption {
  color: red;
  font-weight: bold;
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

.message-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.crest, .product {
  background-repeat: no-repeat;
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  background-size: contain;
}
.product {
  margin-right: 1rem;
}

.crest.gold {
  background-image: url('~@/assets/images/icons/kiryukaicrestgold.png');
}
.crest.green {
  background-image: url('~@/assets/images/icons/kiryukaicrestgreen.png');
}
.crest.pink {
  background-image: url('~@/assets/images/icons/kiryukaicrestpink.png');
}
.crest.purple {
  background-image: url('~@/assets/images/icons/kiryukaicrestpurple.png');
}
.crest.rainbow {
  background-image: url('~@/assets/images/icons/kiryukaicrestrainbow.png');
}
.crest.silver {
  background-image: url('~@/assets/images/icons/kiryukaicrestsilver.png');
}
.crest.orange {
  background-image: url('~@/assets/images/icons/kiryukaicrestorange.png');
}

.product.coffee {
  background-image: url('~@/assets/images/icons/Asacocoffee.png');
}
.product.drink {
  background-image: url('~@/assets/images/icons/cocodrink.png');
}
.product.shot {
  background-image: url('~@/assets/images/icons/cocoshot.png');
}
.product.tail {
  background-image: url('~@/assets/images/icons/cocoztail.png');
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
