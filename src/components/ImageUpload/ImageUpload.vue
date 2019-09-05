<template>
  <div class="upload">
    <!-- 图片上传控件 -->
    <div class="load" v-show="(!imgUrl)">
      <input type="file" name="" id="form" @change="uploadIMG">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: {
    uploadUrl: Boolean
  },
  watch: {
    uploadUrl: function () {
      if (this.uploadUrl === false) {
        this.imgUrl = null
      }
    }
  },
  data () {
    return {
      picavalue: '',
      imgUrl: null,
      test: null,
      isEnlargeImage: false,
      img: '',
      images: [],
      count: 0
    }
  },
  methods: {
    uploadIMG (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.picavalue = files[0]
      if (this.picavalue.size / 1024 > 5000) {
        this.$message({
          message: 'The image is too large for the system, please upload it somewhere else and copy the URL',
          type: 'warning'
        })
      } else {
        this.imgPreview(this.picavalue)
      }
    },
    imgPreview (file, callback) {
      let self = this
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        let reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          img.onload = function () {
            // let data = self.compress(img)
            self.imgUrl = result
            self.test = result
            self.images.push(self.imgUrl)
            self.count++
            self.$emit('chileEvent', self.imgUrl)
          }
        }
      }
    }
  }
}
</script>

<style>
.upload {
  position: relative;
  width: 50px;
  height: 20px;
}

.upload .cha {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    border: 1px dashed #cccccc;
    overflow: hidden;
    box-sizing: border-box;
}
.upload .cha .layer {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 300px;
      background-color: rgba(0, 0, 0, 0.3);
      text-align: center;
      line-height: 200px;
      opacity: 0;
      color: #ffffff;
      border: none;
    }
.upload .cha .del {
      position: absolute;
      bottom: 0;
      right: 0;
      opacity: 0;
      z-index: 2;
      border: none;
    }
.upload .cha img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
      border: none;
    }

.upload .cha:hover .layer,
.upload .cha:hover .del {
    opacity: 1;
  }

.upload .load {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
}

</style>
