<!--
 * @Description: 局建房查询
 * @Author: maxq
 * @Date: 2020-04-07 15:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-02 16:44:50
 -->
<template>
  <div class="house-details">
    <div class="btn_top">
      <el-button type="primary" size="mini" @click="goback">返回</el-button>
      <el-button type="primary" size="mini" @click="openLogDialog">查看日志</el-button>
    </div>
    <div class="tableStyle">
      <el-collapse v-model="openCollapse">
        <!-- 房源基本信息 -->
        <el-collapse-item name="1">
          <template slot="title">
            <publicTitle title="房源基本信息"></publicTitle>
          </template>
          <div>
            <table class="detail">
              <tr>
                <td>小区编号</td>
                <td>
                  <el-input v-model="form.districtNo" disabled></el-input>
                </td>
                <td>小区名称</td>
                <td>
                  <el-input v-model="form.districtName" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>栋号</td>
                <td>
                  <el-input v-model="form.buildNo" disabled></el-input>
                </td>
                <td>栋名称</td>
                <td>
                  <el-input v-model="form.buildName" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>房号</td>
                <td>
                  <el-input v-model="form.houseNo" disabled></el-input>
                </td>
                <td>曾用房号</td>
                <td>
                  <el-input v-model="form.usedHouseNo" disabled></el-input>
                </td>
              </tr>
                 <tr>
                <td>网格办编码</td>
                <td colspan="3">
                  <el-input v-model="form.serialNo" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>房屋状态</td>
                <td>
                  <el-input v-model="form.stateName" disabled></el-input>
                </td>
                <td>所在单元</td>
                <td>
                  <el-input v-model="form.unit" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>所在楼层</td>
                <td>
                  <el-input v-model="form.floorNo" disabled></el-input>
                </td>
                <td>房屋来源</td>
                <td>
                  <el-select style="width: 100%;" v-model="form.source" disabled>
                    <el-option
                      v-for="(item, index) in sourceData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>房屋用途</td>
                <td>
                  <el-select style="width: 100%;" v-model="form.function" disabled>
                    <el-option
                      v-for="(item, index) in functionData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>户型</td>
                <td>
                  <el-select
                    v-model="form.houseLayout"
                    placeholder="请选择"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in typeData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>朝向</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.orientation"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in orientationData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>平台</td>
                <td>
                  <el-select v-model="form.terrace" placeholder="请选择" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in terraceData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>是否有架空层</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.innerFloor"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>(预测绘)建筑面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.coveredArea"></el-input>
                  <span style="position:absolute;top:0px;right:4px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>(预测绘)分摊面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.residentialPoolArea"></el-input>
                  <span style="position:absolute;top:0px;right:4px;">m²</span>
                </td>
                <td>(预测绘)套内面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.indoorArea"></el-input>
                  <span style="position:absolute;top:0px;right:4px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>竣工建筑面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionArea"></el-input>
                  <span style="position:absolute;top:0px;right:4px;">m²</span>
                </td>
                <td>竣工分摊面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionShareArea"></el-input>
                  <span style="position:absolute;top:0px;right:4px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>竣工套内面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionIndoorArea"></el-input>
                  <span style="position:absolute;top:0px;right:4px;">m²</span>
                </td>
                <td>分摊面积说明</td>
                <td>
                  <el-input disabled v-model="form.residentialAreaContent"></el-input>
                </td>
              </tr>
              <tr>
                <td>初始房源性质</td>
                <td>
                  <el-select style="width:100%" v-model="form.startNature" disabled>
                    <el-option
                      v-for="(item, index) in houseType"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前房源性质</td>
                <td style="position:relative">
                  <el-select style="width:100%" v-model="form.changeAfterNature" disabled>
                    <el-option
                      v-for="(item, index) in houseType"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    style="position:absolute;top:6px;right:2px;"
                    @click="OpenNatureRecordsDialog"
                  >查看历史</el-button>
                </td>
              </tr>
              <tr>
                <td>初始属性</td>
                <td>
                  <el-select style="width:100%" v-model="form.originalProperty" disabled>
                    <el-option
                      v-for="(item, index) in currentPropertyData"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前属性</td>
                <td>
                  <el-select style="width:100%" v-model="form.currentProperty" disabled>
                    <el-option
                      v-for="(item, index) in originalPropertyData"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>开工时间</td>
                <td>
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.startConstructionTime"
                    disabled
                  ></el-date-picker>
                </td>
                <td>竣工时间</td>
                <td>
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.finishConstructionTime"
                    disabled
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>交付使用时间</td>
                <td>
                  <el-date-picker class="w100" type="date" v-model="form.deliveryTime" disabled></el-date-picker>
                </td>
                <td>装修标准</td>
                <td>
                  <el-input v-model="form.decorationType" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>装修标准说明</td>
                <td colspan="3">
                  <el-tooltip class="item" effect="dark" content="此处利用鼠标可拖动" placement="right-end">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      placeholder="请输入内容"
                      v-model="form.decorationTypeDescription"
                      disabled
                    ></el-input>
                  </el-tooltip>
                </td>
              </tr>
              <tr>
                <td>是否样板房</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.modelHouses"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>是否代售</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.helpSell"
                    placeholder="请选择"
                    disabled
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
                <td>是否查封冻结</td>
                <td>
                  <el-select style="width: 100%;" v-model="form.closed" placeholder="请选择" disabled>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>资产库状态</td>
                <td>
                  <el-input disabled v-model="form.assetStateName"></el-input>
                </td>
              </tr>
              <tr>
                <td>空房标注</td>
                <td>
                  <el-input disabled v-model="form.situationalRemark"></el-input>
                </td>
                <td>是否被二次分配</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.secondDistribution"
                    placeholder="请选择"
                    disabled
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
                <td>维修状态</td>
                <td colspan="3" style="position:relative">
                  <el-select
                    style="width: 100%;"
                    v-model="form.maintainType"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in stateList"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="checkHistory"
                    style="position:absolute;top:6px;right:2px;"
                  >查看历史</el-button>
                </td>
              </tr>
              <tr>
                <td>备注</td>
                <td colspan="3">
                  <el-input disabled v-model="form.specification"></el-input>
                </td>
              </tr>
            </table>
          </div>
        </el-collapse-item>
        <!--房源使用权信息  -->
        <el-collapse-item name="2">
          <template slot="title">
            <publicTitle title="房源使用权信息"></publicTitle>
          </template>
          <div>
            <table class="detail">
              <tr>
                <td>初始分配权归属</td>
                <td>
                  <el-select v-model="form.initialAllocationRight" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in divisionUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前分配权归属</td>
                <td style="position:relative">
                  <el-select v-model="form.allocationRight" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in divisionUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    style="position:absolute;top:6px;right:2px;"
                    @click="OpenAllocationRecordsDialog"
                  >查看历史</el-button>
                </td>
              </tr>
              <tr>
                <td>初始签约权归属</td>
                <td>
                  <el-select v-model="form.initialSignatoryRight" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in signingUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前签约权归属</td>
                <td style="position:relative">
                  <el-select v-model="form.signatoryRight" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in signingUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    style="position:absolute;top:6px;right:2px;"
                    @click="OpenSignatoryRightRecordsDialog"
                  >查看历史</el-button>
                </td>
              </tr>
              <tr>
                <td>初始数据维护权归属</td>
                <td>
                  <el-select v-model="form.initialMaintainRight" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in maintenanceUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前数据维护权归属</td>
                <td style="position:relative">
                  <el-select v-model="form.maintainRight" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in maintenanceUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    style="position:absolute;top:6px;right:2px;"
                    @click="OpenInitialMaintainRightRecordsDialog"
                  >查看历史</el-button>
                </td>
              </tr>
              <tr>
                <td>初始运维权归属</td>
                <td>
                  <el-select v-model="form.initialOperationalRight" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in operations"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前运维权归属</td>
                <td style="position:relative">
                  <el-select v-model="form.operationalRight" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in operations"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    style="position:absolute;top:6px;right:2px;"
                    @click="OpenOperationalRightRecordsDialog"
                  >查看历史</el-button>
                </td>
              </tr>
              <tr>
                <td>二次分配权</td>
                <td>
                  <el-select v-model="form.secondAllocationRight" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in divisionUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>二次签约权</td>
                <td>
                  <el-select v-model="form.secondAllocationRight" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in signingUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
        </el-collapse-item>
        <!--房源产权信息  -->
        <el-collapse-item name="3">
          <template slot="title">
            <TitleStylex title="房源产权信息">
              <el-button
                slot="publicTitleRight"
                type="primary"
                size="mini"
                @click="OpenPropertyRightRecordsDialog"
              >查看历史产权变更记录</el-button>
            </TitleStylex>
          </template>
          <div>
            <table class="detail">
              <tr>
                <td>初始产权归属</td>
                <td>
                  <el-input v-model="form.propertypBelongName" disabled></el-input>
                </td>
                <td>当前产权归属</td>
                <td>
                  <el-input v-model="form.propertyRightUnit" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>不动产单元号</td>
                <td>
                  <el-input v-model="form.immovablePropertyUnitNo" disabled></el-input>
                </td>
                <td>权利人</td>
                <td>
                  <el-input v-model="form.obligee" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>使用开始时间</td>
                <td>
                  <el-date-picker class="w100" type="date" v-model="form.startUseTime" disabled></el-date-picker>
                </td>
                <td>使用结束时间</td>
                <td>
                  <el-date-picker class="w100" type="date" v-model="form.endUserTime" disabled></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>登记价人民币</td>
                <td>
                  <el-input v-model="form.registPrice" disabled></el-input>
                </td>
                <td>房屋原值</td>
                <td>
                  <el-input v-model="form.houseOriginalPrice" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>不动产证书号</td>
                <td>
                  <el-input v-model="form.rightOverImmovablesId" disabled></el-input>
                </td>
                <td>产权登记时间</td>
                <td>
                  <el-date-picker class="w100" type="date" v-model="form.djsj" disabled></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>房屋现值</td>
                <td>
                  <el-input v-model="form.housePresentPrice" disabled></el-input>
                </td>
                <td>共有情况</td>
                <td>
                  <el-date-picker v-model="form.commonalityCondition" disabled></el-date-picker>
                </td>
              </tr>
            </table>
          </div>
        </el-collapse-item>
        <!-- 入库/出库情况 -->
        <el-collapse-item name="4">
          <template slot="title">
            <publicTitle title="入库/出库情况"></publicTitle>
          </template>
          <div>
            <el-table
              :data="incomingAndOutgoingStatusList"
              border
              size="mini"
              :header-cell-style="globalHeaderStyle"
              :cell-style="globalCellStyle"
            >
              <el-table-column label="正式入库时间">
                <template slot-scope="scope">{{ scope.row.storageTime | dateFormat }}</template>
              </el-table-column>
              <el-table-column prop="applicant" label="入库申请人及单位"></el-table-column>
              <el-table-column prop="firstReviewer" label="资产运维部初审"></el-table-column>
              <el-table-column v-if="isPutShow" prop="secondReviewer" label="建设筹集部门审核"></el-table-column>
              <el-table-column prop="thirdReviewer" label="资产运维部复审"></el-table-column>
              <el-table-column prop="fourthReviewer" label="资产运维部终审"></el-table-column>
              <el-table-column label="出库时间">
                <template slot-scope="scope">{{ scope.row.outboundTime | dateFormat }}</template>
              </el-table-column>
              <el-table-column prop="warehouse" label="出库操作人"></el-table-column>
              <el-table-column prop="reason" label="出库原因"></el-table-column>
              <el-table-column prop="basis" label="出库依据"></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <!--空房标注情况  -->
        <el-collapse-item name="5">
          <template slot="title">
            <publicTitle title="空房标注情况"></publicTitle>
          </template>
          <div>
            <el-table
              :data="situationalList"
              border
              size="mini"
              :header-cell-style="globalHeaderStyle"
              :cell-style="globalCellStyle"
            >
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="reason" label="空房标注原因"></el-table-column>
              <el-table-column prop="basis" label="空房标注依据"></el-table-column>
              <el-table-column prop="handlerName" label="标注人"></el-table-column>
              <el-table-column prop="time" label="标注时间"></el-table-column>
              <el-table-column prop="removeBasis" label="解除依据"></el-table-column>
              <el-table-column prop="removeOne" label="解除人"></el-table-column>
              <el-table-column label="解除时间">
                <template slot-scope="scope">{{ scope.row.removeDate | dateFormat }}</template>
              </el-table-column>
              <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="checkAttachment(scope.row)">查看附件</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <!-- 预留模块 -->
        <el-collapse-item name="6">
          <template slot="title">
            <publicTitle title="预留情况"></publicTitle>
          </template>
          <div>
            <el-table
              :data="relieveList"
              border
              size="mini"
              :header-cell-style="globalHeaderStyle"
              :cell-style="globalCellStyle"
            >
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="time" label="预留时间"></el-table-column>
              <el-table-column prop="handlerName" label="预留人"></el-table-column>
              <el-table-column prop="basis" label="预留依据"></el-table-column>
              <el-table-column prop="removeDate" label="解除预留时间"></el-table-column>
              <el-table-column prop="removeOne" label="解除人"></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <!-- 出租情况 -->
        <el-collapse-item name="7">
          <template slot="title">
            <publicTitle title="出租情况"></publicTitle>
          </template>
          <div>
            <el-table
              :data="rentSituationList"
              border
              size="mini"
              :header-cell-style="globalHeaderStyle"
              :cell-style="globalCellStyle"
            >
              <el-table-column prop="zt" label="状态"></el-table-column>
              <el-table-column prop="fyzt" label="房源状态"></el-table-column>
              <el-table-column prop="fyjhsm" label="房源计划说明"></el-table-column>
              <el-table-column label="房源计划下达时间">
                <template slot-scope="scope">{{scope.row.fyjhxdsj|dateFormat}}</template>
              </el-table-column>
              <el-table-column prop="fs" label="分配方式"></el-table-column>
              <el-table-column prop="pcdm" label="批次代码"></el-table-column>
              <el-table-column prop="pcmc" label="批次名称"></el-table-column>
              <el-table-column label="批次终审时间">
                <template slot-scope="scope">{{scope.row.pczssj|dateFormat}}</template>
              </el-table-column>
              <el-table-column prop="qylx" label="签约类型"></el-table-column>
              <el-table-column prop="htlx" label="合同类型"></el-table-column>
              <el-table-column prop="htbh" label="合同编号"></el-table-column>
              <el-table-column prop="xm" label="承租人/单位"></el-table-column>
              <el-table-column prop="zjhm" label="证件号码"></el-table-column>
              <el-table-column label="首次合同开始时间">
                <template slot-scope="scope">{{scope.row.schtkssj|dateFormat}}</template>
              </el-table-column>
              <el-table-column label="合同开始时间">
                <template slot-scope="scope">{{scope.row.htkssj|dateFormat}}</template>
              </el-table-column>
              <el-table-column label="合同结束时间">
                <template slot-scope="scope">{{scope.row.htjssj|dateFormat}}</template>
              </el-table-column>
              <el-table-column prop="lsxyqk" label="临时协议情况"></el-table-column>
              <el-table-column label="详情">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="openRentSituationDetailDialog(scope.row)"
                  >查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>

        <el-collapse-item name="8">
          <template slot="title">
            <publicTitle title="勘误详情"></publicTitle>
          </template>
          <div>
            <el-table
              :data="erratList"
              border
              size="mini"
              :header-cell-style="globalHeaderStyle"
              :cell-style="globalCellStyle"
            >
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="kwlx" label="勘误类型"></el-table-column>
              <el-table-column prop="kwyj" label="勘误依据"></el-table-column>
              <el-table-column prop="kwsj" label="勘误时间">
                <template slot-scope="scope">{{scope.row.kwsj|dateFormat}}</template>
              </el-table-column>
              <el-table-column prop="bgr" label="变更人"></el-table-column>
              <el-table-column prop="shr" label="审核人"></el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="openHouseErrataDetailDialog(scope.row)"
                  >查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page_box">
              <el-pagination
                @size-change="handleHouseSizeChange"
                @current-change="handleHouseCurrentChange"
                :current-page="errataDetailPage.currentPage"
                :page-sizes="errataDetailPage.pageSizesList"
                :page-size="errataDetailPage.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="errataDetailPage.totalNumber"
                background
              ></el-pagination>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 查看详情 -->
    <el-dialog
      :visible.sync="checkAttachmentDialog"
      width="60%"
      title="查看附件"
      style="margin-top:10px;"
      class="dialog"
      :close-on-click-modal="false"
    >
      <div class="table-list">
        <Material :parameter="parameter" :show="show"></Material>
      </div>
    </el-dialog>
    <!-- 查看历史产权变更记录 -->
    <el-dialog
      :visible.sync="propertyRightRecordsDialog"
      width="80%"
      title="查看历史"
      class="dialog"
      :close-on-click-modal="false"
    >
      <publicTitle title="变更情况"></publicTitle>
      <div class="table">
        <el-table
          :data="propertyRightRecordsList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{ scope.row.changTime | dateFormat }}</template>
          </el-table-column>
          <el-table-column prop="creatorUnit" label="申请单位"></el-table-column>
          <el-table-column prop="creator" label="申请人"></el-table-column>
          <el-table-column prop="auditor" label="审核人"></el-table-column>
          <el-table-column prop="beforeChangepropertyRightName" label="变更前产权归属"></el-table-column>
          <el-table-column prop="propertyRightUnit" label="变更后产权归属"></el-table-column>
          <el-table-column label="查看变更详情">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="OpenPropertyRightRecordsDetailDialog(scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 查看勘误详情弹框 -->
    <el-dialog
      :visible.sync="houseErrataDetailDialog"
      width="80%"
      title="查看历史"
      class="dialog"
      :close-on-click-modal="false"
    >
      <publicTitle title="查看勘误详情"></publicTitle>
      <div class="table">
        <el-table
          :data="erratDetailList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="changeGuid" label="勘误类型"></el-table-column>
          <el-table-column prop="changeItem" label="勘误项"></el-table-column>
          <el-table-column prop="changeBefore" label="勘误前"></el-table-column>
          <el-table-column prop="changeAfter" label="勘误后"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{ scope.row.changeTime | dateFormat }}</template>
          </el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="houseSizeCurrentChange"
            @current-change="houseIndexCurrentChange"
            :current-page="errataInfoPage.currentPage"
            :page-sizes="errataInfoPage.pageSizesList"
            :page-size="errataInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="errataInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
    </el-dialog>

    <!-- 查看勘误面积详情弹框 -->
    <el-dialog
      :visible.sync="houseErrataImportDetailDialog"
      width="80%"
      title="查看勘误详情"
      class="dialog"
      :close-on-click-modal="false"
    >
      <div class="table">
        <el-table
          :data="erratImportList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="DONGH" label="栋号"></el-table-column>
          <el-table-column prop="DONGMC" label="栋名称"></el-table-column>
          <el-table-column prop="FANGH" label="房号"></el-table-column>
          <el-table-column prop="WANGGBBM" label="网格办编码"></el-table-column>
          <el-table-column prop="HUX" label="户型"></el-table-column>
          <el-table-column prop="CHAOX" label="朝向"></el-table-column>
          <el-table-column prop="SUOZLC" label="所在楼层"></el-table-column>
          <el-table-column prop="FANGCLY" label="房屋来源"></el-table-column>
          <el-table-column prop="JUNGMJ" label="竣工建筑面积"></el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 查看勘误面积详情弹框 -->
    <el-dialog
      :visible.sync="houseErrataAreaDetailDialog"
      width="80%"
      title="查看勘误详情"
      class="dialog"
      :close-on-click-modal="false"
    >
      <div class="table">
        <el-table
          :data="erratAreaList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="DONGH" label="栋号"></el-table-column>
          <el-table-column prop="DONGMC" label="栋名称"></el-table-column>
          <el-table-column prop="JUNGMJ" label="竣工建筑面积（平方米）"></el-table-column>
          <el-table-column prop="JUNGGTMJ" label="竣工分摊面积（平方米）"></el-table-column>
          <el-table-column prop="JUNGTNMJ" label="竣工套内面积（平方米）"></el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 查看房源性质变更情况 -->
    <el-dialog
      :visible.sync="natureRecordsDialog"
      width="80%"
      title="查看历史"
      class="dialog"
      :close-on-click-modal="false"
    >
      <publicTitle title="查看房源性质变更情况"></publicTitle>
      <div class="table">
        <el-table
          :data="natureChangeRecordsList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{ scope.row.changTime | dateFormat }}</template>
          </el-table-column>
          <el-table-column prop="creatorUnit" label="申请部门"></el-table-column>
          <el-table-column prop="creator" label="申请人"></el-table-column>
          <el-table-column prop="auditor" label="审核人"></el-table-column>
          <el-table-column prop="beforeChangeNatureRightName" label="变更前性质"></el-table-column>
          <el-table-column prop="afterNatureRightName" label="变更后性质"></el-table-column>
          <el-table-column label="查看变更详情">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="OpenNatureRecordsDetailDialog(scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!--查看分配权、签约权、数据维护权、运维权历史记录弹框 -->
    <el-dialog
      :visible.sync="historyRecordsDialog"
      width="80%"
      :title="title"
      class="dialog"
      :close-on-click-modal="false"
    >
      <publicTitle title="变更情况"></publicTitle>
      <div class="table" v-if="this.title == '查看分配权变更情况'">
        <el-table
          :data="allocationRecordsList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{ scope.row.time | dateFormat }}</template>
          </el-table-column>
          <el-table-column prop="basis" label="变更依据"></el-table-column>
          <el-table-column prop="creatorUnit" label="申请部门"></el-table-column>
          <el-table-column prop="creator" label="申请人"></el-table-column>
          <el-table-column prop="beforeAllocationRightUnit" label="变更前分配权"></el-table-column>
          <el-table-column prop="afterAllocationRightUnit" label="变更后分配权"></el-table-column>
        </el-table>
      </div>
      <div class="table" v-if="this.title == '查看签约权变更情况'">
        <el-table
          :data="signatoryRightRecordsList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{ scope.row.time | dateFormat }}</template>
          </el-table-column>
          <el-table-column prop="basis" label="变更依据"></el-table-column>
          <el-table-column prop="creatorUnit" label="申请部门"></el-table-column>
          <el-table-column prop="creator" label="申请人"></el-table-column>
          <el-table-column prop="beforeAllocationRightUnit" label="变更前签约权"></el-table-column>
          <el-table-column prop="afterAllocationRightUnit" label="变更后签约权"></el-table-column>
        </el-table>
      </div>
      <div class="table" v-if="this.title == '查看数据维护权变更情况'">
        <el-table
          :data="InitialMaintainRightRecordsList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{ scope.row.time | dateFormat }}</template>
          </el-table-column>
          <el-table-column prop="basis" label="变更依据"></el-table-column>
          <el-table-column prop="creatorUnit" label="申请部门"></el-table-column>
          <el-table-column prop="creator" label="申请人"></el-table-column>
          <el-table-column prop="beforeAllocationRightUnit" label="变更前数据维护权"></el-table-column>
          <el-table-column prop="afterAllocationRightUnit" label="变更后数据维护权"></el-table-column>
        </el-table>
      </div>
      <div class="table" v-if="this.title == '查看运维权变更情况'">
        <el-table
          :data="perationalRightRecordsList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{ scope.row.time | dateFormat }}</template>
          </el-table-column>
          <el-table-column prop="basis" label="变更依据"></el-table-column>
          <el-table-column prop="creatorUnit" label="申请部门"></el-table-column>
          <el-table-column prop="creator" label="申请人"></el-table-column>
          <el-table-column prop="beforeAllocationRightUnit" label="变更前运维权"></el-table-column>
          <el-table-column prop="afterAllocationRightUnit" label="变更后运维权"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 查看房源产权变更详情 -->
    <el-dialog
      :visible.sync="propertyRightRecordsDetailDialog"
      width="80%"
      title="查看产权详细情况"
      class="dialog"
      :close-on-click-modal="false"
    >
      <publicTitle title="产权变更申请批次信息"></publicTitle>
      <div class="tableStyle">
        <table :model="propertyRightDetailform" class="detail">
          <tr>
            <td class="must">批次名称</td>
            <td>
              <el-input v-model="propertyRightDetailform.name" clearable disabled></el-input>
            </td>
            <td class="must">批次编号</td>
            <td>
              <el-input v-model="propertyRightDetailform.code" disabled></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">请选择新的产权归属单位</td>
            <td colspan="3">
              <el-input v-model="propertyRightDetailform.propertyRight" disabled></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">变更依据</td>
            <td colspan="3">
              <el-input v-model="propertyRightDetailform.changeBasis" disabled type="textarea"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <publicTitle title="选中房列表"></publicTitle>
      <div class="table">
        <el-table
          :data="propertyRightDetailTable"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" width="50" type="index" :index="propertyRightIndexMethod"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="buildName" label="栋号"></el-table-column>
          <el-table-column prop="houseNo" label="房号"></el-table-column>
          <el-table-column prop="typeName" label="户型"></el-table-column>
          <el-table-column prop="coveredArea" label="预测绘建筑面积" width="120"></el-table-column>
          <el-table-column prop="completionArea" label="竣工建筑面积"></el-table-column>
          <el-table-column prop="natureTypeName" label="房源性质"></el-table-column>
          <el-table-column prop="beforeChangepropertyRightName" label="产权归属单位（变更前）" width="160"></el-table-column>
          <el-table-column prop="propertyRightUnit" label="产权归属单位（变更后）" width="160"></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="propertyRightDetailSizeChange"
            @current-change="propertyRightDetailCurrentChange"
            :current-page="propertyRightDetailPage.currentPage"
            :page-sizes="propertyRightDetailPage.pageSizesList"
            :page-size="propertyRightDetailPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="propertyRightDetailPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
      <div>
        <publicTitle title="审核意见"></publicTitle>
        <el-table
          :data="detailOpinion"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column prop="activitySource" label="环节"></el-table-column>
          <el-table-column prop="dealer" label="办理人"></el-table-column>
          <el-table-column prop="dealTime" label="办理时间"></el-table-column>
          <el-table-column prop="remark" label="办理意见"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 查看房源性质变更详情 -->
    <el-dialog
      :visible.sync="natureRecordsDetailDialog"
      width="80%"
      title="查看性质变更详细情况"
      class="dialog"
      :close-on-click-modal="false"
    >
      <publicTitle title="性质变更申请批次信息"></publicTitle>
      <div class="tableStyle">
        <table :model="natureDetailform" class="detail">
          <tr>
            <td class="must">批次名称</td>
            <td>
              <el-input v-model="natureDetailform.name" clearable disabled></el-input>
            </td>
            <td class="must">批次编号</td>
            <td>
              <el-input v-model="natureDetailform.code" disabled></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">请选择变更后房屋性质</td>
            <td colspan="3">
              <el-select
                style="width: 100%;"
                placeholder="请选择"
                v-model="natureDetailform.nature"
                disabled
              >
                <el-option
                  v-for="(item, index) in houseType"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="must">变更依据</td>
            <td colspan="3">
              <el-input v-model="natureDetailform.changeBasis" disabled type="textarea"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <publicTitle title="选中房列表"></publicTitle>
      <div class="table">
        <el-table
          :data="natureDetailTable"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" width="50" type="index" :index="natureIndexMethod"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="buildName" label="栋号"></el-table-column>
          <el-table-column prop="houseNo" label="房号"></el-table-column>
          <el-table-column prop="typeName" label="户型"></el-table-column>
          <el-table-column prop="coveredArea" label="预测绘建筑面积(平方米)" width="120"></el-table-column>
          <el-table-column prop="completionArea" label="竣工建筑面积(平方米)"></el-table-column>
          <el-table-column prop="stateName" label="房屋状态"></el-table-column>
          <el-table-column prop="natureName" label="房屋性质（变更前）" width="140"></el-table-column>
          <el-table-column prop="changeAfterNatureName" label="房屋性质（变更后）" width="140"></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="natureDetailSizeChange"
            @current-change="natureDetailCurrentChange"
            :current-page="natureDetailPage.currentPage"
            :page-sizes="natureDetailPage.pageSizesList"
            :page-size="natureDetailPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="natureDetailPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
      <div>
        <publicTitle title="审核意见"></publicTitle>
        <el-table
          :data="detailOpinion"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column prop="activitySource" label="环节"></el-table-column>
          <el-table-column prop="dealer" label="办理人"></el-table-column>
          <el-table-column prop="dealTime" label="办理时间"></el-table-column>
          <el-table-column prop="remark" label="办理意见"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!--查看出租详情弹框 -->
    <el-dialog
      :visible.sync="rentSituationDetailDialog"
      width="80%"
      title="查看"
      class="dialog"
      :close-on-click-modal="false"
    >
      <div>
        <el-button type="primary" size="mini" @click="openHousePlanDialog">房源计划</el-button>
        <el-button type="primary" size="mini" @click="openAllocationBatchInfoDialog">分配批次信息</el-button>
        <el-button type="primary" size="mini" @click="openSignUpInfoDialog">签约信息</el-button>
        <!-- <el-button type="primary" size="mini" @click="openAfterRentDialog">租后信息</el-button> -->
      </div>
      <!-- 房源计划的显隐 -->
      <div class="tableStyle">
        <div v-if="this.housePlanInfoShow">
          <publicTitle title="基本信息"></publicTitle>
          <table :model="housePlanFrom" class="detail">
            <tr>
              <td class="must">计划归属</td>
              <td>
                <el-input v-model="housePlanFrom.belongToName" disabled></el-input>
              </td>
              <td>房源计划号</td>
              <td>
                <el-input v-model="housePlanFrom.code" disabled></el-input>
              </td>
            </tr>
            <tr>
              <td class="must">计划说明</td>
              <td colspan="3">
                <el-input placeholder="请输入内容" v-model="housePlanFrom.description" disabled></el-input>
              </td>
            </tr>
            <tr>
              <td class="must">计划用途</td>
              <td>
                <el-radio-group disabled v-model="housePlanFrom.function" style="margin-left:6px">
                  <el-radio
                    v-for="(item, index) in planUseData"
                    :key="index"
                    :label="item.value"
                    :value="index"
                  >{{ item.name }}</el-radio>
                </el-radio-group>
              </td>
              <td class="must">计划属性</td>
              <td>
                <el-select
                  v-model="housePlanFrom.property"
                  placeholder="请先选择计划用途"
                  style="width: 100%;"
                  disabled
                >
                  <el-option
                    v-for="(item, index) in planPropertyData"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>供应计划</td>
              <td>
                <el-select
                  disabled
                  v-model="housePlanFrom.supplyCode"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="(item, index) in supplyCodeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
              <td>分配批次</td>
              <td>
                <el-input v-model="housePlanFrom.batchCode" placeholder="请先选择供应计划" disabled></el-input>
              </td>
            </tr>
            <tr>
              <td>包含队列</td>
              <td>
                <el-input v-model="queueStr" disabled style="width:100%"></el-input>
              </td>
              <td>包含分组</td>
              <td>
                <el-input v-model="groupStr" disabled style="width:100%"></el-input>
              </td>
            </tr>
            <tr>
              <td>编制人</td>
              <td>
                <el-input v-model="housePlanFrom.planEditor" disabled></el-input>
              </td>
              <td>编制时间</td>
              <td>
                <el-input v-model="housePlanFrom.compileDate" disabled></el-input>
              </td>
            </tr>
            <tr>
              <td>状态</td>
              <td colspan="3">
                <el-input v-model="housePlanFrom.activityName" disabled></el-input>
              </td>
            </tr>
          </table>
          <publicTitle title="房源详情"></publicTitle>
          <div>
            <!--表单-->
            <el-form
              :model="housePlanListForm"
              label-position="left"
              size="mini"
              label-width="3rem"
            >
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="小区">
                    <el-input
                      v-model="housePlanListForm.districtName"
                      clearable
                      @change="getHousePlanList(1)"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="栋号">
                    <el-input
                      v-model="housePlanListForm.buildName"
                      clearable
                      @change="getHousePlanList(1)"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="房号">
                    <el-input
                      v-model="housePlanListForm.houseNo"
                      clearable
                      @change="getHousePlanList(1)"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="户型">
                    <el-select
                      v-model="housePlanListForm.type"
                      placeholder="请选择"
                      style="width: 100%"
                      clearable
                      @change="getHousePlanList(1)"
                    >
                      <el-option
                        v-for="(item, index) in typeData"
                        :label="item.name"
                        :value="item.value"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="状态">
                    <el-select
                      v-model="housePlanListForm.state"
                      placeholder="请选择"
                      style="width: 100%"
                      clearable
                      @change="getHousePlanList(1)"
                    >
                      <el-option
                        :label="item.name"
                        :value="item.value"
                        v-for="(item, index) in stateData"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="预测绘建筑面积" label-width="7.5rem">
                    <el-row :gutter="0">
                      <el-col :span="10">
                        <el-input
                          v-model="housePlanListForm.areaMin"
                          clearable
                          @change="getHousePlanList(1)"
                        ></el-input>
                      </el-col>
                      <el-col class="line" :span="4" style="text-align: center">至</el-col>
                      <el-col :span="10">
                        <el-input
                          v-model="housePlanListForm.areaMax"
                          clearable
                          @change="getHousePlanList(1)"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="竣工建筑面积" label-width="6.5rem">
                    <el-row :gutter="0">
                      <el-col :span="11">
                        <el-input
                          v-model="housePlanListForm.completionAreabegain"
                          clearable
                          @change="getHousePlanList(1)"
                        ></el-input>
                      </el-col>
                      <el-col class="line" :span="2" style="text-align: center">-</el-col>
                      <el-col :span="11">
                        <el-input
                          v-model="housePlanListForm.completionAreaEnd"
                          clearable
                          @change="getHousePlanList(1)"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item style="text-align:right">
                    <el-button type="primary" @click="getHousePlanList(1)">查询</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!--表格-->
            <div>
              <el-table
                :data="housePlanList"
                border
                :header-cell-style="globalHeaderStyle"
                :cell-style="globalCellStyle"
              >
                <el-table-column label="序号" type="index" width="55"></el-table-column>
                <el-table-column prop="districtName" label="小区"></el-table-column>
                <el-table-column prop="buildName" label="栋号"></el-table-column>
                <el-table-column prop="houseNo" label="房号"></el-table-column>
                <el-table-column prop="typeName" label="户型"></el-table-column>
                <el-table-column prop="coveredArea" label="预测绘建筑面积(平方米)"></el-table-column>
                <el-table-column prop="completionArea" label="竣工建筑面积(平方米)"></el-table-column>
                <el-table-column prop="allocationRightUnit" label="分配权归属"></el-table-column>
                <el-table-column prop="signatoryRightUnit" label="签约权归属"></el-table-column>
                <el-table-column prop="houseStateName" label="房屋状态"></el-table-column>
                <el-table-column prop="stateName" label="房源状态"></el-table-column>
              </el-table>
            </div>
            <div class="page_box">
              <el-pagination
                @size-change="housePlanListSizeChange"
                @current-change="housePlanListCurrentChange"
                :current-page="housePlanListPage.currentPage"
                :page-sizes="housePlanListPage.pageSizesList"
                :page-size="housePlanListPage.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="housePlanListPage.totalNumber"
                background
              ></el-pagination>
            </div>
          </div>
          <div>
            <publicTitle title="审核意见"></publicTitle>
            <el-table
              :data="housePlanOpinion"
              border
              size="mini"
              :header-cell-style="globalHeaderStyle"
              :cell-style="globalCellStyle"
            >
              <el-table-column prop="activitySource" label="环节"></el-table-column>
              <el-table-column prop="dealer" label="办理人"></el-table-column>
              <el-table-column prop="dealTime" label="办理时间"></el-table-column>
              <el-table-column prop="remark" label="办理意见"></el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 分配批次信息 -->
        <div v-if="this.allocationBatchInfoShow">
          <!-- 轮候配租页面 -->
          <div v-if="this.distributionType==11">
            <publicTitle title="批次基本信息"></publicTitle>
            <table :model="batchInfo" class="detail">
              <tr>
                <td class="must">供应计划</td>
                <td>
                  <el-select
                    disabled
                    v-model="batchInfo.supplyCode"
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="(item, index) in supplyCodeOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>批次代码</td>
                <td>
                  <el-input v-model="batchInfo.code" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td class="must">批次名称</td>
                <td>
                  <el-input v-model="batchInfo.name" clearable disabled></el-input>
                </td>
                <td>分配方式</td>
                <td>
                  <el-select v-model="batchInfo.distributeType" class="w100" clearable disabled>
                    <el-option
                      v-for="(item,index) in distributeTypeData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>分配主体</td>
                <td>
                  <el-input v-model="batchInfo.distributionSubjectName" clearable disabled></el-input>
                </td>
                <td class="must">签约类型</td>
                <td>
                  <el-cascader
                    v-model="batchInfo.signTypeCascade"
                    :options="signType"
                    style="width: 100%"
                    separator="=>"
                  ></el-cascader>
                </td>
              </tr>
              <tr>
                <td>合同类型</td>
                <td>
                  <el-select
                    v-model="batchInfo.contractType"
                    placeholder="请选择"
                    clearable
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in contractType"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>租金标准</td>
                <td>
                  <el-select
                    v-model="batchInfo.rentStandard "
                    placeholder="请选择"
                    clearable
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in rentStandard"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>租赁起始日期</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="batchInfo.rentalStartTime"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
                <td>租赁结束日期</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="batchInfo.rentalEndTime"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>是否计算超面积租金</td>
                <td>
                  <el-radio-group v-model="batchInfo.sfjscmjzj " disabled>
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </td>
                <td>交租起始年月</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="batchInfo.rentStartTime"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>外网选房结果公示时间</td>
                <td>
                  <el-row :gutter="0">
                    <el-col :span="11">
                      <el-date-picker
                        style="width: 100%"
                        v-model="batchInfo.publicBeginDate"
                        disabled
                        placeholder="点击请选择年月日"
                        label-width="7rem"
                      ></el-date-picker>
                    </el-col>
                    <el-col :span="2">-</el-col>
                    <el-col :span="11">
                      <el-date-picker
                        style="width: 100%"
                        v-model="batchInfo.publicBeginEnd"
                        disabled
                        placeholder="点击请选择年月日"
                        label-width="7rem"
                      ></el-date-picker>
                    </el-col>
                  </el-row>
                </td>
                <td>批次结束时间</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="batchInfo.endDate"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>本批次认租通告的官网访问地址</td>
                <td colspan="3">
                  <el-input v-model="batchInfo.rztgdz" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>本批次认租通告的标题</td>
                <td colspan="3">
                  <el-input v-model="batchInfo.rztgdzbt" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>本批次资格核查结果公示的官网访问地址</td>
                <td colspan="3">
                  <el-input v-model="batchInfo.zghcjgdz" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>本批次资格核查结果公示的标题</td>
                <td colspan="3">
                  <el-input v-model="batchInfo.zghcjgdzbt" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>本批次选房名单公示的官网访问地址</td>
                <td colspan="3">
                  <el-input v-model="batchInfo.xfmdgsdz" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>本批次选房名单公示的标题</td>
                <td colspan="3">
                  <el-input v-model="batchInfo.xfmdgsdzbt" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>批次备注</td>
                <td colspan="3">
                  <el-input v-model="batchInfo.remark" clearable disabled></el-input>
                </td>
              </tr>
            </table>
          </div>
          <!-- 配租周转房页面、定向个人、定向单位 -->
          <div
            v-if="this.distributionType==12||this.distributionType==22||this.distributionType==32 ||this.distributionType==14"
          >
            <publicTitle title="批次基本信息"></publicTitle>
            <table :model="batchInfo" class="detail">
              <tr>
                <td class="must">供应计划</td>
                <td>
                  <el-select
                    disabled
                    v-model="batchInfo.supplyCode"
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="(item, index) in supplyCodeOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>批次代码</td>
                <td>
                  <el-input v-model="batchInfo.code" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td class="must">批次名称</td>
                <td>
                  <el-input v-model="batchInfo.name" clearable disabled></el-input>
                </td>
                <td class="must">签约类型</td>
                <td>
                  <el-cascader
                    v-model="batchInfo.signTypeCascade"
                    :options="signType"
                    style="width: 100%"
                    separator="=>"
                  ></el-cascader>
                </td>
              </tr>
              <tr>
                <td>分配方式</td>
                <td>
                  <el-select v-model="batchInfo.distributeType" class="w100" clearable disabled>
                    <el-option
                      v-for="(item,index) in distributeTypeData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>分配主体</td>
                <td>
                  <el-input v-model="batchInfo.distributionSubjectName" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>合同类型</td>
                <td>
                  <el-select
                    v-model="batchInfo.contractType"
                    placeholder="请选择"
                    clearable
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in contractType"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>租金标准</td>
                <td>
                  <el-select
                    v-model="batchInfo.rentStandard "
                    placeholder="请选择"
                    clearable
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in rentStandard"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>租赁起始日期</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="batchInfo.rentalStartTime"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
                <td>租赁结束日期</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="batchInfo.rentalEndTime"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>是否计算超面积租金</td>
                <td>
                  <el-radio-group v-model="batchInfo.sfjscmjzj " disabled>
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </td>
                <td>交租起始年月</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="batchInfo.rentStartTime"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>制定时间</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="batchInfo.startDate"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
                <td>批次结束时间</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="batchInfo.endDate"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>批次备注</td>
                <td colspan="3">
                  <el-input v-model="batchInfo.remark" clearable disabled></el-input>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!--租后部分-->
        <div v-if="this.afterRentShow">
          <publicTitle title="续约信息"></publicTitle>
          <el-table
            :data="housePlanList"
            border
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
          >
            <el-table-column label="序号" type="index" width="55"></el-table-column>
            <el-table-column label="姓名(单位名称)"></el-table-column>
            <el-table-column label="证件号码"></el-table-column>
            <el-table-column label="合同编号"></el-table-column>
            <el-table-column label="分配方式"></el-table-column>
            <el-table-column label="合同开始时间"></el-table-column>
            <el-table-column label="合同结束时间"></el-table-column>
            <el-table-column label="状态"></el-table-column>
          </el-table>
          <publicTitle title="临时协议信息"></publicTitle>
          <el-table
            :data="housePlanList"
            border
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
          >
            <el-table-column label="序号" type="index" width="55"></el-table-column>
            <el-table-column label="姓名(单位名称)"></el-table-column>
            <el-table-column label="证件号码"></el-table-column>
            <el-table-column label="合同编号"></el-table-column>
            <el-table-column label="购房/调房地址"></el-table-column>
            <el-table-column label="合同开始时间"></el-table-column>
            <el-table-column label="合同结束时间"></el-table-column>
            <el-table-column label="状态"></el-table-column>
          </el-table>
          <publicTitle title="退房信息"></publicTitle>
          <el-table
            :data="housePlanList"
            border
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
          >
            <el-table-column label="序号" type="index" width="55"></el-table-column>
            <el-table-column label="姓名(单位名称)"></el-table-column>
            <el-table-column label="证件号码"></el-table-column>
            <el-table-column label="合同编号"></el-table-column>
            <el-table-column label="退房类型"></el-table-column>
            <el-table-column label="退房时间"></el-table-column>
          </el-table>
        </div>
        <!--签约信息 -->
        <div v-if="this.signInfoShow">
          <!-- 个人签约信息页面 -->
          <div v-if="this.signType==0">
            <publicTitle title="承租人信息"></publicTitle>
            <table :model="signUnitInfo" class="detail">
              <tr>
                <td>姓名</td>
                <td>
                  <el-input v-model="signUnitInfo.XM" disabled></el-input>
                </td>
                <td>证件类型</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.ZJLX"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in zjlxOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>证件号码</td>
                <td>
                  <el-input v-model="signUnitInfo.ZJH" disabled></el-input>
                </td>
                <td>性别</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.XB"
                    disabled
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in xbOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>出生日期</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signUnitInfo.CSRQ"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
                <td>婚姻状况</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.HYZT"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in hyztOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>婚姻形成时间</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signUnitInfo.JHSJ"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
                <td>子女状况</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.ZNZK"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in znzkoptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>学历</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.XL"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in xlOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>学位</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.XW"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in xwOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>职务</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.ZW"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in zwOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>职称</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.ZGZC"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in zcOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>户口所在地</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.HKSZD"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in hkszdOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>邮政编码</td>
                <td>
                  <el-input v-model="signUnitInfo.YB" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>移动电话1</td>
                <td>
                  <el-input v-model="signUnitInfo.SJHM" clearable disabled></el-input>
                </td>
                <td>移动电话2</td>
                <td>
                  <el-input v-model="signUnitInfo.SJHM2" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>工作单位</td>
                <td colspan="3">
                  <el-input v-model="signUnitInfo.DWMC" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>通讯地址</td>
                <td colspan="3">
                  <el-input v-model="signUnitInfo.TXDZ" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>单位性质</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.DWXZ"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in dwxzOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>固定电话</td>
                <td>
                  <el-input v-model="signUnitInfo.DHHM" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>承租信息备注</td>
                <td colspan="3">
                  <el-input v-model="signUnitInfo.BZ" clearable disabled></el-input>
                </td>
              </tr>
            </table>
            <publicTitle title="承租住房及签约信息"></publicTitle>
            <table :model="signInfo" class="detail">
              <tr>
                <!-- <td>房源初始类型</td>
                <td>
                  <el-input v-model="signInfo.fwsclx" clearable disabled></el-input>
                </td>-->
                <td>签约类型</td>
                <td>
                  <el-input v-model="signInfo.qylx" disabled></el-input>
                </td>
                <td>分配业务类型</td>
                <td>
                  <el-select style="width: 100%;" v-model="signInfo.fplx" disabled>
                    <el-option
                      v-for="(item, index) in fpywlxOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>租金标准</td>
                <td>
                  <el-input v-model="signInfo.zjbz" clearable disabled></el-input>
                </td>
                <td>租金单价</td>
                <td>
                  <el-input v-model="signInfo.zjdj" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>租赁起始日期</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.zlkssj"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
                <td>租赁结束日期</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.zljssj"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>租金金额</td>
                <td>
                  <el-input v-model="signInfo.zjje" clearable disabled></el-input>
                </td>
                <td>交租起始年月</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.jzqsny"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>首月应交租金</td>
                <td>
                  <el-input v-model="signInfo.syyjzj" clearable disabled></el-input>
                </td>
                <td>首次合同起始时间</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.schtqssj"
                    disabled
                    placeholder="点击请选择年月日"
                    label-width="7rem"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>托收银行</td>
                <td>
                  <el-input v-model="signInfo.tsyh" clearable disabled></el-input>
                </td>
                <td>托收账户</td>
                <td>
                  <el-input v-model="signInfo.tszh" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>是否邮寄</td>
                <td>
                  <el-input v-model="signInfo.yj" clearable disabled></el-input>
                </td>
                <td>邮寄地址</td>
                <td>
                  <el-input v-model="signInfo.yjdz" clearable disabled></el-input>
                </td>
              </tr>
            </table>
            <publicTitle title="其他同住人资料(家庭成员)"></publicTitle>
            <el-table
              :data="signOtherPersonalInfo"
              border
              :header-cell-style="globalHeaderStyle"
              :cell-style="globalCellStyle"
            >
              <el-table-column label="姓名" prop="xm"></el-table-column>
              <el-table-column label="证件类型" prop="zjlx"></el-table-column>
              <el-table-column label="证件号码" prop="zjhm"></el-table-column>
              <el-table-column label="身份证号" prop="sfzh"></el-table-column>
              <el-table-column label="户口所在地" prop="hkszd"></el-table-column>
              <el-table-column label="与申请人关系" prop="yzsqrgx"></el-table-column>
              <el-table-column label="入住时间" prop="rzsj"></el-table-column>
              <el-table-column label="搬离时间" prop="blsj"></el-table-column>
              <el-table-column label="工作单位" prop="gzdw"></el-table-column>
              <el-table-column label="移动电话" prop="yddh"></el-table-column>
              <el-table-column label="是否共同申请人" prop="sfgtsqr"></el-table-column>
            </el-table>
          </div>
          <!-- 单位签约信息页面 -->
          <div v-if="this.signType==1">
            <publicTitle title="单位基本信息"></publicTitle>
            <table :model="signUnitInfo" class="detail">
              <tr>
                <td>单位名称</td>
                <td colspan="3">
                  <el-input v-model="signUnitInfo.DWMC" clearable disabled></el-input>
                </td>
                <td>单位性质</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.XZ"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in dwxzOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>重点单位类型</td>
                <td>
                  <el-input v-model="signUnitInfo.ZDDWLX" clearable disabled></el-input>
                </td>
                <td>单位证件类型</td>
                <td>
                  <el-input v-model="signUnitInfo.DWZJLX" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>单位证件号码</td>
                <td>
                  <el-input v-model="signUnitInfo.YUAN_DWZJHM" clearable disabled></el-input>
                </td>
                <td>详细地址</td>
                <td>
                  <el-input v-model="signUnitInfo.DWDZ" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>法人代表姓名</td>
                <td>
                  <el-input v-model="signUnitInfo.FR" clearable disabled></el-input>
                </td>
                <td>证件类型</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.FRZJLX"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in zjlxOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>证件号码</td>
                <td>
                  <el-input v-model="signUnitInfo.FRZJHM" clearable disabled></el-input>
                </td>
                <td>移动电话</td>
                <td>
                  <el-input v-model="signUnitInfo.FRDH" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>住房专员姓名</td>
                <td>
                  <el-input v-model="signUnitInfo.ZFZY" clearable disabled></el-input>
                </td>
                <td>证件类型</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.ZYZJLX"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in zjlxOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>证件号码</td>
                <td>
                  <el-input v-model="signUnitInfo.ZYZJH" clearable disabled></el-input>
                </td>
                <td>移动电话</td>
                <td>
                  <el-input v-model="signUnitInfo.ZFZYLXDH" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>住房专员姓名2</td>
                <td>
                  <el-input v-model="signUnitInfo.ZFZY2" clearable disabled></el-input>
                </td>
                <td>证件类型2</td>
                <td>
                  <el-select
                    v-model="signUnitInfo.ZYZJLX2"
                    clearable
                    placeholder="请选择"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="(item,index) in zjlxOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>证件号码2</td>
                <td>
                  <el-input v-model="signUnitInfo.ZFZY2" clearable disabled></el-input>
                </td>
                <td>移动电话2</td>
                <td>
                  <el-input v-model="signUnitInfo.ZFZYLXDH2" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>备注</td>
                <td colspan="3">
                  <el-input v-model="signUnitInfo.bz" clearable disabled></el-input>
                </td>
              </tr>
            </table>
            <publicTitle title="签约信息"></publicTitle>
            <table :model="signInfo" class="detail">
              <tr>
                <td>分配业务类型</td>
                <td>
                  <el-select style="width: 100%;" v-model="signInfo.fplx" disabled>
                    <el-option
                      v-for="(item, index) in fpywlxOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>签约类型</td>
                <td>
                  <el-input v-model="signInfo.qylx" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>租金标准</td>
                <td>
                  <el-input v-model="signInfo.zjbz" clearable disabled></el-input>
                </td>
                <td>面积</td>
                <td>
                  <el-input v-model="signInfo.zmj" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>租赁起始日期</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.zlkssj"
                    disabled
                    placeholder="点击请选择年月日"
                  ></el-date-picker>
                </td>
                <td>租赁结束日期</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.zljssj"
                    disabled
                    placeholder="点击请选择年月日"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>租金金额</td>
                <td>
                  <el-input v-model="signInfo.zjje" clearable disabled></el-input>
                </td>
                <td>交租起始年月</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.jzqsny"
                    disabled
                    placeholder="点击请选择年月日"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>首月应交租金</td>
                <td>
                  <el-input v-model="signInfo.syyjzj" clearable disabled></el-input>
                </td>
                <td>首次合同起始时间</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.schtqssj"
                    disabled
                    placeholder="点击请选择年月日"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>托收银行</td>
                <td>
                  <el-input v-model="signInfo.tsyh" clearable disabled></el-input>
                </td>
                <td>托收账户</td>
                <td>
                  <el-input v-model="signInfo.tszh" disabled></el-input>
                </td>
              </tr>
              <tr>
                <!-- <td>是否更新房账号</td>
                <td>
                  <el-input v-model="signInfo" clearable disabled></el-input>
                </td>-->
                <td>是否邮寄</td>
                <td colspan="3">
                  <el-input v-model="signInfo.yj" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>邮寄地址</td>
                <td>
                  <el-input v-model="signInfo.yjdz" clearable disabled></el-input>
                </td>
                <td>是否短信通知</td>
                <td>
                  <el-input v-model="signInfo.XYDXTZ" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>保证金金额</td>
                <td>
                  <el-input v-model="signInfo.bzjje" clearable disabled></el-input>
                </td>
                <td>押金金额</td>
                <td>
                  <el-input v-model="signInfo.yjje" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>押金交款方式</td>
                <td>
                  <el-input v-model="signInfo.yjjkfs" clearable disabled></el-input>
                </td>
                <td>押金交款时间</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.yjjksj"
                    disabled
                    placeholder="点击请选择年月日"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>合同类型</td>
                <td>
                  <el-input v-model="signInfo.htlx" clearable disabled></el-input>
                </td>
                <td>合同编号</td>
                <td>
                  <el-input v-model="signInfo.htbh" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>合同签订时间</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.htqdsj"
                    disabled
                    placeholder="点击请选择年月日"
                  ></el-date-picker>
                </td>
                <td>首次签订时间</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.schtqssj"
                    disabled
                    placeholder="点击请选择年月日"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>已收首月租金</td>
                <td>
                  <el-input v-model="signInfo.yssyzj" clearable disabled></el-input>
                </td>
                <td>已收押金</td>
                <td>
                  <el-input v-model="signInfo.ysyj" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>领取钥匙数量</td>
                <td>
                  <el-input v-model="signInfo.lqyssl" clearable disabled></el-input>
                </td>
                <td>领取钥匙时间</td>
                <td>
                  <el-date-picker
                    style="width: 100%"
                    v-model="signInfo.lqyssj"
                    disabled
                    placeholder="点击请选择年月日"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>领取钥匙人</td>
                <td>
                  <el-input v-model="signInfo.lqysr" clearable disabled></el-input>
                </td>
                <td>经办人</td>
                <td>
                  <el-input v-model="signInfo.jbrmc" clearable disabled></el-input>
                </td>
              </tr>
              <!-- <tr>
                <td>备注</td>
                <td colspan="3">
                  <el-input v-model="signInfo" clearable disabled></el-input>
                </td>
              </tr>-->
            </table>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 查看日志 -->
    <el-dialog
      title="查看日志"
      :visible.sync="logDialog"
      v-if="logDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <el-form size="mini" :model="logForm" label-width="5rem">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="日志类型">
              <el-select v-model="logForm.auditType" clearable>
                <el-option
                  v-for="(item, index) in logType"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房屋状态">
              <el-select v-model="logForm.state" clearable>
                <el-option
                  v-for="(item, index) in houseState"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" size="mini" @click="getLog()">查 询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="table-list">
        <el-table
          :data="logList"
          border
          height="300"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="processTime" label="操作日期" sortable width="140"></el-table-column>
          <el-table-column prop="subjectUnit" label="单位" width="180"></el-table-column>
          <el-table-column prop="subjectName" label="操作人" width="80"></el-table-column>
          <el-table-column prop="operationTypeName" label="日志类型" width="80"></el-table-column>
          <el-table-column prop="actionName" label="操作" width="160"></el-table-column>
          <el-table-column prop="context" label="详情"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 维修状态-查看历史 -->
    <el-dialog title="查看历史" :visible.sync="historyDialog">
      <el-table
        :data="historyTable"
        border
        :header-cell-style="globalHeaderStyle"
        :cell-style="globalCellStyle"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="维修状态" prop="maintainTypeName"></el-table-column>
        <el-table-column label="登记人" prop="registrant"></el-table-column>
        <el-table-column label="登记时间" prop="registrantDate"></el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="checkhisInfo(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizesList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          align="right"
          background
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 维修状态-查看历史详情弹框 -->
    <el-dialog title="查看详情" :visible.sync="hisInfoDialog">
      <div class="tableStyle">
        <table>
          <tr>
            <td>维修状态</td>
            <td>{{historyInfo.maintainTypeName}}</td>
            <td>登记人</td>
            <td>{{historyInfo.registrant}}</td>
          </tr>
          <tr>
            <td>登记时间</td>
            <td>{{historyInfo.registrantDate}}</td>
            <td>文号</td>
            <td>{{historyInfo.maintainNo}}</td>
          </tr>
          <tr>
            <td>文号日期</td>
            <td>{{historyInfo.maintainNoDate}}</td>
            <td>备注</td>
            <td>{{historyInfo.remark}}</td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/house.js";
