<!--房源信息-->
<template>
  <div class="housingInformation">
    <div class="top">
      <el-form ref="form" :model="form" label-width="3.5rem" size="mini">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="栋名称">
              <el-input v-model="form.buildingName" clearable @change="query(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房产来源" label-width="4.5rem">
              <el-select
                v-model="form.source"
                placeholder="--请选择--"
                class="w100"
                clearable
                @change="query(1)"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="item in sourceData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户型" prop="state">
              <el-select
                v-model="form.type"
                placeholder="--请选择--"
                class="w100"
                clearable
                @change="query(1)"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="item in typeData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="朝向">
              <el-select
                v-model="form.orientation"
                placeholder="--请选择--"
                class="w100"
                clearable
                @change="query(1)"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="item in orientationData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="预测绘建筑面积" label-width="7.5rem">
              <el-row :gutter="0">
                <el-col :span="11">
                  <el-input
                    v-model="form.coveredAreaMin"
                    clearable
                    @keyup.native="proving2"
                    @change="query(1)"
                  ></el-input>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center">-</el-col>
                <el-col :span="11">
                  <el-input
                    v-model="form.coveredAreaMax"
                    clearable
                    @keyup.native="proving1"
                    @change="query(1)"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房屋性质" label-width="4.5rem">
              <el-select
                v-model="form.nature"
                placeholder="--请选择--"
                class="w100"
                clearable
                @change="query(1)"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="item in natureData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="竣工建筑面积" label-width="6.5rem">
              <el-row :gutter="0">
                <el-col :span="11">
                  <el-input v-model="form.completionAreabegain" clearable @change="query(1)"></el-input>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center">-</el-col>
                <el-col :span="11">
                  <el-input v-model="form.completionAreaEnd" clearable @change="query(1)"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房号">
              <el-input v-model="form.houseNo" clearable @change="query(1)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          
          <el-col :span="24" style="text-align:right">
            <el-button
              type="primary"
              @click="query(1)"
              size="mini"
              v-if="hasPerm('fygl_fyxxkw_fyxx_cx')"
            >查询</el-button>
            <el-button
              type="primary"
              @click="reset"
              size="mini"
              v-if="hasPerm('fygl_fyxxkw_fyxx_cz')"
            >重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="aside-btn">
        <div class="left_btn">
          <el-button 
              type="danger"
              @click="deleteData"
              size="mini"
              :disabled="(this.$route.query.activityName == '审批')"
              v-if="hasPerm('fygl_fyxxkw_fyxx_sc') && !(this.$route.params.state == 'done')"
            >删除</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="bulkEditingDialog()"
              :disabled="(this.$route.query.activityName == '审批')"
              v-if="!(this.$route.params.state == 'done')&&hasPerm('fygl_fyxxkw_fyxx_plxg')"
            >批量修改</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="downloadTemplate('largeArea')"
              :disabled="(this.$route.query.activityName == '审批')"
              v-if="!(this.$route.params.state == 'done')&&hasPerm('fygl_fyxxkw_fyxx_xzmjmb')"
            >下载面积模板</el-button>
            <el-button
              type="primary"
              size="mini"
              :disabled="(this.$route.query.activityName == '审批')"
              v-if="!(this.$route.params.state == 'done')&&hasPerm('fygl_fyxxkw_fyxx_drmj')"
              @click="openImportAreaDialog('largeArea')"
            >导入面积</el-button>
            <el-button
              type="warning"
              size="mini"
              :disabled="(this.$route.query.activityName == '审批')"
              v-if="!(this.$route.params.state == 'done')&&hasPerm('fygl_fyxxkw_fyxx_drxq')"
              @click="openDownloadDetailDialog('largeArea')"
            >导入详情</el-button>
        </div>
        <div class="right_btn">
          <el-button type="primary" size="mini" :disabled="(this.$route.query.activityName == '审批')" v-if="hasPerm('fygl_fyxxkw_fyxx_xzmb') && !(this.$route.params.state == 'done')" @click="downloadTemplate('smallArea')">下载模板</el-button>
          <el-button type="primary" size="mini" :disabled="(this.$route.query.activityName == '审批')" v-if="hasPerm('fygl_fyxxkw_fyxx_drfwxx') && !(this.$route.params.state == 'done')" @click="openImportAreaDialog('smallArea')">导入房屋信息</el-button>
          <el-button type="warning" size="mini" :disabled="(this.$route.query.activityName == '审批')" v-if="hasPerm('fygl_fyxxkw_fyxx_drxqqj') && !(this.$route.params.state == 'done')" @click="openDownloadDetailDialog('smallArea')">导入详情</el-button>
        </div>
      </div>
    <div>
            
    </div>
    <!--结果列表-->
    <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
      <el-table
        :data="tableData"
        border
        @cell-dblclick="goDetail"
        @selection-change="handleSelectionChangeList"
        @row-click="clickRow"
        ref="houseTable"
        size="mini"
        style="width: 100%"
        :header-cell-style="globalHeaderStyle"
        :row-class-name="tableRowClassName"
        :cell-style="statusStyle"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
        <el-table-column prop="districtName" label="小区名称"></el-table-column>
        <el-table-column prop="buildNo" label="栋号"></el-table-column>
        <el-table-column prop="buildName" label="栋名称"></el-table-column>
        <el-table-column prop="houseNo" label="房号"></el-table-column>
        <el-table-column prop="houseLayoutName" label="户型"></el-table-column>
        <el-table-column prop="orientationName" label="朝向"></el-table-column>
        <el-table-column prop="coveredArea" label="预测绘建筑面积(平方米)"></el-table-column>
        <el-table-column prop="completionArea" label="竣工建筑面积(平方米)"></el-table-column>
        <el-table-column prop="specification" label="备注"></el-table-column>
        <el-table-column prop="stateName" label="房屋状态"></el-table-column>
        <el-table-column
          label="操作"
          width="200px"
          v-if="!((this.$route.params.state == 'done')||(this.$route.query.activityName == '审批'))"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="goDetail(scope.row)"
              v-if="hasPerm('fygl_fyxxkw_fyxx_ck')"
            >编辑</el-button>
            <el-button
              type="warning"
              v-if="(scope.row.state == 0) && hasPerm('fygl_fyxxkw_fyxx_hf')"
              size="mini"
              @click="recoverHouseInfo(scope.row)"
            >恢复</el-button>
            <el-button type="primary" v-else size="mini" @click="deleteHouse(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100px"
          v-if="this.$route.params.state == 'done'||this.$route.query.activityName == '审批'"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="goDetail(scope.row)"
              v-if="hasPerm('fygl_fyxxkw_fyxx_ck')"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页功能 -->
    <div class="page_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizesList"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumber"
        background
      ></el-pagination>
    </div>
    <!-- 批量修改 -->
    <el-dialog
      title="批量修改"
      :visible.sync="bulkEditingDialogVisible"
      width="60%"
      :close-on-click-modal="false"
    >
      <div class="tableStyle">
        <table :model="formData">
          <tr>
            <td>已选房号</td>
            <td colspan="3">
              <el-input v-model="houseList" size="mini" disabled></el-input>
            </td>
          </tr>
          <tr>
            <td>所在单元</td>
            <td>
              <el-input v-model="formData.unit" size="mini" clearable></el-input>
            </td>
            <td>所在楼层</td>
            <td>
              <el-input v-model="formData.floorNo" size="mini" clearable></el-input>
            </td>
          </tr>
          <tr>
            <td>房屋来源</td>
            <td>
              <el-select
                v-model="formData.source"
                style="width: 100%;"
                placeholder="--请选择--"
                size="mini"
                clearable
              >
                <el-option
                  v-for="(item, index) in sourceData"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </td>
            <td>房屋用途</td>
            <td>
              <el-select style="width: 100%;" v-model="formData.function" size="mini" clearable>
                <el-option
                  v-for="(item, index) in functionData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>户型</td>
            <td>
              <el-select
                v-model="formData.houseLayout"
                placeholder="--请选择--"
                size="mini"
                style="width: 100%;"
                clearable
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item, index) in typeData"
                  :key="index"
                ></el-option>
              </el-select>
            </td>
            <td>朝向</td>
            <td>
              <el-select
                v-model="formData.orientation"
                placeholder="--请选择--"
                style="width: 100%;"
                size="mini"
                clearable
              >
                <el-option
                  v-for="(item, index) in orientationData"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>平台</td>
            <td>
              <el-select
                style="width: 100%;"
                v-model="formData.terrace"
                size="mini"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="(item, index) in terraceData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>是否有架空层</td>
            <td>
              <el-select
                style="width: 100%;"
                v-model="formData.innerFloor"
                placeholder
                size="mini"
                clearable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>(预测绘)建筑面积</td>
            <td style="position:relative">
              <el-input v-model="formData.coveredArea" size="mini" clearable></el-input>
              <span style="position:absolute;top:2px;right:2px;">平方米</span>
            </td>
            <td>(预测绘)套内面积</td>
            <td style="position:relative">
              <el-input v-model="formData.indoorArea" size="mini" clearable></el-input>
              <span style="position:absolute;top:2px;right:2px;">平方米</span>
            </td>
          </tr>
          <tr>
            <td>(预测绘)分摊面积</td>
            <td style="position:relative">
              <el-input v-model="formData.residentialPoolArea" size="mini" clearable></el-input>
              <span style="position:absolute;top:2px;right:2px;">平方米</span>
            </td>
            <td>竣工建筑面积</td>
            <td style="position:relative">
              <el-input v-model="formData.completionArea" size="mini" clearable></el-input>
              <span style="position:absolute;top:2px;right:2px;">平方米</span>
            </td>
          </tr>
          <tr>
            <td>竣工套内面积</td>
            <td style="position:relative">
              <el-input v-model="formData.completionIndoorArea" size="mini" clearable></el-input>
              <span style="position:absolute;top:2px;right:2px;">平方米</span>
            </td>
            <td>竣工分摊面积</td>
            <td style="position:relative">
              <el-input v-model="formData.completionShareArea" size="mini" clearable></el-input>
              <span style="position:absolute;top:2px;right:2px;">平方米</span>
            </td>
          </tr>
          <tr>
            <td>分摊面积说明</td>
            <td colspan="3">
              <el-input
                type="textarea"
                v-model="formData.residentialAreaContent"
                size="mini"
                clearable
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>开工时间</td>
            <td>
              <el-date-picker
                type="date"
                v-model="formData.startConstructionTime"
                size="mini"
                placeholder="选择日期"
                clearable
                style="width:100%"
              ></el-date-picker>
            </td>
            <td>竣工时间</td>
            <td>
              <el-date-picker
                type="date"
                v-model="formData.finishConstructionTime"
                size="mini"
                placeholder="选择日期"
                clearable
                style="width:100%"
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td>交付使用时间</td>
            <td>
              <el-date-picker
                type="date"
                size="mini"
                v-model="formData.deliveryTime"
                placeholder="选择日期"
                clearable
                style="width:100%"
              ></el-date-picker>
            </td>
            <td>是否样板房</td>
            <td>
              <el-select
                style="width: 100%;"
                v-model="formData.modelHouses"
                placeholder="请选择"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>是否代售</td>
            <td>
              <el-select
                style="width: 100%;"
                v-model="formData.helpSell"
                placeholder
                size="mini"
                clearable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>装修标准</td>
            <td>
              <el-select
                style="width: 100%;"
                v-model="formData.decorationType"
                placeholder
                @change="changeDecorationType"
                size="mini"
                clearable
              >
                <el-option
                  v-for="(item,index) in DistrictRenovationList"
                  :key="index"
                  :label="item.renovationCode"
                  :value="item.renovationCode"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>装修标准说明</td>
            <td>
              <el-tooltip class="item" effect="dark" content="此处利用鼠标可拖动" placement="right-end">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="formData.decorationTypeDescription"
                  disabled
                ></el-input>
              </el-tooltip>
            </td>
            <td>备注</td>
            <td>
              <el-input v-model="formData.specification" size="mini" clearable></el-input>
            </td>
          </tr>
        </table>
        <div style="text-align:center;margin-top:10px;">
          <el-button @click="bulkEditingDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="bulkEditing" size="mini">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 左方导入详情 -->
    <el-dialog
      title="导入详情"
      :visible.sync="downloadDetailDialog"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-button type="primary" size="mini" @click="deleteDownload()">删除</el-button>
      <i style="color:red;font-size:18px;">总共{{importAreaInfoPage.totalNumber}}条数据！</i>
      <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
        <el-table
          :data="downloadDetailList"
          border
          @selection-change="downloadListSelectData"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
          <el-table-column prop="DONGH" label="栋号"></el-table-column>
          <el-table-column prop="DONGMC" label="栋名称"></el-table-column>
          <el-table-column prop="FANGH" label="房号"></el-table-column>
          <el-table-column prop="JUNGMJ" label="竣工建筑面积(平方米)"></el-table-column>
          <el-table-column prop="JUNGGTMJ" label="竣工分摊面积(平方米)"></el-table-column>
          <el-table-column prop="JUNGTNMJ" label="竣工套内面积(平方米)"></el-table-column>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="deleteDownload(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="importAreahandleSizeChange"
            @current-change="importAreahandleCurrentChange"
            :current-page="importAreaInfoPage.currentPage"
            :page-sizes="importAreaInfoPage.pageSizesList"
            :page-size="importAreaInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="importAreaInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
    <!--导入面积-->
    <el-dialog title="导入面积" :visible.sync="importAreaDialog" v-if="importAreaDialog" width="50%" id="import">
      <el-form element-loading-text="正在导入中">
        <p>请选择需要上传的文件</p>
        <el-upload
          style="display:inline-block;"
          action="https://jsonplaceholder.typicode.com/posts/"
          class="upload-demo"
          ref="upload"
          accept=".xls, .xlsx, .doc, .docx, .ppt, .txt"
          :on-change="handleChange"
          :before-remove="beforeRemove"
          :file-list="fileList"
          :http-request="importArea"
          :on-exceed="handleExceed"
          :limit="1"
          :auto-upload="false"
          id="upload"
        >
          <el-button size="small" type="primary">选择</el-button>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submitImportArea">确定</el-button>
      </div>
    </el-dialog>
    <!-- 提示 -->
    <el-dialog title="提示" :visible.sync="promptTitle" width="30%" :close-on-click-modal="false">
      <div v-for="(item,index) in promptList" :key="index">
        <div>{{item}}</div>
      </div>
    </el-dialog>
    <!-- 右方导入详情 -->
    <el-dialog
      title="导入详情"
      :visible.sync="openDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <el-button type="primary" size="mini" @click="deleteDownload()">删除</el-button>
      <i style="color:red;font-size:18px;">总共{{importAreaInfoPage.totalNumber}}条数据！</i>
      <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
          <el-table
          :data="downloadDetailList"
          border
          @selection-change="downloadListSelectData"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
          <el-table-column prop="DONGH" label="栋号"></el-table-column>
          <el-table-column prop="DONGMC" label="栋名称"></el-table-column>
          <el-table-column prop="FANGH" label="房号"></el-table-column>
          <el-table-column prop="WANGGBBM" label="网格办编码"></el-table-column>
          <el-table-column prop="HUX" label="户型"></el-table-column>
          <el-table-column prop="CHAOX" label="朝向"></el-table-column>
          <el-table-column prop="SUOZLC" label="所在楼层"></el-table-column>
          <el-table-column prop="FANGCLY" label="房屋来源"></el-table-column>
          <el-table-column prop="JUNGMJ" label="竣工建筑面积"></el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editHouseInfo(scope.row)">编辑</el-button>
              <el-button type="primary" size="mini" @click="deleteDownload(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="importAreahandleSizeChange"
            @current-change="importAreahandleCurrentChange"
            :current-page="importAreaInfoPage.currentPage"
            :page-sizes="importAreaInfoPage.pageSizesList"
            :page-size="importAreaInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="importAreaInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
    <!-- 导入房屋信息 -->
    <el-dialog title="导入房屋信息" :visible.sync="importHouseDialog" width="50%" id="import">
      <el-form element-loading-text="正在导入中">
        <p>请选择需要上传的文件</p>
        <el-upload
          style="display:inline-block;"
          action="https://jsonplaceholder.typicode.com/posts/"
          class="upload-demo"
          ref="upload"
          accept=".xls, .xlsx, .doc, .docx, .ppt, .txt"
          :on-change="handleChange"
          :before-remove="beforeRemove"
          :file-list="fileList"
          :http-request="importArea"
          :on-exceed="handleExceed"
          :limit="1"
          :auto-upload="false"
          id="upload"
        >
          <el-button size="small" type="primary" @click="judge = 'smallArea'">选择</el-button>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submitImportArea">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/housestore.js";
