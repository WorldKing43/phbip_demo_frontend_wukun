<template>
	<div>
		<div>
			<!--基本信息-->
			<div>
				<div class="content">
					<!--头部-->
					<div class="buttonGroup">
						<el-button type="primary" size="mini" @click="getBack">返回</el-button>
						<el-button type="primary" size="mini" @click="handleRights" v-if="hasPerm('fygl_fyfwk_syqbg')">使用权变更</el-button>
						<el-button type="primary" size="mini" @click="outStoreShow" v-if="hasPerm('fygl_fyfwk_hx')">核销</el-button>
						<el-button type="primary" size="mini" @click="reserveShow" v-if="hasPerm('fygl_fyfwk_yl')">预留</el-button>
						<el-button type="primary" size="mini" @click="removeReserveShow" v-if="hasPerm('fygl_fyfwk_jcyl')">解除预留</el-button>
						<el-button type="primary" size="mini" @click="problemHouse" v-if="hasPerm('fygl_fyfwk_fybz')">空房标注</el-button>
						<el-button type="primary" size="mini" v-if="hasPerm('fygl_fyfwk_dwhgs')" @click="buildingInfoMaintainBelongShow">栋维护归属</el-button>
					</div>
					<div>
						<dist-side-tab :menu="menu" :params="params"></dist-side-tab>
					</div>
				</div>
			</div>
			<div class="dialog-box">
				<div v-if="isShowRights">
					<el-dialog title="使用权变更" :visible.sync="isShowRights" width="95%" :close-on-click-modal="false">
						<RightsDialog @isShow="closeDialog"></RightsDialog>
					</el-dialog>
				</div>
				<div v-if="outStoreShowFlag">
					<el-dialog title="核销" :visible.sync="outStoreShowFlag" width="95%" :close-on-click-modal="false">
						<OutStore @isShow="closeDialog"></OutStore>
					</el-dialog>
				</div>
				<div v-if="reserveShowFlag">
					<el-dialog title="预留" :visible.sync="reserveShowFlag" width="95%" :close-on-click-modal="false">
						<ReserveDialog @isShow="closeDialog"></ReserveDialog>
					</el-dialog>
				</div>
				<div v-if="removeReserveShowFlag">
					<el-dialog title="解除预留" :visible.sync="removeReserveShowFlag" width="95%" :close-on-click-modal="false">
						<RemoveReserveDialog @isShow="closeDialog"></RemoveReserveDialog>
					</el-dialog>
				</div>
				<div v-if="problemHouseFlag">
					<el-dialog title="空房标注" :visible.sync="problemHouseFlag" width="95%" :close-on-click-modal="false">
						<ProblemHouseDialog @isShow="closeDialog"></ProblemHouseDialog>
					</el-dialog>
				</div>
				<div v-if="buildingInfoMaintainBelongFlag">
					<el-dialog title="栋归属" :visible.sync="buildingInfoMaintainBelongFlag" width="95%" :close-on-click-modal="false">
						<BuildingInfoMaintainBelongDialog @isShow="closeDialog"></BuildingInfoMaintainBelongDialog>
					</el-dialog>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import DistSideTab from "@/components/DistSideTab";
	import {
		mapGetters
	} from "vuex";
	import RightsDialog from "./dialog/RightsDialog"; //使用权变更
	import OutStore from "./dialog/OutStore"; //核销
	import ReserveDialog from "./dialog/ReserveDialog"; //预留
	import RemoveReserveDialog from "./dialog/RemoveReserveDialog"; //解除预留
	import ProblemHouseDialog from "./dialog/ProblemHouseDialog"; //房源标注
	import BuildingInfoMaintainBelongDialog from "./dialog/BuildingInfoMaintainBelongDialog"; //房源标注

	export default {
		name: "newplan",
		components: {
			DistSideTab,
			RightsDialog,
			OutStore,
			ReserveDialog,
			RemoveReserveDialog,
			ProblemHouseDialog,
			BuildingInfoMaintainBelongDialog
		},

		data() {
			return {
				isShow: true,
				titleName: "",
				editableTabsValue: "1",
				isShowRights: false, //使用权变更
				outStoreShowFlag: false, //核销
				reserveShowFlag: false, //预留
				removeReserveShowFlag: false, //解除预留
				problemHouseFlag: false, //问题房源
				buildingInfoMaintainBelongFlag: false, //栋归属
				params: {
					guid: ""
				},
				menu: {
					children: [{
							id: "1",
							label: "小区信息",
							closable: true,
							active: true,
							component: () =>
								import(
									"@/views/houseManagement/housetransfer/details/NeighbourhoodInfo"
								)
						},
						{
							id: "2",
							label: "宗地信息",
							closable: true,
							component: () =>
								import("@/views/houseManagement/housetransfer/GroundInformation")
						},
						{
							id: "3",
							label: "栋信息",
							closable: true,
							component: () =>
								import("@/views/houseManagement/housetransfer/BuildingInfo")
						},
						{
							id: "4",
							label: "房屋信息",
							closable: true,
							component: () =>
								import("@/views/houseManagement/housetransfer/HouseInfo")
						},
						{
							id: "5",
							label: "配套设施信息",
							closable: true,
							component: () =>
								import(
									"@/views/houseManagement/housetransfer/SupportingInformation"
								)
						},
						{
							id: "6",
							label: "过程材料",
							closable: true,
							component: () =>
								import(
									"@/views/houseManagement/housetransfer/housetransferMaterials"
								)
						},
						{
							id: "7",
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
			//返回
			getBack() {
				let tab = {
					label: "房屋库",
					name: "housetransfer"
				};
				this.openTopTab(tab);
			},
			//出库
			outStoreShow() {
				this.outStoreShowFlag = true;
			},
			//预留
			reserveShow() {
				this.reserveShowFlag = true;
			},
			// 解除预留
			removeReserveShow() {
				this.removeReserveShowFlag = true;
			},
			//问题房源
			problemHouse() {
				this.problemHouseFlag = true;
			},
			//栋归属
			buildingInfoMaintainBelongShow() {
				this.buildingInfoMaintainBelongFlag = true;
			},
			handleRights() {
				this.isShowRights = true;
			},
			//关闭弹框
			closeDialog() {
				this.isShowRights = false;
				this.outStoreShowFlag = false; //出库
				this.reserveShowFlag = false; //预留
				this.removeReserveShowFlag = false; //解除预留
				this.problemHouseFlag = false; //问题房源
				this.buildingInfoMaintainBelongFlag = false; //问题房源
			}
		},
		mounted() {
			this.$route.query.houseGuid = this.$route.params.guid;
		},
	};
</script>

<style lang="scss" scoped>
	.content /deep/ .el-tabs__item {
		/*设置梯形*/
		position: relative;
		display: inline-block;
		color: #909399;
		padding: 5px 40px 5px 20px;
		z-index: 1;
		border-bottom: 1px solid #fff;
		border-left: 1px solid #ccc;
		border-right: none;
	}

	.content /deep/ .el-tabs__item::before {
		/*设置梯形*/
		content: "";
		/*用伪元素来生成一个矩形*/
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		border-right: 1px solid #ccc;
		transform: scaleY(1.3) perspective(0.5em) rotateX(3deg);
		transform-origin: bottom left;
		border-top: 3px solid #2386f2;
		background: #fff;
	}

	.dialog-box {
		/deep/ .el-dialog {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			overflow: auto;
			background: #fff;
			height: calc(100% - 100px);
			margin: 50px auto !important;
		}

		/deep/ .el-dialog__header {
			padding: 10px 20px 10px 20px;
			background: #0b7ef7;
		}

		/deep/ .el-dialog__headerbtn {
			top: 15px;
		}

		/deep/ .el-dialog__headerbtn .el-dialog__close {
			color: #fff;
		}

		/deep/ .el-dialog__title {
			color: #fff;
		}

		/deep/ .el-dialog__body {
			padding: 20px;
			height: calc(100% - 100px);
			overflow: auto;
		}
	}
</style>