import api from "@/api/houseApproval";
import https from "@/api/vacuumRoominquire.js";
import housestore from "@/api/housestore";
import publicTitle from "@/components/TitleStyle"; //标题组件
import TitleStylex from "@/components/TitleStylex"; //带按钮的标题组件
import publicMethod from "@/api/publicMethod";
import Material from "@/components/CorrelativeMaterial";
export default {
  name: "buildingDetails",
  components: {
    publicTitle, //标题公共组件
    TitleStylex, //带按钮的标题公共组件
    Material, //公共组件
  },
  data() {
    return {
      val: "3",
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" },
      ], //是否下拉菜单
      isShow: false, //根据不同的签约类型的显隐开关
      form: {}, //基本信息
      activeName: [],
      typeData: [], //户型
      orientationData: [], //朝向
      terraceData: [], //平台
      divisionUnit: [], //分配权归属单位下拉框
      signingUnit: [], //签约权归属单位下拉框
      maintenanceUnit: [], //数据维护权归属单位下拉框
      operations: [], //运维权归属单位下拉框
      originalPropertyData: [], //当前属性下拉框
      currentPropertyData: [], //初始属性下拉框
      sourceData: [], //房屋来源
      functionData: [], //房屋用途
      houseType: [], //房屋性质
      outstock: {}, //核销记录
      checkAttachmentDialog: false, //附件弹框
      relieveDialog: false, //解除弹框
      situationalList: [], //问题房源标注列表
      situationalInfo: "", //问题列表的详情信息
      parameter: "", //过程材料传参
      removeBasis: "", //解除依据
      relieveList: [], //预留情况列表
      incomingAndOutgoingStatusList: [], //入库和出库情况列表
      propertyRightRecordsDialog: false, //产权记录弹框
      propertyRightRecordsList: [], //产权记录列表
      natureRecordsDialog: false, //性质变更记录弹框
      natureChangeRecordsList: [], //性质变更记录列表
      title: "", //标题
      historyRecordsDialog: false, //历史记录弹框
      allocationRecordsList: [], //性质变更记录列表
      signatoryRightRecordsList: [], //性质变更记录列表
      InitialMaintainRightRecordsList: [], //性质变更记录列表
      perationalRightRecordsList: [], //性质变更记录列表
      propertyRightRecordsDetailDialog: false, //产权记录详细情况弹框
      propertyRightDetailform: {}, //产权变更详细记录表单
      propertyRightDetailTable: [], //产权变更详细记录选中房表格
      detailOpinion: [], //产权变更详细记录选中房意见
      propertyRightDetailPage: {
        //产权变更选中房的分页的数据
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      propertyRightDetailCode: "", //产权变更详情code码
      natureRecordsDetailDialog: false, //性质变更记录详细情况弹框
      natureDetailform: {}, //性质变更详细记录表单
      natureDetailTable: [], //性质变更详细记录选中房表格
      natureDetailPage: {
        //性质变更选中房的分页的数据
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      natureDetailCode: "", //性质变更详情code码
      openCollapse: "1", //默认打开第一个
      rentSituationList: [], //出租情况列表
      rentSituationDetailDialog: false, //查看出租详情弹框是否打开
      housePlanInfoShow: false, //房源计划显示和隐藏(轮候显示，定向隐藏)
      allocationBatchInfoShow: false, //批次基本信息的显隐
      signInfoShow: false, //签约信息的显隐
      afterRentShow: false, //租后信息的显隐
      housePlanFrom: {}, //房源计划表格信息
      queueStr: "", //队列显示在input内
      groupStr: "", //分组显示在input内
      planUseData: [], //计划用途下拉
      supplyCodeOptions: [], //供应计划下拉
      planPropertyData: [], //计划属性下拉
      housePlanListForm: {}, //房源计划选中房查询条件
      housePlanList: [], //房源计划选中房列表
      housePlanListPage: {
        currentPage: 1,
        pageSize: 100,
        pageSizesList: [100, 200, 500, 1000],
        totalNumber: 0, //数据的总数
      },
      stateData: [], //房屋状态下拉列表
      planGuid: "", //计划的guid
      planPid: "", //计划的pid
      housePlanOpinion: [], //房源计划审核意见列表
      show: false,
      generalMessageDialog: false, //看分配方式、租后信息、查看签约信息的弹框是否打开
      signUpGuid: "", //签约标识
      batchCode: "", //批次代码
      distributionType: "", //分配方式
      batchInfo: {}, //批次信息
      signInfo: {}, //签约信息
      signOtherPersonalInfo: [], //签约其他人信息
      signUnitInfo: {}, //签约单位信息
      signType: "", //签约类型(区分单位还是个人)
      contractType: [], //合同类型
      rentStandard: [], //租金标准
      signType: [], //签约方式
      distributeTypeData: [], //分配方式
      fwcslxOptions: [], //房屋初始类型
      hxOptions: [], //户型
      zjlxOptions: [], //证件类型
      xbOptions: [], //性别
      hyztOptions: [], //婚姻状况
      znzkoptions: [], //子女状况
      xlOptions: [], //学历
      xwOptions: [], //学位
      zwOptions: [], //职务
      zcOptions: [], //职称
      hkszdOptions: [], //户口所在地
      dwxzOptions: [], //单位性质
      ysqrgxOptions: [], //与申请人关系
      fpywlxOptions: [], //分配业务类型
      isPutShow: true,
      houseGuid: "", //房屋标识
      errataDetailPage: {
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      errataInfoPage: {
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      erratList: [],
      erratDetailList: [],
      erratAreaList: [],
      erratImportList: [],
      houseErrataDetailDialog: false, //查看勘误修改详情
      houseErrataAreaDetailDialog: false, //查看面积勘误详情
      houseErrataImportDetailDialog: false, //查看信息导入需改详情
      errataType: "", //勘误类型
      logList: [], //日志列表
      logForm: {
        auditType: "", //日志类型
        state: "", //房屋状态
      },
      logDialog: false, //日志弹框显隐
      logType: [], //日志类型
      houseState: [
        { name: "空房", value: "空房" },
        { name: "已预留", value: "已预留" },
        { name: "准计划", value: "准计划" },
        { name: "已计划", value: "已计划" },
        { name: "已分配未签约", value: "已分配未签约" },
        { name: "已出租", value: "已出租" },
        { name: "已签协议未签合同", value: "已签协议未签合同" },
        { name: "已出售", value: "已出售" },
        { name: "已取得全部产权", value: "已取得全部产权" },
        { name: "已拆除", value: "已拆除" },
        { name: "长租住房租赁到期", value: "长租住房租赁到期" },
        { name: "其他原因出库", value: "其他原因出库" },
        { name: "预房屋", value: "预房屋" },
      ], //房屋状态
      stateList: [], //维修类型
      historyDialog: false, //查看历史弹框显隐
      historyTable: [], //历史表格数据
      //分页数据
      total: 0, //数据总条数
      pageSize: 10, //当前页条数
      currentPage: 1, //当前页
      pageSizesList: [10, 20, 30, 50], //分页下拉框
      hisInfoDialog: false, //查看历史详情弹框
      historyInfo: {}, //维修历史详情
    };
  },
  computed: {},
  methods: {
    //返回
    goback() {
      let tab = {};
      if (this.$route.query.childtitle == "房屋综合查询") {
        tab = {
          label: "房屋综合查询",
          name: "inquireHouse",
        };
      } else if (this.$route.query.childtitle == "可分配房源查询") {
        tab = {
          label: "可分配房源查询",
          name: "vacuumRoominquire",
        };
      } else if (this.$route.query.childtitle == "全市房屋综合查询") {
        tab = {
          label: "全市房屋综合查询",
          name: "cityWideInquireHouse",
        };
      }

      this.openTopTab(tab);
    },
    //打开查看页面弹框
    openCheckPeople() {
      this.checkPeopleDialog = true;
      this.getOccupancy();
    },
    //获取字典数据
    getDictionary() {
      let nameData = [
        "房产来源",
        "住宅类型",
        "房屋性质",
        "户型",
        "朝向",
        "平台",
        "房屋来源",
        "房屋用途",
        "分配权归属单位",
        "签约权归属单位",
        "数据维护权归属",
        "运维权归属",
        "当前属性",
        "最初属性",
        "计划用途",
        "房屋状态",
        "供应计划",
        "分配方式",
        "签约类型1",
        "合同类型",
        "租金标准",
        "证件类型",
        "性别",
        "婚姻状态",
        "子女状况",
        "学历",
        "学位",
        "职务",
        "最高职称",
        "户口所在地",
        "单位性质",
        "与主申请人的关系",
        "分配业务类型",
        "日志操作类型",
        "维修类型",
      ];
      let params = { names: nameData.toString() };
      api
        .searchDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.stateList = res.维修类型;
          this.logType = res.日志操作类型;
          this.typeData = res.户型;
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
          this.terraceData = res.平台;
          this.divisionUnit = res.分配权归属单位;
          this.signingUnit = res.签约权归属单位;
          this.maintenanceUnit = res.数据维护权归属;
          this.operations = res.运维权归属;
          this.houseType = this.$dictionaryChange(
            res.房屋性质,
            this.houseType,
            "通用"
          );
          this.functionData = res.房屋用途;
          this.sourceData = res.房产来源;
          this.originalPropertyData = res.当前属性;
          this.currentPropertyData = res.最初属性;
          res.计划用途.splice(res.计划用途.length - 1, 1);
          this.planUseData = res.计划用途;
          this.stateData = res.房屋状态;
          this.supplyCodeOptions = res.供应计划;
          this.planUseData = res.计划用途;
          this.stateData = res.房屋状态;
          this.contractType = this.$dictionaryChange(
            res.合同类型,
            this.contractType,
            "分配配租"
          );
          let arr1 = res.租金标准;
          arr1.forEach((element) => {
            if (element.name == "分配") {
              this.rentStandard = element.children;
            }
          });
          this.distributeTypeData = this.$dictionaryChange(
            res.分配方式,
            this.distributeTypeData,
            "轮候配租批次"
          );
          let arr = res.签约类型1;
          this.signType = JSON.parse(
            JSON.stringify(arr).replace(/name/g, "label")
          );
          this.signType.forEach((item) => {
            item.children.forEach((element) => {
              if (!element.children.length) {
                element.children = null;
              }
            });
          });

          this.fwcslxOptions = res.房屋初始类型;
          this.zjlxOptions = this.$dictionaryChange(
            res.证件类型,
            this.zjlxOptions,
            "配租"
          );
          this.xbOptions = res.性别;
          console.log("===", this.xbOptions);
          this.hyztOptions = this.$dictionaryChange(
            res.婚姻状态,
            this.hyztOptions,
            "局建"
          );
          this.znzkoptions = this.$dictionaryChange(
            res.子女状况,
            this.znzkoptions,
            "配租"
          );
          this.xlOptions = this.$dictionaryChange(
            res.学历,
            this.xlOptions,
            "局建"
          );
          this.xwOptions = this.$dictionaryChange(
            res.学位,
            this.xwOptions,
            "配租"
          );
          this.zwOptions = this.$dictionaryChange(
            res.职务,
            this.zwOptions,
            "局建"
          );
          this.zcOptions = this.$dictionaryChange(
            res.最高职称,
            this.zcOptions,
            "配租"
          );
          this.hkszdOptions = this.$dictionaryChange(
            res.户口所在地,
            this.hkszdOptions,
            "局建"
          );
          this.dwxzOptions = this.$dictionaryChange(
            res.单位性质,
            this.dwxzOptions,
            "配租"
          );
          this.ysqrgxOptions = this.$dictionaryChange(
            res.与主申请人的关系,
            this.ysqrgxOptions,
            "配租签约"
          );
          this.fpywlxOptions = this.$dictionaryChange(
            res.分配方式,
            this.fpywlxOptions,
            "配租"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取房屋详情
    getHouseinfo() {
      let params = {
        guid: this.houseGuid,
      };
      http
        .getHouseInfo(params)
        .then((res) => {
          if (res) {
            this.form = res.houseInfo;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //问题房源标注-获取房源标记列表
    getSituationalList() {
      let params = {
        houseGuid: this.houseGuid,
      };
      http
        .getSituationalList(params)
        .then((res) => {
          this.situationalList = res.situational;
          this.relieveList = res.busy;
          this.incomingAndOutgoingStatusList = res.inputAndOut;
          if (this.incomingAndOutgoingStatusList[0].secondReviewer == null) {
            this.isPutShow = false;
          }
          if (res.outstock[0]) {
            this.outstock = res.outstock[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查看附件弹框
    checkAttachment(val) {
      this.checkAttachmentDialog = true;
      this.parameter = val.materialGuid;
    },
    //打开解除弹框
    openRelieveDialog(val) {
      this.relieveDialog = true;
      this.getSituationalInfo(val);
      this.parameter = val.materialGuid;
    },
    //获取要解除的房源信息
    getSituationalInfo(val) {
      let params = {
        situationalGuid: val.guid,
      };
      http
        .getSituationalInfo(params)
        .then((res) => {
          this.situationalInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //问题房源标注-解除房源标记信息
    removeSituationalInfo() {
      let params = {
        houseGuid: this.situationalInfo.houseGuid,
        situationalGuid: this.situationalInfo.guid,
        removeBasis: this.removeBasis,
      };
      http
        .removeSituationalInfo(params)
        .then((res) => {
          if (res) {
            this.$message({
              type: "success",
              message: "解除房源标记信息成功",
            });
            this.relieveDialog = false;
            this.getSituationalList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开产权记录弹框
    OpenPropertyRightRecordsDialog() {
      this.propertyRightRecordsDialog = true;
      this.getPropertyChangeInfo();
    },
    //得到历史产权变更记录
    getPropertyChangeInfo() {
      let params = {
        houseGuid: this.houseGuid,
      };
      publicMethod
        .getPropertyChangeInfo(params)
        .then((res) => {
          this.propertyRightRecordsList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开产权变更记录详情弹框
    OpenPropertyRightRecordsDetailDialog(val) {
      this.propertyRightRecordsDetailDialog = true;
      this.propertyRightDetailCode = val.code;
      this.getPropertyRightChangeInfo();
      this.getChangeOpinon(val);
    },
    //得到产权变更详情的申请信息和选中房
    getPropertyRightChangeInfo() {
      let params = {
        code: this.propertyRightDetailCode,
        pageIndex: this.propertyRightDetailPage.currentPage,
        pageSize: this.propertyRightDetailPage.pageSize,
      };
      publicMethod
        .getPropertyRightChangeInfo(params)
        .then((res) => {
          this.propertyRightDetailform = res;
          this.propertyRightDetailCode = res.code;
          this.propertyRightDetailTable = res.houseInfoDTOPage.content;
          this.propertyRightDetailPage.totalNumber =
            res.houseInfoDTOPage.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //产权变更详情选中房列表得到每页的编号
    propertyRightIndexMethod(index) {
      return (
        index +
        (this.propertyRightDetailPage.currentPage - 1) *
          this.propertyRightDetailPage.pageSize +
        1
      );
    },
    //产权变更详情每页大小变化
    propertyRightDetailSizeChange(val) {
      this.propertyRightDetailPage.pageSize = val;
      this.getPropertyRightChangeInfo();
    },
    //产权变更详情第几页的变化
    propertyRightDetailCurrentChange(val) {
      this.propertyRightDetailPage.currentPage = val;
      this.getPropertyRightChangeInfo();
    },
    //产权变更详情意见列表或者性质变更意见列表
    getChangeOpinon(val) {
      let params = {
        pid: val.pid,
      };
      publicMethod
        .getOpinion(params)
        .then((res) => {
          this.detailOpinion = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开性质变更历史记录弹框
    OpenNatureRecordsDialog() {
      this.natureRecordsDialog = true;
      this.getNatureChangeInfo();
    },
    //得到性质变更记录
    getNatureChangeInfo() {
      let params = {
        houseGuid: this.houseGuid,
      };
      publicMethod
        .getNatureChangeInfo(params)
        .then((res) => {
          this.natureChangeRecordsList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开性质变更记录详情弹框
    OpenNatureRecordsDetailDialog(val) {
      this.natureRecordsDetailDialog = true;
      this.natureDetailCode = val.code;
      this.getNatureChangeDetailInfo();
      this.getChangeOpinon(val);
    },
    //得到性质变更详情的申请信息和选中房
    getNatureChangeDetailInfo() {
      let params = {
        code: this.natureDetailCode,
        pageIndex: this.natureDetailPage.currentPage,
        pageSize: this.natureDetailPage.pageSize,
      };
      publicMethod
        .getNatureChangeDetailInfo(params)
        .then((res) => {
          this.natureDetailform = res;
          this.natureDetailCode = res.code;
          this.natureDetailTable = res.houseInfoDTOPage.content;
          this.natureDetailPage.totalNumber =
            res.houseInfoDTOPage.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //性质变更详情选中房列表得到每页的编号
    natureIndexMethod(index) {
      return (
        index +
        (this.natureDetailPage.currentPage - 1) *
          this.natureDetailPage.pageSize +
        1
      );
    },
    //性质变更详情每页大小变化
    natureDetailSizeChange(val) {
      this.natureDetailPage.pageSize = val;
      this.getNatureChangeDetailInfo();
    },
    //性质变更详情第几页的变化
    natureDetailCurrentChange(val) {
      this.natureDetailPage.currentPage = val;
      this.getNatureChangeDetailInfo();
    },
    //打开分配权变更弹框
    OpenAllocationRecordsDialog() {
      this.title = "查看分配权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //打开签约权变更弹框
    OpenSignatoryRightRecordsDialog() {
      this.title = "查看签约权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //打开数据维护权变更弹框
    OpenInitialMaintainRightRecordsDialog() {
      this.title = "查看数据维护权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //打开运维权变更弹框
    OpenOperationalRightRecordsDialog() {
      this.title = "查看运维权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //获取历史变更情况
    getHistoryInfo() {
      let params = {
        houseGuid: this.houseGuid,
      };
      publicMethod
        .getHistoryInfo(params)
        .then((res) => {
          this.allocationRecordsList = res.AllocationRight;
          this.signatoryRightRecordsList = res.SignatoryRight;
          this.InitialMaintainRightRecordsList = res.MaintainRight;
          this.perationalRightRecordsList = res.OperationalRight;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取房屋出租情况
    getRentInfo() {
      let params = {
        houseGuid: this.houseGuid,
      };
      publicMethod
        .getRentInfo(params)
        .then((res) => {
          this.rentSituationList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //出租详情查看
    openRentSituationDetailDialog(val) {
      this.rentSituationDetailDialog = true;
      this.planGuid = val.jhbs;
      this.planPid = val.jhpid;
      this.distributionType = val.fpfs;
      this.batchCode = val.pcdm;
      this.fpfs = val.fpfs;
      this.signUpGuid = val.qybz;
      this.signType = val.sfdw;
      this.openHousePlanDialog(val);
    },
    //得到计划属性
    getProperty() {
      if (this.planUseData) {
        for (let item of this.planUseData) {
          if (item.value == this.housePlanFrom.function) {
            this.planPropertyData = JSON.parse(JSON.stringify(item.children));
            break;
          }
        }
      }
    },
    //得到房源计划表格基本信息
    getHousePlanFrom() {
      let params = {
        guid: this.planGuid,
      };
      publicMethod
        .getHousePlan(params)
        .then((res) => {
          let arr = [],
            brr = [];
          this.housePlanFrom = res;
          if (res.queueInfo) {
            res.queueInfo.forEach((element) => {
              arr.push(element.name);
            });
          }
          if (res.groupInfo) {
            res.groupInfo.forEach((item) => {
              brr.push(item.name);
            });
          }
          this.queueStr = arr.toString(); //显示出来的
          this.groupStr = brr.toString(); //显示出来的
          this.getProperty();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取房源计划下选中房列表
    getHousePlanList(index) {
      if (index) {
        this.housePlanListPage.currentPage = index;
      }
      let params = {
        planGuid: this.planGuid,
        pageIndex: this.housePlanListPage.currentPage,
        pageSize: this.housePlanListPage.pageSize,
        areaMax: this.housePlanListForm.areaMax,
        areaMin: this.housePlanListForm.areaMin,
        districtName: this.housePlanListForm.districtName,
        houseNo: this.housePlanListForm.houseNo,
        state: this.housePlanListForm.state,
        type: this.housePlanListForm.type,
        buildName: this.housePlanListForm.buildName,
        completionAreabegain: this.housePlanListForm.completionAreabegain,
        completionAreaEnd: this.housePlanListForm.completionAreaEnd,
      };
      publicMethod
        .getReleasedHouseInfo(params)
        .then((res) => {
          this.housePlanList = res.content;
          this.housePlanListPage.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //每页的大小尺寸变化
    housePlanListSizeChange(val) {
      this.housePlanListPage.pageSize = val;
      this.getHousePlanList(1);
    },
    //当前的页码的大小改变
    housePlanListCurrentChange(val) {
      this.housePlanListPage.currentPage = val;
      this.getHousePlanList(1);
    },
    //获取审核意见列表
    gethousePlanOpinion() {
      let params = {
        pid: this.planPid,
      };
      publicMethod
        .getOpinion(params)
        .then((res) => {
          this.housePlanOpinion = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开房源计划弹框
    openHousePlanDialog() {
      this.allocationBatchInfoShow = false;
      this.signInfoShow = false;
      this.afterRentShow = false;
      if (this.planGuid) {
        this.housePlanInfoShow = true;
        this.getProperty();
        this.getHousePlanFrom();
        this.getHousePlanList();
        this.gethousePlanOpinion();
      } else {
        this.housePlanInfoShow = false;
      }
    },
    //打开分配基本信息弹框
    openAllocationBatchInfoDialog() {
      this.housePlanInfoShow = false;
      this.allocationBatchInfoShow = true;
      this.signInfoShow = false;
      this.afterRentShow = false;
      if (this.batchCode) {
        this.getBatchInfo();
      }
    },
    //获取批次信息
    getBatchInfo() {
      let params = {
        batchCode: this.batchCode,
      };
      publicMethod
        .getBatchInfo(params)
        .then((res) => {
          this.batchInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开签约信息弹框
    openSignUpInfoDialog() {
      this.housePlanInfoShow = false;
      this.allocationBatchInfoShow = false;
      this.signInfoShow = true;
      this.afterRentShow = false;
      if (this.signUpGuid) {
        this.getSignInfo();
      }
    },
    //得到签约详情
    getSignInfo() {
      let params = {
        signGuid: this.signUpGuid,
      };
      publicMethod
        .getSignInfo(params)
        .then((res) => {
          if (res.sign[0]) {
            this.signInfo = res.sign[0];
          }
          this.signOtherPersonalInfo = res.otherPersonalInfo;
          if (res.unitInfo[0]) {
            this.signUnitInfo = res.unitInfo[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开租后信息弹框
    openAfterRentDialog() {
      this.housePlanInfoShow = false;
      this.allocationBatchInfoShow = false;
      this.signInfoShow = false;
      this.afterRentShow = true;
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseErrataList() {
      let params = {
        houseGuid: this.houseGuid,
        pageIndex: this.errataDetailPage.currentPage,
        pageSize: this.errataDetailPage.pageSize,
      };
      publicMethod
        .getHouseErrataList(params)
        .then((res) => {
          this.erratList = res.content;
          this.errataDetailPage.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //pagesize的大小改变
    handleHouseSizeChange(val) {
      this.errataDetailPage.pageSize = val;
      this.getHouseErrataList(1);
    },
    //pageIndex改变的时候
    handleHouseCurrentChange(val) {
      this.errataDetailPage.currentPage = val;
      this.getHouseErrataList();
    },
    openHouseErrataDetailDialog(val) {
      this.errataType = val.kwlx;
      if (this.errataType == "修改信息") {
        this.houseErrataDetailDialog = true;
        this.getHouseErrataDetialInfo(val);
      } else if (this.errataType == "导入面积") {
        this.houseErrataAreaDetailDialog = true;
        this.getHouseExportDetialInfo1(val);
      } else if (this.errataType == "导入修改信息") {
        this.houseErrataImportDetailDialog = true;
        this.getHouseExportDetialInfo(val);
      }
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseErrataDetialInfo(val) {
      let params = {
        houseGuid: val.houseGuid,
        pid: val.pid,
        pageIndex: this.natureDetailPage.currentPage,
        pageSize: this.natureDetailPage.pageSize,
      };
      publicMethod
        .getHouseErrataDetialInfo(params)
        .then((res) => {
          this.erratDetailList = res.content;
          this.errataInfoPage.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //pagesize的大小改变
    houseSizeCurrentChange(val) {
      this.errataInfoPage.pageSize = val;
      this.getHouseErrataDetialInfo(1);
    },
    //pageIndex改变的时候
    houseIndexCurrentChange(val) {
      this.errataInfoPage.currentPage = val;
      this.getHouseErrataList();
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseExportDetialInfo1(val) {
      let params = {
        houseGuid: val.houseGuid,
        pid: val.pid,
        exportType: "1",
      };
      publicMethod
        .getHouseExportDetialInfo(params)
        .then((res) => {
          this.erratAreaList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseExportDetialInfo(val) {
      let params = {
        houseGuid: val.houseGuid,
        pid: val.pid,
        exportType: "2",
      };
      publicMethod
        .getHouseExportDetialInfo(params)
        .then((res) => {
          this.erratImportList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //返回
    goback() {
      this.$router.go(-1);
    },
    //打开日志弹框
    openLogDialog() {
      this.logDialog = true;
      this.getLog();
    },
    //查看日志
    getLog() {
      let guid = { houseGuid: this.houseGuid, type: "house" };
      let params = { ...this.logForm, ...guid };
      http
        .getLog(params)
        .then((res) => {
          this.logList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //历史查询
    searchHistory(val) {
      let params = {
        houseGuid: this.$route.params.guid,
        maintainGuid: val.guid || "",
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      };
      if (val.guid) {
        params.pageIndex = params.pageSize = 1;
      }
      https
        .getHouseMaintainLogList(params)
        .then((res) => {
          if (!params.maintainGuid) {
            this.historyTable = res.content;
            this.total = res.totalElements;
          } else {
            this.historyInfo = res.content[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //维修状态-查看历史
    checkHistory(val) {
      this.historyDialog = true;
      this.searchHistory(val);
    },
    //维修状态-查看历史详情
    checkhisInfo(val) {
      this.hisInfoDialog = true;
      this.searchHistory(val);
    },
    //当前页条数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchHistory();
    },
    //当前页跳转时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchHistory();
    },
  },
  mounted() {
    this.houseGuid = this.$parent.params.houseGuid;
    this.getHouseinfo();
    this.getDictionary();
    this.getSituationalList();
    this.getRentInfo();
    this.getHouseErrataList();
    this.Event.$on("HouseDetails", (data) => {
      if (data == "getSituationalList") {
        this.getSituationalList();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.btn_top {
  margin-left: 20px;
}
</style>
