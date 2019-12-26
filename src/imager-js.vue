<template>
    <div class="image-container">
      <img ref="img_element" crossorigin="anonymous" :src="image_url" v-bind="image_attrs">
    </div>
</template>

<script>
import './imager-js.min.css'
import { CreateOptions } from './imager-config' 
import imagerjs from './imager.min.js'
import $ from 'jquery'

export default {
  name: 'imager-js',

  props: {
      image_url: {
        type: String,
        default: ''
      },

      image_attrs: {
        type: Object,
        default: () => ({})
      },

      save_image_mime_type: {
        type: String,
        default: 'image/png'
      }
  },

  data() {
    return {
        // instance of ImagerJs
        imager: null,
        imagerJsNamespace: {},
        imageIsLoaded: false
    }
  },

  mounted() {
    this.set_init_imager()
  },

  destroyed() {
    // Remove iamgejs element
    if (this.imager.$selectorContainer) this.imager.$selectorContainer.remove()
    this.imager.remove(true)
    this.imager = null
  },

  watch: {
    image_url(value) {
      this.stopEditing()

      if (value) {
        this.imageIsLoaded = false;
        this.$nextTick(() => {
          this.imageIsLoaded = true
          this.startEditing()
        })
      } else {
        this.startSelector()
      }
    }
  },

  methods: {
        /**
         * Create imager instance and start editing 
         */
        set_init_imager() {
          imagerjs({
            $,
            namespace: this.imagerJsNamespace
          })

          const save_config = {
            Save: {
              upload: true,
              uploadFunction: this.saveImage
            }
          }

          const options = CreateOptions({
            pluginsConfig: save_config
          })

          const imager = new this.imagerJsNamespace.Imager(this.$refs.img_element, options);
          this.imager = imager

          if (this.image_url) {
            imager.on('ready', () => {
              if (this.imageIsLoaded) return;
              this.imageIsLoaded = true
              this.startEditing()
            })
          } else {
            this.startSelector()
          }

          this.imager.on('editStart', () => {
            this.imager.$imageElement.css({
              minWidth: 'auto',
              minHeight: 'auto'
            });
            const quality_selector = new this.imagerJsNamespace.ImagerQualitySelector(this.imager, options.quality);
            const quality_container = $('<div class="imager-quality-standalone"></div>');
            
            quality_container.append(quality_selector.getElement());
            this.imager.$editContainer.append(quality_container);

            quality_selector.show();
            quality_selector.update();
          });
        },

        startEditing() {
          this.imager.startEditing();
        },

        stopEditing() {
          this.imager.stopEditing();
        },

        startSelector() {
          this.imager.startSelector();
        },

        saveImage() {
          const emit = (data) => this.$emit('save', data)
          this.imager.canvas.toBlob(emit, this.save_image_mime_type, this.imager.quality)
        }
  }
}
</script>
<style scoped>
img {
  width: 250px;
  height: 250px;
}
</style>