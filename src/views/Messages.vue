<template>
  <div id="messages-view">
    <div class="media-filter-toggle-wrapper" data-aos="fade-in">
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
import MessagesCSV from '@/assets/csv/messages.csv'

import Masonry from 'masonry-layout'
import AOS from 'aos'

import $ from 'jquery'
import 'magnific-popup/dist/jquery.magnific-popup'

const countries = require('i18n-iso-countries')
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/ja.json'))

export default {
  name: 'Messages',
  components: {
    Message
  },
  data: () => {
    const filteredMessages = []
    MessagesCSV.map(
      (record, idx) => {
        const filteredRecord = {
          idx: idx,
          name: record.Name,
          twitter: record['Twitter ID'],
          country_code: null,
          country_name: null,
          message: null,
          submessage: null,
          images: [],
          youtube_id: null,
          has_media: false,
          lang: null
        }
        if (record.Message) {
          filteredRecord.message = record.Message
          if (record['Message (Native)']) {
            filteredRecord.submessage = filteredRecord.message
            filteredRecord.message = record['Message (Native)']
          }
          const jpCharacters = filteredRecord.message.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/)
          if (jpCharacters !== null) {
            filteredRecord.lang = 'ja'
          }
        }
        // if (record['Video Submission (Accepted/Pending/Rejected/NONE)'] === 'Accepted' && record['Youtube ID']) {
        //   filteredRecord.youtube_id = record['Youtube ID']
        //   filteredRecord.has_media = true
        // }
        if (record.art) {
          const imageFiles = record.art.split(',')
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
          })
        }
        if (record['Place of Origin']) {
          const country = record['Place of Origin']
          const countryCode = countries.getAlpha2Code(country, 'en')
          if (countryCode) {
            filteredRecord.country_code = countryCode.toLowerCase()
            filteredRecord.country_name = countries.getName(countryCode, 'en') + ' / ' + countries.getName(countryCode, 'ja')
          }
        }
        if (!filteredRecord.message && !filteredRecord.has_media) {
          return
        }
        filteredMessages.push(filteredRecord)
      }
    )
    return {
      is_scrolling: false,
      to_refresh_layout: false,
      show_media_only: false,
      messages: filteredMessages
    }
  },
  methods: {
    refreshMasonry: function () {
      setTimeout(() => {
        this.masonry.layout()
      }, 150)
    },
    checkIsScrolling () {
      this.is_scrolling = true
      if (this.timer !== null) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.is_scrolling = false
      }, 150)
    },
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
    initMasonry () {
      this.masonry = new Masonry(
        document.querySelector('#messages'),
        {
          itemSelector: '.message-card:not([style*="display: none"])',
          columnWidth: '.message-card',
          transitionDuration: 0
        }
      )
      this.masonry.on('layoutComplete', () => {
        if (this.aos) {
          this.aos.refresh()
        }
        this.$Progress.finish()
      })
      document.querySelectorAll('#messages img').forEach(item => {
        item.addEventListener('load', (e) => {
          this.to_refresh_layout = true
        })
      })
    },
    initMagnificPopup () {
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
    }
  },
  watch: {
    show_media_only: function () {
      this.$nextTick(() => {
        this.$Progress.start()
        this.masonry.reloadItems()
        this.refreshMasonry()
      })
    },
    to_refresh_layout: function () {
      if (!this.to_refresh_layout) {
        return
      }
      if (this.is_scrolling) {
        return
      }
      this.to_refresh_layout = false
      this.$nextTick(() => {
        this.$Progress.start()
        this.refreshMasonry()
      })
    },
    is_scrolling: function () {
      if (!this.is_scrolling && this.to_refresh_layout) {
        this.to_refresh_layout = false
        this.$nextTick(() => {
          this.$Progress.start()
          this.refreshMasonry()
        })
      }
    }
  },
  mounted () {
    this.timer = null
    window.addEventListener('scroll', this.checkIsScrolling)
    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been rendered
      this.initMagnificPopup()
      this.initMasonry()
      this.initAOS()
    })
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.checkIsScrolling)
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

@media (min-width:801px)  {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
  .show-media-only .message-card.message-card.has_image, .show-media-only .message-card.message-card.has_video {
    width: calc(100% - 5rem - 2px);
  }
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
