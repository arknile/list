<template>
  <div class="upload">
    <!-- 图片展示 -->
    <div class="cha" v-show="(imgUrl)">
      <!-- 删除icon -->
      <div class="del"><i class="el-icon-delete" @click="delImg"></i></div>
      <!-- 放大icon -->
      <div class="layer"><i @click="isEnlargeImage = true" class="el-icon-view"></i></div>
    </div>
    <!-- 图片上传控件 -->
    <div class="load" v-show="(!imgUrl)">
      <input type="file" name="" id="form" @change="uploadIMG">
    </div>
    <!-- 图片预览弹框 -->

            <img @click="isEnlargeImage = false" style="width:100%;" :src="imgUrl">

  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: ['uploadUrl'],
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
      // console.log(this.picavalue.size / 1024)
      if (this.picavalue.size / 1024 > 5000) {
        this.$message({
          message: 'The image is too large for the system, please upload it somewhere else and paste the URL',
          type: 'warning'
        })
      } else {
        this.imgPreview(this.picavalue)
      }
    },
    // 获取图片
    imgPreview (file, callback) {
      let self = this
      // 判断支不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()

        // 将图片转成base64格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          // console.log('********未压缩前的图片大小********')
          // console.log(result.length)
          img.onload = function () {
            // let data = self.compress(img)
            self.imgUrl = result
            console.log(self.imgUrl)
            self.test = result
            self.images.push(self.imgUrl)
            self.count++
            self.$emit('chileEvent', self.imgUrl)
            /* let blob = self.dataURItoBlob(data)

            console.log('*******base64转blob对象******')
            console.log(blob)

            /* var formData = new FormData()
            formData.append('file', blob)
            console.log('********将blob对象转成formData对象********')
            console.log(formData.get('file'))
            let config = {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
            // 发送请求;
            self.axios.post(self.uploadUrl.url, formData, config).then(res => {
              // console.log(res);
              // console.log(res.data.data.resultftphost)
              // console.log(res.data.data.resulturl)
              // this.$emit('')
              if (res.data.code === 200) {
                self.$emit(
                  'getImgsrc',
                  res.data.data.resultftphost,
                  res.data.data.resulturl
                )
              } else {
                self.$message({
                  message: '图片上传失败，请重试',
                  type: 'warning'
                })
              }
            }) */
          }
        }
        console.log(this.imgUrl)
        // this.$emit('chileEvent', '1')
      }
    },
    // 压缩图片
    /* compress (img) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // let initSize = img.src.length
      let width = img.width
      let height = img.height
      canvas.width = width
      canvas.height = height
      // 铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, width, height)

      // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      // console.log('*******压缩后的图片大小*******')
      // console.log(ndata)
      // console.log(ndata.length)
      return ndata
    },
    // base64转成bolb对象
    /* dataURItoBlob (base64Data) {
      var byteString
      if (base64Data.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(base64Data.split(',')[1])
      } else {
        byteString = unescape(base64Data.split(',')[1])
      }
      var mimeString = base64Data
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]
      var ia = new Uint8Array(byteString.length)
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ia], { type: mimeString })
    }, */
    // 删除事件
    delImg () {
      this.imgUrl = null
    }
  }
}
</script>

<style>
.upload {
  position: relative;
  width: 400px;
  height: 420px;
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
    left: 50%;
    width: 200px;
    height: 400px;
    border: 1px dashed #cccccc;
}

.upload .load::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 80%;
    border-right: 1px solid #cccccc;
  }
.upload .load:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    border-top: 1px solid #cccccc;
  }
</style>
