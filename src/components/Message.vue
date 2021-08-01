<template>
  <div class="message-card"
  v-bind:class="{
    has_image: message.images.length > 0 ? true : false,
    has_video: message.youtube_id ? true : false
  }">
    <div class="message-card-top">
      <div class="message-card-sender">
        <div class="sender-left">
          <div class="sender-name">{{ message.name }}</div>
          <div class="sender-twitter">{{ message.twitter }}</div>
        </div>
      </div>
      <div v-if="message.country_code" class="flag-icon-container">
        <span :class="'flag-icon flag-icon-'+message.country_code" :title=message.country_name :alt=message.country_name></span>
      </div>
    </div>
    <div class="message-card-message"><p :lang=message.lang>{{ message.message }}</p></div>
    <template v-if=message.submessage>
      <hr>
      <div class="message-card-message"><p lang="ja">{{ message.submessage }}</p></div>
    </template>
    <template v-for="image in message.images" :key="image.idx">
      <div class="image-container">
        <div class="image-inner-wrapper">
          <a class="message-image" :href=image.image_file :author=message.name :title=message.message>
            <img loading="lazy"
            :src=image.image_file_small
            alt="">
          </a>
        </div>
      </div>
    </template>
    <div class="decor"></div>
  </div>
</template>

<script>
import 'flag-icon-css/css/flag-icon.css'
export default {
  name: 'Message',
  props: {
    message: Object
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
  width: calc(100% - 5rem - 10px);
  border: 5px solid #e987ac;
  border-radius: 25px;
  box-shadow: 5px 0 20px -5px rgb(0 0 0 / 75%);
}

.decor {
  background-image: url('~@/assets/images/decor.png');
  background-size: contain;
  width: 2rem;
  height: 2rem;
  float: right;
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

.message-card-sender {
  font-family: 'Patrick Hand',cursive;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sender-left {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

.message-card-sender .sender-name {
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.message-card-sender .sender-twitter {
  font-size: 1rem;
  font-style: italic;
  white-space: nowrap;
  text-overflow: ellipsis;
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

.message-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.flag-icon {
  font-size: 1.75rem;
  box-shadow: 0 0 5px #000;
}

@media (min-width:801px)  {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
  .message-card {
    width: calc(50% - 5rem - 10px);
  }
  .message-card.has_image {
    width: calc(100% - 5rem - 10px);
  }
}
@media (min-width:1025px) {
  /* big landscape tablets, laptops, and desktops */
  .message-card {
    width: calc(33% - 5rem - 10px);
  }
  .message-card.has_image {
    width: calc(66% - 5rem - 10px);
  }
}
@media (min-width:1281px) {
  /* hi-res laptops and desktops */
  .message-card {
    width: calc(25% - 5rem - 10px);
  }
  .message-card.has_image {
    width: calc(50% - 5rem - 10px);
  }
}
</style>
