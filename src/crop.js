import React from "react";
import "cropperjs/dist/cropper.css"
import Cropper from 'react-cropper'

const FILE_TYPES = ["image/jpg", "image/png", "image/jpeg", "image/bmp"];
export default class Crop extends React.Component {
  
 
  constructor(props) {
      super(props);
      this.state = {
          src: null,
          fileName: "newFile.jpeg"
      }
      this.onChange = this.onChange.bind(this);
  }
   
  onChange(e) {
      e.preventDefault();
      let files;
      if(e.dataTransfer) {
          files = e.dataTransfer.files;
      } else if(e.target) {
          files = e.target.files;
      }

      console.log("11",files[0].type);
   
      if(files.length > 0){
          // 验证 files[0] 信息的文件大小
          const fileMaxSize = 5120;
          let fileSize = files[0].size/1024;
          if(fileSize > fileMaxSize){
              alert("文件不能大于1M！");
              return false;
          } else if(fileSize <= 0) {
              alert("文件不能为0");
              return false;
          }
   
          // 验证 files 信息的文件类型
          const fileType = files[0].type;
          console.log(fileType);
          if(!FILE_TYPES.includes(fileType)) {
              alert("不接受此文件类型");
              return false;
          }        
          
          const reader = new FileReader();
          reader.onload = () => {
              this.setState({
                  src: reader.result
              })
          }
          reader.readAsDataURL(files[0]);
   
      } else {
          if(this.state.src === null) {
              alert("请选择文件");
          }
          return false;
      }
    }
  
  uploadImg() {
      if(this.state.src === null) {
          alert("请选择图片");
          return false;
      }
   
      // const croppedCanvas = this.cropper.getCroppedCanvas({
      //     minWidth: 200,
      //     minHeight: 200,
      //     width: 200,
      //     height: 200,
      //     maxWidth: 200,
      //     maxHeight: 200
      // });
   
      // if(typeof croppedCanvas === "undefined") {
      //     return;
      // }
      // croppedCanvas.toBlob(async blob => {
      //     // 图片name添加到blob对象里
      //     blob.name = this.state.fileName;
      //     // 创建提交表单数据对象
      //     const filedata = new FormData();
      //     // 添加要上传的文件
      //     filedata.append('file', blob, blob.name);
          
      //     // try {
      //     //     // 接口
      //     //     let res = await upload(filedata, token);
      //     //     if(res.errCode === 0) {
      //     //         // 上传成功
      //     //     } else {
      //     //         // 上传失败
      //     //     }
      //     // } catch(err) {
      //     //     console.log(err);
              
      //     // }
      // }, "image/jpeg")
    }
render() {
  return (
      <div>
          <div>
              <div>
                  <Cropper 
                      style={{ width: 300, height: 200 }}
                      aspectRatio={1} 
                      // initialAspectRatio={16 / 9}
                      preview=".uploadCrop"
                      guides={false} 
                      src={this.state.src}
                      ref={cropper => {this.cropper = cropper}}
                  />
              </div>
              <div>
                  <div className="uploadCrop" />
              </div>
          </div>
          <div>
              <input type="file" title="" accept="image/*" onChange={this.onChange} />
              <input type="button" value="上传" onClick={() => this.uploadImg()} />
          </div>
      </div>
  )
}
}