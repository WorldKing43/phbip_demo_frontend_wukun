<template>
 <!-- 房源统计 -->
  <div>
    <div class="bg-fff">
      <div class="title">
        <div class="title-icon"></div>
        <div class="title-font">房源统计</div>
        <div class="title-bottom"></div>
      </div>
      <div class="housing">
        <div class="category"><!--类别-->
          <div class="title-bg">
            <span>状态类别</span>
          </div>
          <div class="table">
            <table>
              <tr v-for="(item,index) in houseStateData" :key="index">
                <td> {{item.name}}</td>
                <td> {{item.value}} 套</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="area"><!--面积-->
          <div class="title-bg">
            <span>面积(平方米)</span>
          </div>
          <div class="table">
            <table>
              <tr v-for="(item,index) in houseAreaData" :key="index">
                <td> {{item.name}}</td>
                <td> {{item.value}} 套</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="housetype"><!--户型-->
          <div class="title-bg">
            <span>户型</span>
          </div>
          <div class="table">
            <table>
              <tr v-for="(item,index) in houseTypeData" :key="index">
                <td> {{item.name}}</td>
                <td> {{item.value}} 套</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="category"><!--户型-->
          <div class="title-bg">
            <span>签约归属权</span>
          </div>
          <div class="table">
            <table>
              <tr v-for="(item,index) in  signTypeData" :key="index">
                <td> {{item.name}}</td>
                <td> {{item.value}} 套</td>
              </tr>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'housesituation',
  props: {
    houseAreaData:Array,
    houseStateData:Array,
    houseTypeData:Array,
    signTypeData:Array
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.bg-fff{
  .title{
    display: flex;
    padding: 10px;
    .title-icon{
      width: 5px;
      height: 18px;
      background: #F5A623;
      margin-right: 10px;
      margin-top: 2px;
    }
    .title-font{
      width: 7rem;
      font-size: 18px;
    }
    .title-bottom{
      width: 100%;
      height: 18px;
      border-bottom: 1px solid #ccc;
    }
  }
  .housing{
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    padding-bottom: 30px;
    font-size: 16px;
    .category{
      width: 18rem;
      height: auto;
      border-radius: 10px;
      box-shadow:0px 0px 20px 8px #EEF4FC;
      .title-bg{
        background: #FEF6E9;
        width: 100%;
        height: 2rem;
        span{
          margin-left: 20px;
          color: #F6B850;
        }
      }
      .table{
        table{
          margin:20px auto;
          border:1px solid #DDE5F9;
          border-collapse:collapse;
          tr{
            border: 1px solid #DDE5F9;
            text-align: center;
          };
          td{
            border: 1px solid #DDE5F9;
            font-size: 14px;
            height: 2rem;
            width: 7rem;
          }
        }
      }
    }
    .area{
      width: 21rem;
      height: auto;
      border-radius: 10px;
      box-shadow:0px 0px 20px 8px #EEF4FC;
      .title-bg{
        background: #EEF9F4;
        width: 100%;
        height: 2rem;
        span{
          margin-left: 20px;
          color: #71D0A5;
        }
      }
      .table{
        table{
          margin:20px auto;
          border:1px solid #DDE5F9;
          border-collapse:collapse;
          tr{
            border: 1px solid #DDE5F9;
            text-align: center;
          };
          td{
            border: 1px solid #DDE5F9;
            font-size: 14px;
            height: 2rem;
            width: 8rem;
          }
        }
      }
    }
    .housetype{
      width: 21rem;
      height: auto;
      border-radius: 10px;
      box-shadow:0px 0px 20px 8px #EEF4FC;
      .title-bg{
        background: #E9F7FC;
        width: 100%;
        height: 2rem;
        span{
          margin-left: 20px;
          color: #5DC7EA;
        }
      }
      .table{
        table{
          margin:20px auto;
          border:1px solid #DDE5F9;
          border-collapse:collapse;
          tr{
            border: 1px solid #DDE5F9;
            text-align: center;
          };
          td{
            border: 1px solid #DDE5F9;
            font-size: 14px;
            height: 2rem;
            width: 8rem;
          }
        }
      }
    }
  }
}
</style>

