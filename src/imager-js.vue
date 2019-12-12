<template>
  <div class="ac-simple-imager-editor">
      <div class="image-container" ref="img_container">
      </div>
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
      image_url: String,

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
        imagerJsNamespace: {}
    }
  },

  mounted() {
    this.set_init_imager()
  },

  destroyed() {
    this.imager.remove(true)
    this.imager = null
  },

  methods: {
        /**
         * Create imager instance and start editing 
         */
        set_init_imager() {
          const info = imagerjs({
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

          const image = new Image()
          image.src = this.image_url || "";
          image.width = this.image_attrs.width || 250;
          image.height = this.image_attrs.height || 250;
          image.setAttribute('crossorigin', 'anonymous') 

          image.onload = this.$nextTick(() => {
            const $image_container = $(this.$refs.img_container)
            $image_container.append($(image))
            const imager = new this.imagerJsNamespace.Imager($image_container.find('img'), options);

            this.imager = imager

            if (this.image_url) {
              imager.on('ready', () => {
                this.startEditing()
              })
            } else {
              this.startSelector()
            }

            imager.on('editStart', () => {
              imager.$imageElement.css({
                minWidth: 'auto',
                minHeight: 'auto'
              });
              const quality_selector = new this.imagerJsNamespace.ImagerQualitySelector(imager, options.quality);
              const quality_container = $('<div class="imager-quality-standalone"></div>');
              
              quality_container.append(quality_selector.getElement());
              imager.$editContainer.append(quality_container);

              quality_selector.show();
              quality_selector.update();
            });
          })
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
.ac-simple-imager-editor {
  margin: 50px
}
</style>