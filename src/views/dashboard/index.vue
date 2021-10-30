<template>
  <a-form :form="form">  
    <a-form-item label="名称" style="margin-bottom: 0;">  
        <!-- <a-input v-decorator="['name', {rules: [{required: true, message: '请输入名称！'}]}]" />   -->
    </a-form-item>
    <a-form-item>  
     <!--  <a-upload  
      :multiple="true"  
      :fileList="downloadFiles" 
      :remove="handleDownloadFileRemove" 
      :customRequest="downloadFilesCustomRequest" 
      >  
        <a-button class="upload-btn"> <a-icon type="upload" > 相关下载 </a-button>  
      </a-upload>   -->
      <a-upload-dragger
    name="file"
    :multiple="true"
    :file-list="downloadFiles" 
    :remove="handleDownloadFileRemove" 
    :before-upload="downloadFilesCustomRequest"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading
      company data or other band files
    </p>
  </a-upload-dragger>
  <a-button class="upload-btn" @click="onSubmit">  提交</a-button>  
    </a-form-item>
</a-form>
</template>

<script>
import { mapGetters } from "vuex";
import { upload } from '@/api/config'
export default {
  name: "Dashboard",
  data() {
    return {
      form: this.$form.createForm(this), // 表单数据初始化
      downloadFiles: [], // 已经上传的文件列表.
      formData:[]
    };
  },
  components: {
   
  },
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
     // 重写a-upload的文件上传处理方式
    downloadFilesCustomRequest(data) {
      
      this.saveFile(data);
      return false;
    },
    // 上传并保存文件
    saveFile(data) {
      const file = new FormData();
      // this.formData = [];
      file.append("files", data);
      this.formData.push(file)
      this.downloadFiles.push(data);

    },
    // 对上传成功返回的数据进行格式化处理，格式化a-upload能显示在已上传列表中的格式（这个格式官方文档有给出的）
    fileFormatter(data) {
      let file = {
        uid: data.uuid, // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
        name: data.name, // 文件名
        status: "done", // 状态有：uploading done error removed
        response: '{"status": "success"}', // 服务端响应内容
      };
      return file;
    },
    // 没错，删除某个已上传的文件的时候，就是调用的这里
    handleDownloadFileRemove(file) {
      const index = this.downloadFiles.indexOf(file);
      const newFileList = this.downloadFiles.slice();
      newFileList.splice(index, 1);
      this.downloadFiles = newFileList;
    },
    async onSubmit(){
      const files = new FormData();
      
      for(let i=0;i<this.formData.length;i++){
        //this.formData[i].getAll("files");
        console.log(this.formData[i].get("files"));
        files.append("files", this.formData[i].get("files"));
      }

      let res = await upload(files)
      console.log(res);
      if(res){
          // let file = this.fileFormatter(res.data);
          // 上传单个文件后，将该文件会先到a-upload组件的已上传文件列表中的操作
          this.$message.success("上传成功");
      }else{
        this.$message.error(res.msg);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
