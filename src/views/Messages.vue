<template>
  <div id="messages-view">
    <div class="media-filter-toggle-wrapper" data-aos="fade-in">
      <div class="media-filter-toggle">
        <ToggleSwitch
        id="media-filter-toggle-checkbox"
        v-model:checked="show_media_only"
        label="Show messages with media only"/>
      </div>
    </div>
    <div id="messages" v-bind:class="{'show-media-only': show_media_only}">
      <template v-for="message in messages" :key="message.idx">
        <Message v-show="!show_media_only || message.has_media" data-aos="fade-in" :message="message"/>
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Message from '@/components/Message.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import MessagesCSV from '@/assets/csv/messages.csv'

import Masonry from 'masonry-layout'
import AOS from 'aos'

import $ from 'jquery'
import 'magnific-popup/dist/jquery.magnific-popup'

export default {
  name: 'Messages',
  components: {
    Message,
    ToggleSwitch
  },
  data: () => {
    const filteredMessages = []
    const crestOptions = ['gold', 'green', 'pink', 'purple', 'rainbow', 'silver', 'orange']
    const productOptions = ['coffee', 'drink', 'shot', 'tail']
    MessagesCSV.map(
      (record, idx) => {
        const filteredRecord = {
          idx: idx,
          name: record.Nickname,
          message: null,
          images: [],
          youtube_id: null,
          has_media: false,
          lang: null,
          nsfw: false,
          crest: crestOptions[Math.floor(Math.random() * crestOptions.length)],
          product: productOptions[Math.floor(Math.random() * productOptions.length)]
        }
        if (record['Text Submission (Accepted/Pending/Rejected/NONE)'] === 'Accepted') {
          filteredRecord.message = record['Enter your message:']
          const jpCharacters = filteredRecord.message.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/)
          if (jpCharacters !== null) {
            filteredRecord.lang = 'ja'
          }
        }
        if (record['Video Submission (Accepted/Pending/Rejected/NONE)'] === 'Accepted' && record['Youtube ID']) {
          filteredRecord.youtube_id = record['Youtube ID']
          filteredRecord.has_media = true
        }
        if (record['Image Submission (Accepted/Pending/Rejected/NONE)'] === 'Accepted' && record['Uploaded file name']) {
          const imageFiles = record['Uploaded file name'].split(',')
          imageFiles.forEach((v, i) => {
            const image = {
              idx: i,
              image_file: null,
              image_file_small: null
            }
            image.image_file = require('@/assets/images/fanart/' + v)
            const fileparts = v.split('.')
            const ext = fileparts.pop()
            const filename = fileparts.pop()
            image.image_file_small = require('@/assets/images/fanart/small/' + filename + '_Small.' + ext)
            filteredRecord.images.push(image)
            filteredRecord.has_media = true

            if (record['Is this lewd?'] === 'Yes') {
              filteredRecord.nsfw = true
            }
          })
        }
        if (!filteredRecord.message && !filteredRecord.has_media) {
          return
        }
        filteredMessages.push(filteredRecord)
      }
    )
    return {
      show_media_only: false,
      messages: filteredMessages
    }
  },
  watch: {
    show_media_only: function () {
      const masonry = this.masonry
      this.$nextTick(function () {
        masonry.reloadItems()
        masonry.layout()
      })
    }
  },
  mounted () {
    const comp = this
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      AOS.init({
        disable: 'mobile',
        offset: 120,
        delay: 50,
        duration: 1000,
        mirror: true,
        once: false
      })
      const masonry = new Masonry(
        document.querySelector('#messages'),
        {
          itemSelector: '.message-card:not([style*="display: none"])',
          columnWidth: '.message-card',
          transitionDuration: 0
        }
      )
      masonry.on('layoutComplete', function () {
        AOS.refresh()
      })
      document.querySelectorAll('img').forEach(item => {
        item.addEventListener('load', function (e) {
          // AOS.refresh()
          masonry.layout()
        })
      })

      $('.message-image,.message-youtube-vid').magnificPopup({
        type: 'image',
        // gallery: {
        //   enabled: true
        // },
        image: {
          titleSrc: function (item) {
            let caption = item.el.attr('author')
            if (typeof item.el.attr('title') !== 'undefined') {
              caption = caption + '<small>' + item.el.attr('title') + '</small>'
            }
            return caption
          }
        },
        iframe: {
          markup: '<div class="mfp-iframe-scaler">' +
              '<div class="mfp-close"></div>' +
              '<iframe class="mfp-iframe" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
              '<div class="mfp-title"></div>' +
            '</div>',
          patterns: {
            youtube: {
              index: 'youtube.com/',
              id: 'v=',
              src: '//www.youtube-nocookie.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
            }
          }
        },
        callbacks: {
          markupParse: function (template, values, item) {
            if (item.type === 'iframe') {
              values.title = item.el.attr('author')
              if (typeof item.el.attr('title') !== 'undefined') {
                values.title = values.title + '<small>' + item.el.attr('title') + '</small>'
              }
            }
          }
        }
      })

      comp.aos = AOS
      comp.masonry = masonry
    })
  }
}
</script>

<style>
.media-filter-toggle {
  margin-left: 1rem;
}

.mfp-title {
  position: absolute;
}

.mfp-figure small {
  white-space: pre-wrap;
}

@media (min-width:1025px) {
  .show-media-only .message-card.message-card.has_image, .show-media-only .message-card.message-card.has_video {
    width: calc(100% - 5rem - 2px);
  }
}

@media (min-width:1281px) {
  .show-media-only .message-card.message-card.has_image, .show-media-only .message-card.message-card.has_video {
    width: calc(50% - 5rem - 2px);
  }
}
</style>
