<template>
    <div>
        <!-- 过滤器  time 可以使后台得到的数据，循环出来的也行 -->
        <div>{{time | formatDate}}</div>
        <!-- 输出结果 -->
        <!-- <div>2016-07-23 21:52</div> -->
        <el-select v-model="yes">
            <el-option v-for="(item, index) in test" :key="index" :label="item | formatDate" :value="item"></el-option>
        </el-select>
    </div>
</template>

<script>
import {formatDate} from './js/date'
export default {
    data(){
        return{
            time:new Date(),
            test:[new Date(),new Date()],
            yes:'',
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    }
}
</script>