import api from "@/api/publicMethod";
import houseApproval from "@/api/houseApproval";
export default {
  name: "houseinfo",
  data() {
    return {
      form: {}, //表单
      tableData: [], //表格假数据
      finishConstructionTime: "2017-04-20 03:11:46",
      state: [],
      distributionSubject: [],
      //分页需要的数据
      currentPage: 1,
      pageNo: 1,
      pageSize: 50,
      pageSizesList: [50, 100, 200, 500, 1000, 2000],
      totalNumber: 0, //数据的总数
      selectedData: [], //选中的数据
      guidList: [], //选中的guid
      natureData: [], // 房屋性质下拉
      sourceData: [], //来源下拉
      typeData: [], //类型下拉
      orientationData: [], //朝向下拉
      terraceData: [], //平台下拉
      functionData: [], //房屋用途下拉
      guid: "", //小区的guid,
      taskID: "", //taskID
      PID: "", //pid
      show: true,
      houseList: "", //选中房号列表
      houseGuidList: [], //选中房的guid
      formData: {}, //要批量修改的表单
      bulkEditingDialogVisible: false, //批量修改
      DistrictRenovationList: [], //装修列表
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" }
      ],
      downloadDetailDialog: false, //导入详情弹框
      downloadDetailList: [], //导入详情列表
      //导入详情列表的分页
      importAreaInfoPage: {
        currentPage: 1,
        pageSize: 50,
        pageSizesList: [50, 100, 200, 500, 1000, 2000],
        totalNumber: 0 //数据的总数
      },
      downloadListSelect: [], //导入列表选中的数据
      importAreaDialog: false, //导入面积弹框是否打开
      fileList: [], //文件上传列表
      promptTitle: false,
      promptList: [], //错误信息列表
      openDialog: false, //右侧导入详情弹框显隐控制
      importHouseDialog: false,//右侧导入房屋信息弹框控制显隐
      judge: '',//传入不同的参数调接口
    };
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.state == 0) {
        return "background:#f2dede;text-align:center;";
      } else if (rowIndex === 3) {
        return "text-align:center;border-color:#DBDBDB";
      }
      return "";
    },
    //使删除的情况下，高亮显示
    statusStyle({ row, column, rowIndex, columnIndex }) {
      if (this.tableData[rowIndex].state == 0) {
        return "background:#f2dede;text-align:center;";
      } else {
        return "text-align:center;border-color:#DBDBDB";
      }
    },
    //验证只能输入正整数
    proving1() {
      this.form.coveredAreaMax = this.form.coveredAreaMax.replace(
        /[^\.\d]/g,
        ""
      );
      this.form.coveredAreaMax = this.form.coveredAreaMax.replace(
        /\.{2,}/g,
        "."
      ); //只保留第一个. 清除多余的
      this.form.coveredAreaMax = this.form.coveredAreaMax
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
    },
    proving2() {
      this.form.coveredAreaMin = this.form.coveredAreaMin.replace(
        /[^\.\d]/g,
        ""
      ); //
      this.form.coveredAreaMin = this.form.coveredAreaMin.replace(
        /\.{2,}/g,
        "."
      ); //只保留第一个. 清除多余的
      this.form.coveredAreaMin = this.form.coveredAreaMin
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
    },
    handleCheckAllChange(val) {
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    // //table选中数据
    // handleSelectionChangeList(val) {
    //   this.selectedData = val;
    // },
    //单行选中
    clickRow(row) {
      this.$refs.houseTable.toggleRowSelection(row);
    },
    //重置
    reset() {
      this.form = {};
    },
    //查询
    query(index) {
      this.getHouseList(index);
    },
    handleSizeChange(val) {
      //改变页面显示条数
      this.pageSize = val;
      this.getHouseList(1);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getHouseList();
    },
    //去到详情页
    goDetail(val) {
      this.saveHouse(val);
    },
    //保存选中的数据到临时表
    saveHouse(val) {
      let params = {
        houseGuid: val.guid
      };
      http
        .saveClickhousing(params)
        .then(res => {
          //房源信息修改方法
          if (res) {
            let name = val.houseNo;
            this.$parent.openTab({
              id: val.guid,
              label: name || "房源详情",
              closable: true,
              meta: {
                houseGuid: val.guid,
                menuId: "4",
                state: "check"
              },
              component: () =>
                import("@/views/houseManagement/correcthouseinfo/HouseDetail")
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取房屋列表
    getHouseList(index) {
      if (index) {
        this.currentPage = index;
      }
      let params = {
        buildingName: this.form.buildingName,
        coveredAreaMax: this.form.coveredAreaMax,
        coveredAreaMin: this.form.coveredAreaMin,
        districtGuid: this.guid, //小区唯一标识
        nature: this.form.nature,
        orientationList: this.form.orientation,
        completionAreabegain: this.form.completionAreabegain,
        completionAreaEnd: this.form.completionAreaEnd,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        source: this.form.source,
        type: this.form.type,
        houseNo: this.form.houseNo
      };
      http
        .getstoreHousePage(params)
        .then(res => {
          //去除日期字符串的时分秒，实现只显示年月日。
          let list = res.content;
          for (var key in list) {
            list[key].startConstructionTime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
              list[key].startConstructionTime
            );
            list[key].finishConstructionTime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
              list[key].finishConstructionTime
            );
            list[key].deliveryTime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
              list[key].deliveryTime
            );
            key++;
          }
          this.tableData = list;
          this.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除房源
    deleteHouse(val) {
      if (this.selectedData.length) {
        this.$confirm("是否确定删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.guidList.push(val.guid);
            let params = {
              projectId: this.PID
            };
            let data = this.guidList;
            this.guidList = []; //清空前端数据
            http
              .deleteHouse(params, data)
              .then(res => {
                this.$message.success("删除成功");
                this.query();
                this.selectedData = [];
                this.houseList = [];
                this.houseGuidList = [];
                this.Event.$emit("HouseDetail", "getHouseinfo");
                this.Event.$emit("CorrectApply", "changeDetail");
              })
              .catch(err => {
                this.selectedData = [];
                this.houseList = [];
                this.houseGuidList = [];
                console.log(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    //删除
    deleteData() {
      if (this.selectedData.length) {
        this.$confirm("是否确定删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.selectedData.forEach(element => {
              this.guidList.push(element.guid);
            });
            let params = {
              projectId: this.PID
            };
            let data = this.guidList;
            console.log(data);
            this.guidList = []; //清空前端数据
            http
              .deleteHouse(params, data)
              .then(res => {
                this.$message.success("删除成功");
                this.Event.$emit("HouseDetail", "getHouseinfo");
                this.Event.$emit("CorrectApply", "changeDetail");
                this.query();
                this.selectedData = [];
                this.houseList = [];
                this.houseGuidList = [];
                this.show = false;
              })
              .catch(err => {
                this.selectedData = [];
                this.houseList = [];
                this.houseGuidList = [];
                console.log(err);
              });
          })
          .catch(() => {
            this.selectedData = [];
            this.houseList = [];
            this.houseGuidList = [];
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    //恢复房源
    recoverHouseInfo(val) {
      let params = {
        houseGuid: val.guid,
        districtGuid: this.guid,
        projectId: this.PID
      };
      http
        .restorehousing(params)
        .then(res => {
          this.$message.success("恢复房源成功");
          this.query();
          this.Event.$emit("HouseDetail", "getHouseinfo");
          this.Event.$emit("CorrectApply", "changeDetail");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //右边导入详情-按钮
    importDetails() {
      this.openDialog = true
    },
    //获取字典
    getDictionary() {
      let namesArr = [
        "房产来源",
        "户型",
        "朝向",
        "房屋性质",
        "房屋用途",
        "平台"
      ];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.natureData = this.$dictionaryChange(
            res.房屋性质,
            this.natureData,
            "通用"
          );
          this.sourceData = res.房产来源;
          this.typeData = res.户型;
          this.functionData = res.房屋用途;
          this.terraceData = res.平台;
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取流程数据
    getProcessInfo() {
      let params = {
        taskId: this.taskId
      };
      api
        .getProcessInfo(params)
        .then(res => {
          this.PID = res[0].PID;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //勘误-获取小区装修标准信息
    getDistrictRenovationList() {
      let params = {
        districtGuid: this.$parent.params.districtGuid
      };
      houseApproval
        .getDistrictRenovationList(params)
        .then(res => {
          this.DistrictRenovationList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //改变装修类型
    changeDecorationType() {
      if (this.DistrictRenovationList) {
        for (var i = 0; i < this.DistrictRenovationList.length; i++) {
          if (
            this.DistrictRenovationList[i].renovationCode ==
            this.formData.decorationType
          ) {
            this.formData.decorationTypeDescription = this.DistrictRenovationList[
              i
            ].renovationDescription;
            break;
          } else {
            this.formData.decorationTypeDescription = "";
          }
        }
      }
    },
    //改变装修标准说明
    changeDecorationTypeDescription() {
      if (this.DistrictRenovationList) {
        for (var i = 0; i < this.DistrictRenovationList.length; i++) {
          if (
            this.formData.decorationTypeDescription ==
            this.DistrictRenovationList[i].renovationDescription
          ) {
            this.formData.decorationType = this.DistrictRenovationList[
              i
            ].renovationCode;
            break;
          } else {
            this.formData.decorationType = "";
          }
        }
      }
    },
    //打开批量修改弹框
    bulkEditingDialog() {
      this.bulkEditingDialogVisible = true;
    },
    //选中的房号和guid
    handleSelectionChangeList(val) {
      this.selectedData = val;
      this.houseList = [];
      this.houseGuidList = [];
      if (val) {
        val.forEach(ele => {
          this.houseList.push(ele.houseNo);
          this.houseGuidList.push(ele.guid);
        });
      }
      if (this.houseList.length == 0) {
        this.houseList = [];
      } else {
        this.houseList = this.houseList.toString();
      }
    },
    //批量修改的确定按钮
    bulkEditing() {
      if (this.houseList.length == 0) {
        this.$message({
          message: "请选择批量修改的房",
          type: "info"
        });
        this.bulkEditingDialogVisible = false;
      } else {
        this.$startLoading();
        let params = {
          districtGuid: this.$parent.params.districtGuid,
          projectId: this.PID
        };
        this.formData.houseGuidList = this.houseGuidList;
        let data = this.formData;
        http
          .editHouseList(params, data)
          .then(res => {
            if (res) {
              this.bulkEditingDialogVisible = false;
              this.houseList = "";
              this.houseGuidList = [];
              this.formData = {};
              this.getHouseList();
              this.Event.$emit("HouseDetail", "getHouseinfo");
              this.$message({
                message: "批量修改成功",
                type: "success"
              });
            }
            this.$endLoading();
          })
          .catch(err => {
            this.$endLoading();
            console.log(err);
          });
      }
    },
    //下载模板
    downloadTemplate(val) {
      let url;
      if(val == 'largeArea') {
        url = process.env.API + "/house/store/house/download"; //左侧下载面积模板
      }else{
        url = process.env.API + "/house/store/download"; //右侧下载模板
      } 
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
    openImportAreaDialog(val) {
      this.importAreaDialog = true;
      this.judge = val;
    },
    //上传文件改变时
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    //删除时
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //导入面积
    importArea(context) {
      this.$startLoading();
      let params = {
        districtGuid: this.$parent.params.districtGuid,
        pid: this.PID
      };
      let data = new FormData();
      data.append("file", context.file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let importApi;
      if(this.judge == 'largeArea'){ 
        //左侧得导入面积
          http.importArea(params, data, config).then(res => {
          if (res.data) {
            this.promptList = res;
            this.promptTitle = true;
          } else {
            this.importAreaDialog = false;
            this.$message({
              type: "success",
              message: "导入面积成功"
            });
            this.fileList = [];
            this.query();
            this.$endLoading();; //关闭加载
          }
        }).catch(err => {
          this.$endLoading();; //关闭加载
        });
      }else { 
        //右侧导入房屋信息
        http.reportHouseInfo(params, data, config).then(res => {
        if (res.data) {
          this.promptList = res;
          this.promptTitle = true;
        } else {
          this.importAreaDialog = false;
          this.$message({
            type: "success",
            message: "导入房屋信息成功"
          });
          this.fileList = [];
          this.query();
          this.$endLoading();; //关闭加载
        }
      }).catch(err => {
        this.$endLoading();; //关闭加载
      });
      }
      // http.importArea(params, data, config).then(res => {
      //   if (res.data) {
      //     this.promptList = res;
      //     this.promptTitle = true;
      //   } else {
      //     this.importAreaDialog = false;
      //     this.$message({
      //       type: "success",
      //       message: "导入面积成功"
      //     });
      //     this.query();
      //   }
      // }).catch(err => {});
    },
    //提交导入文件
    submitImportArea() {
      this.$refs.upload.submit();
    },
    //打开导入详情弹框
    openDownloadDetailDialog(val) {
      this.judge = val;
      if(val == 'largeArea') {
        this.downloadDetailDialog = true
      } else {
        this.openDialog = true
      }
      this.downloadDetailList = [];
      this.getImportAreaInfo(val);
    },
    //查询导入详情列表
    getImportAreaInfo() {
      let params = {
        districtGuid: this.$parent.params.districtGuid,
        pid: this.PID,
        pageSize: this.importAreaInfoPage.pageSize,
        pageIndex: this.importAreaInfoPage.currentPage
      };
      console.log(this.judge)
      if(this.judge == 'largeArea') {
        console.log('111111111111111')
        http.getImportAreaInfo(params).then(res => {
          this.downloadDetailList = res.content;
          this.importAreaInfoPage.totalNumber = res.totalElements;
        })
        .catch(err => {});
      } else {
        console.log('22222222222222222')
        http.importDetails(params).then(res => {
          this.downloadDetailList = res.content;
          this.importAreaInfoPage.totalNumber = res.totalElements;
        })
      }
    },
    //查询导入详情列表Size改变时
    importAreahandleSizeChange(val) {
      this.importAreaInfoPage.pageSize = val;
      this.getImportAreaInfo();
    },
    //查询导入详情列表currentPage改变时
    importAreahandleCurrentChange(val) {
      this.importAreaInfoPage.currentPage = val;
      this.getImportAreaInfo();
    },
    //导入列表 选中的数据
    downloadListSelectData(val) {
      console.log(this.judge)
      this.downloadListSelect = [];
      if (this.judge == 'largeArea') {
        val.forEach(ele => {
          this.downloadListSelect.push(ele.FANGWBS);
        });
        return
      }else{
        val.forEach(ele => {
          this.downloadListSelect.push(ele.GUID);
        });
      }
    },
    //删除导入的一些数据
    deleteDownload(val) {
       this.$confirm('是否确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.judge == 'largeArea') { //左侧导入详情
            let params = { pid: this.PID };
            let data = [];
            if (val) {
              console.log(val)
              data = [val.FANGWBS];
            } else {
              console.log('这里')
              data = this.downloadListSelect;
            };
            http.deleteDownloadInfo(params, data).then(res => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              if (this.downloadListSelect.length != 0) {
                this.downloadListSelect = [];
              }
              this.getImportAreaInfo();
            })
            .catch(err => {});
          } else {
            let params = { pid: this.PID };
            let data = [];
            if (val) {
              data = [val.GUID];
            } else {
              data = this.downloadListSelect;
            };
            http.deleteDetails(params, data).then(res => {  //左侧导入详情
              this.$message({
                type: "success",
                message: "删除成功"
              });
              if (this.downloadListSelect.length != 0) {
                this.downloadListSelect = [];
              }
              this.getImportAreaInfo();
            })
            .catch(err => {});
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
    },
    //右侧导入详情弹框内-编辑按钮
    editHouseInfo(val) {
      this.openDialog = false;
      this.$parent.openTab({
        id: 'fexq_01',
        label: val.DONGMC || "房源详情",
        closable: true,
        component: () => import("@/views/houseManagement/correcthouseinfo/HouseDetail"),
        meta: {
          houseGuid: val.FANGWBS,
        },
      });
    },
    //超过文件限制时
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    }
  },
  created() {
    this.guid = this.$parent.params.districtGuid;
    this.taskId = this.$parent.params.taskId;
    if (this.guid) {
      this.query(); //查询
    }
    if (this.taskId) {
      this.getProcessInfo(); //获取流程数据
    }
    this.getDictionary();
    this.getDistrictRenovationList();
  },
  mounted() {
    this.Event.$on("CorrectHouse", data => {
      if (data == "getHouseList") {
        this.getProcessInfo();
        this.getHouseList();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.formDialog {
  width: 100%;
  .el-form-item {
    width: 50%;
    margin-bottom: 0px;
    display: inline-block;
    width: 49.5%;
  }
}
.el-table tr {
  background: "#f2dede";
}
.table_row_change {
  background: "#f2dede";
}

.housingInformation {
  .top {
    background: #fff;
    .el-form-item {
      margin-bottom: 10px;
    }
    .w100 {
      width: 100%;
    }
  }
  .newBatch {
    margin-top: 20px;
  }
  .table-list {
    margin-top: 20px;
    background: #fff;
    & /deep/ .el-table__body tr.current-row > td {
      background: #f7f1ec !important;
    }
    & /deep/ .el-table--border {
      border-color: #dbdbdb;
    }
  }
  .pagination {
    /*分页*/
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  & /deep/ .el-form-item__content .selectBox {
    margin-left: 2.5rem !important;
  }
  .aside-btn {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    position: relative;
    .right_btn {
      position: absolute;
      right: 0px;;
    }
    .left_btn{
      position: absolute;
      left:0px;
    }
  }
}
</style>
