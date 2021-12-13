<!--
 * @Author: 
 * @Date: 2019-12-04
 * @LastEditors: maxq
 * @Description: 修改审核环节
 * @model:入库审批双击进入批次详情Tab界面
 -->
<template>
	<div class="approvalDetails">
		<div class="content">
			<!--头部-->
			<div class="top" v-if="show">
				<div class="left">
					<div>
						<el-button type="primary" @click="dataVerification" size="small">数据核查</el-button>
					</div>
				</div>
			</div>
			<div class="buttonGroup">
				<el-button type="primary" size="mini" @click="getBack">返回</el-button>
			</div>
			<!-- 基本信息 -->
			<div>
				<dist-side-tab :menu="menu" :params="params"></dist-side-tab>
			</div>
		</div>
	</div>
</template>

<script>
	import DistSideTab from "@/components/DistSideTab";
	import {
		mapGetters
	} from "vuex";

	export default {
		components: {
			DistSideTab
		},
		data() {
			return {
				isShow: true,
				titleName: "",
				show: false,
				//页签参数 mxq
				params: {
					guid: "", //待办箱报批guid
					pid: "", //项目id
					tid: "" //任务id
				},
				menu: {
					children: [{
							id: "1",
							label: "报批基本信息",
							closable: true,
							active: true,
							component: () =>
								import(
									"@/views/houseManagement/houseapproval/approvalDetails/ApprovalInformation"
								)
						},
						{
							id: "2",
							label: "小区信息",
							closable: true,
							component: () =>
								import(
									"@/views/houseManagement/houseapproval/approvalDetails/CommunityInformation"
								)
						},
						{
							id: "3",
							label: "宗地信息",
							closable: true,
							component: () =>
								import(
									"@/views/houseManagement/houseapproval/approvalDetails/GroundInformation"
								)
						},
						{
							id: "4",
							label: "栋信息",
							closable: true,
							component: () =>
								import(
									"@/views/houseManagement/houseapproval/approvalDetails/BuildingInformation"
								)
						},
						{
							id: "5",
							label: "房源信息",
							closable: true,
							component: () =>
								import(
									"@/views/houseManagement/houseapproval/approvalDetails/HousingInformation"
								)
						},
						{
							id: "6",
							label: "配套设施信息",
							closable: true,
							component: () =>
								import(
									"@/views/houseManagement/houseapproval/approvalDetails/SupportingInformation"
								)
						},
						{
							id: "7",
							label: "过程材料",
							closable: true,
							component: () =>
								import(
									"@/views/houseManagement/houseapproval/approvalDetails/AttachmentInformation"
								)
						},
						{
							id: "8",
							label: "地图定位",
							closable: true,
							component: () =>
								import(
									"@/components/MapInfo"
								)
						},
					]
				}
			};
		},
		methods: {
			//数据核查
			dataVerification() {
				this.$alert("功能还未开发", "提示", {
					confirmButtonText: "确定"
				});
			},
			//返回
			getBack() {
				let tab = {
					label: "入库审批",
					name: "approvalChange"
				};
				this.openTopTab(tab);
			}
		},
		mounted() {
		},
	};
</script>

<style lang="scss" scoped>
</style>
