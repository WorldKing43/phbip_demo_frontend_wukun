<!--过程材料公共组件-流程通用组件-->
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'fileList', hasChildren: 'hasChildren'}"
      :header-cell-style="{
				'background': '#E6F0FC',
				'color': '#606266',
				'border-color': '#DBDBDB',
			}"
      :cell-style="{
				'border-color': '#DBDBDB',
			}"
    >
      <el-table-column prop="fileName" label="文件名称" align="center"></el-table-column>
      <el-table-column prop="adddate" label="上传时间" align="center"></el-table-column>
      <el-table-column prop="description" label="上传人" align="center"></el-table-column>
      <el-table-column
        prop="type"
        label="操作"
        align="center"
        v-if="!(this.$route.params.state=='done')&&!(this.$route.query.state=='done')&&!(this.$route.query.activityName=='已下达')"
      >
        <template slot-scope="scope">
          <el-upload
            v-if="scope.row.fileList"
            class="upload-demo"
            ref="upload"
            :http-request="uploadFile"
            action
            :show-file-list="false"
            accept=".xls, .xlsx, .doc, .docx, .ppt, .txt"
          >
            <span @click="uploadClick(scope.row)">
              <i
                size="mini"
                class="iconfont icon-shangchuan"
                style="font-size:14px;display:inline-block;color:#F5A623;line-height:50px,margin:0 20px;"
              ></i>&nbsp;上传
            </span>
          </el-upload>
          <span v-if="scope.row.fullPath">
            <span @click="downLoadClick(scope.row)">
              <i
                size="mini"
                class="iconfont icon-xiazai"
                style="font-size:14px;display:inline-block;color:#07DD00;line-height:50px,margin:0 20px;"
              ></i>&nbsp;下载
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span @click="deleteClick(scope.row)">
              <i
                size="mini"
                class="iconfont icon-shanchu1"
                style="font-size:14px;display:inline-block;color:#E34256;line-height:50px,margin:0 20px;"
              ></i>&nbsp;删除
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="操作"
        align="center"
        v-if="this.$route.params.state=='done'|this.$route.query.state=='done'|this.$route.query.activityName=='已下达'"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.fullPath">
            <span @click="downLoadClick(scope.row)">
              <i
                size="mini"
                class="iconfont icon-xiazai"
                style="font-size:14px;display:inline-block;color:#07DD00;line-height:50px,margin:0 20px;"
              ></i>&nbsp;下载
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Axios from "axios";
import { publicPath } from "@/api/paths.js";
import api from "@/api/publicMethod";

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tableData: []
    };
  },
  props: ["parameter"],
  methods: {
    //删除按钮
    deleteClick(row) {
      this.$confirm("确定删除所选材料?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _params = { id: row.id };
          let _data = {};
          api
            .deleteMaterial(_params, _data)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getMaterial(); //材料附件-获取材料
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //下载按钮
    downLoadClick(row) {
      let _params = { fileName: row.fileName, fullPath: row.fullPath };
      let url = "";
      url =
        process.env.API +
        "/" +
        publicPath.downLoadMaterial +
        "?fileName=" +
        encodeURI(row.fileName) +
        "&fullPath=" +
        encodeURI(row.fullPath);
      console.log(url);
      //window.location.href = url;
      var elemIF = document.createElement("iframe");
      elemIF.src = url;
      elemIF.style.display = "none";
      elemIF.onload = function() {
        setTimeout(function() {
          elemIF.remove();
        }, 2000);
      };
      document.body.appendChild(elemIF);
    },
    //上传按钮
    uploadClick(row) {
      console.log(row);
      this.dirId = row.id;
    },
    // 获取文件
    uploadFile(context) {
      let _params = { dirId: this.dirId };
      let _data = new FormData();
      _data.append("file", context.file);
      let _config = { headers: { "Content-Type": "text/plain" } };
      api
        .uploadMaterial(_params, _data, _config)
        .then(res => {
          console.log(res);
          this.tableData.description = res[0].description;
          this.tableData.fileSize = res[0].fileSize;
          this.$message({
            type: "success",
            message: "上传成功"
          });
          this.getMaterial(); //材料附件-获取材料
        })
        .catch(err => {
          console.log(err);
        });
    },
    //材料附件-获取材料
    getMaterial() {
      let _params = { projectId: this.parameter };
      api
        .createMisFlow(_params)
        .then(res => {
          this.tableData = res[0].children;
          this.tableData.forEach(element => {
            element.fileName = element.directoryName;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //材料附件-获取材料
    getMaterial() {
      console.log("===this.parameter", this.parameter);
      if (!this.parameter) {
        // this.$alert("查询不到基本信息", "提示", {
        // 	confirmButtonText: "确定"
        // });
      } else {
        console.log(this.parameter, "-*-*-*-*-*-*");
        let _params = { projectId: this.parameter };
        api
          .createMisFlow(_params)
          .then(res => {
            if (res.length > 0) {
              this.tableData = res[0].children;
              console.log(this.tableData);
              this.tableData.forEach(element => {
                element.fileName = element.directoryName;
                // element.hasChildren = true
                console.log(this.tableData);
                return;
              });
            }
            // if(res.length > 0){
            // 	let neeTable = res[0].children
            // 	console.log(neeTable)
            // 	neeTable.forEach(element => {
            // 		element.fileName = element.directoryName
            // 		element.hasChildren = true
            // 		console.log(neeTable)
            // 		this.tableData = neeTable
            // 		console.log(this.tableData)
            // 		return
            // 	})
            // }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.getMaterial();
    console.log("==6999");
  }
};
</script>

<style lang="scss" scoped>
.el-table__header {
  width: 100%;
}
.all {
  border-color: #dbdbdb;
}
</style>