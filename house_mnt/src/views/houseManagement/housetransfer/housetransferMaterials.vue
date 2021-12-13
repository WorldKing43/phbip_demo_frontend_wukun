<template>
  <div>
    <Material :parameter="parameter" :show="show"></Material>
    <TitleStylex title="不动产权证书"></TitleStylex>
    <el-table
      :data="tableData"
      style="width: 100%;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :header-cell-style="{
				'background': '#E6F0FC',
				'color': '#606266',
				'border-color': '#DBDBDB',
			}"
      :cell-style="{
				'border-color': '#DBDBDB',
			}"
    >
      <el-table-column prop="name" label="文件名称" align="center"></el-table-column>
      <el-table-column prop="attributes.adddate" label="上传时间" sortable width="200" align="center"></el-table-column>
      <el-table-column prop="attributes.fileSize" label="文件大小" width="200" align="center"></el-table-column>
      <!-- <el-table-column prop="attributes.description" label="上传人" width="200" align="center"></el-table-column> -->
      <el-table-column
        prop="type"
        label="操作"
        width="280"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.type == 'material'">
            <span @click="downLoadClick(scope.row.attributes)">
              <i size="mini" class="iconfont el-icon-view" style="font-size:14px;display:inline-block;color:#057FF8;line-height:50px,margin:0 20px;"></i>&nbsp;查看
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span @click="downLoadClick(scope.row)">
              <i size="mini" class="iconfont icon-xiazai" style="font-size:14px;display:inline-block;color:#07DD00;line-height:50px,margin:0 20px;"></i>&nbsp;下载
            </span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogImage" class="ImageStyle" :before-close="handleClose">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import TitleStylex from "@/components/TitleStylex";
import Material from "@/components/CorrelativeMaterial";
import publicMethod from "@/api/publicMethod";
import { publicPath } from "@/api/paths.js";
export default {
  components: {
    Material,
    TitleStylex
  },
  data() {
    return {
      parameter: "",
      show: true,
      tableData:[],//不动产权证书列表数据
      dialogImageUrl:"",
      dialogImage:false,//
    };
  },
  created() {
    this.parameter = this.$route.params.guid;
    this.getMaterial();
  },
  methods: {
    //获取过程材料
    getMaterial() {
      let params = {
        guid: this.$route.params.guid,
        material: true,
        report: false
      };
      publicMethod
        .getMaterial(params)
        .then(res => {
          if (!res.id) {
            this.createMis();
          } else {
            this.parameter = this.$route.params.guid;
            this.Event.$emit("CorrelativeMaterial", "getMaterial");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, //创建过程材料
    createMis() {
      let businessName = "房源信息录入";
      let params = {
        businessName: businessName,
        guid: this.$route.params.guid
      };
      publicMethod
        .createMis(params)
        .then(res => {
          console.log(res);
          if (res) {
            this.parameter = this.$route.params.guid;
            this.Event.$emit("CorrelativeMaterial", "getMaterial");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRealPropertyList(){
      let params = {
        xqGuid: this.$route.params.guid
      }
      publicMethod.getRealPropertyList(params).then(res=>{
        // this.tableData = res;
        if(Array.isArray(res)){
          res.forEach(item=>{
          console.log(item);
            this.tableData.push(item.children[0])
          })
        }
      })
    },
    //下载按钮
    downLoadClick(row) {
      let _params = { fileName: row.name, fullPath: row.attributes.fullPath };
      let url = "";
      url =
        process.env.API +
        "/" +
        publicPath.downLoadMaterial +
        "?fileName=" +
        encodeURI(row.name) +
        "&fullPath=" +
        encodeURI(row.attributes.fullPath);
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
    // 查看大图
    downLoadClick (val) {
      console.log(val);
      this.dialogImageUrl = process.env.API + "/house/store/material/preview" + "?fileName=" + encodeURI(val.fileName) + "&fullPath=" + encodeURI(val.fullPath) + "&extension=" + encodeURI(val.extension);
      if (val.extension == "jpg"||val.extension == "png"||val.extension == "jpeg") {
        this.dialogImage = true;
      } else {
        window.open(this.dialogImageUrl);
      }
    },
    handleClose () {
      this.dialogImageUrl = ''
      this.dialogImage = false
    }
  },
  mounted() {
    this.getRealPropertyList();
    this.Event.$on("housetransferMaterials", data => {
      console.log(data);
      if (data == "getMaterial") {
        this.getMaterial();
      }
    });
  }
};
</script>

<style lang="scss" scoped></style>
