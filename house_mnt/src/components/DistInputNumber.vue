<!--
 * @Author: hongchr
 * @Date: 2019-11-18 10:09:08
 * @Description: 数字输入框,带单位,基于el-input-number修改
-->
<template>
  <div :class="(isActive ? 'isActive ' : '') + (inputNumberDisabled ? 'is-disabled ' : '') + 'dist-input-number'">
    <el-input
      ref="input"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :clearable="clearable"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange">
        <i slot="suffix" v-if="unit" class="append-text">{{unit}}</i>
      <!-- <span slot="suffix" v-if="unit" class="append-text" >{{unit}}</span> -->
    </el-input>
    <!-- <span slot="append" v-if="unit" class="append-text" >{{unit}}</span> -->
  </div>
</template>
<script>
import Focus from 'element-ui/src/mixins/focus';
export default {
  mixins: [Focus('input')],
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props:{
    unit:{ //单位
      type:String,
      default:""
    },
    placeholder:{ //提示文字
      type:String,
      default:""
    },
    max:{ //最大值
      type:Number,
      default:Infinity
    },
    min:{ //最小值
      type:Number,
      default:-Infinity
    },
    value: {},
    precision:false,
    // precision: { //精度
    //   type: Number,
    //   default: 0,
    //   validator(val) {
    //     return val >= 0 && val === parseInt(val, 10);
    //   }
    // },
    size:String,
    disabled:Boolean, //是否禁用
    controls:{
      type:Boolean,
      default:false
    },
    clearable:{ //能否清除
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      val:"",
      isActive:false,
      currentValue: "",
      userInput: null,
    }
  },
  computed: {
    minDisabled() {
      return this._decrease(this.value, this.step) < this.min;
    },
    maxDisabled() {
      return this._increase(this.value, this.step) > this.max;
    },
    numPrecision() {
      const { value, step, getPrecision, precision } = this;
      const stepPrecision = getPrecision(step);
      if (precision !== undefined) {
        if (stepPrecision > precision) {
          console.warn('[Element Warn][InputNumber]precision should not be less than the decimal places of step');
        }
        return precision;
      } else {
        return Math.max(getPrecision(value), stepPrecision);
      }
    },
    controlsAtRight() {
      return this.controls && this.controlsPosition === 'right';
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    inputNumberSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputNumberDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    displayValue() {
      if (this.userInput !== null) {
        return this.userInput;
      }
      const currentValue = this.currentValue;
      if (typeof currentValue === 'number' && this.precision !== undefined) {
        return currentValue.toFixed(this.precision);
      } else {
        return currentValue;
      }
    }
  },
  methods: {
    toPrecision(num, precision) {
      if (precision === undefined) precision = this.numPrecision;
      return parseFloat(Number(num).toFixed(precision));
    },
    focus(event) {
      event.currentTarget.select();//得到焦点选中
      this.isActive = true;
    },
    blur(){
      this.isActive = false;
    },
    getPrecision(value) {
      if (value === undefined) return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf('.');
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    },
    _increase(val, step) {
      if (typeof val !== 'number' && val !== undefined) return this.currentValue;

      const precisionFactor = Math.pow(10, this.numPrecision);
      // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
      return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
    },
    _decrease(val, step) {
      if (typeof val !== 'number' && val !== undefined) return this.currentValue;
      const precisionFactor = Math.pow(10, this.numPrecision);
      return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
    },
    handleBlur(event) {
      this.isActive = false;
      this.$emit('blur', event);
    },
    handleFocus(event) {
      this.isActive = true;
      event.currentTarget.select();//得到焦点选中
      this.$emit('focus', event);
    },
    setCurrentValue(newVal) {
      const oldVal = this.currentValue;
      if (typeof newVal === 'number' && this.precision !== undefined) {
        newVal = this.toPrecision(newVal, this.precision);
      }
      if (newVal >= this.max) newVal = this.max;
      if (newVal <= this.min) newVal = this.min;
      if (oldVal === newVal) return;
      this.userInput = null;
      newVal = newVal === undefined ? "" : newVal;
      this.$emit('input', newVal);
      this.$emit('change', newVal, oldVal);
      this.currentValue = newVal;
    },
    handleInput(value) {
      this.userInput = value;
    },
    handleInputChange(value) {
      const newVal = value === '' ? undefined : Number(value);
      if (!isNaN(newVal) || value === '') {
        this.setCurrentValue(newVal);
      }
      this.userInput = null;
    },
    select() {
      this.$refs.input.select();
    }
  },
  mounted() {
    let innerInput = this.$refs.input.$refs.input;
    innerInput.setAttribute('role', 'spinbutton');
    innerInput.setAttribute('aria-valuemax', this.max);
    innerInput.setAttribute('aria-valuemin', this.min);
    innerInput.setAttribute('aria-valuenow', this.currentValue);
    innerInput.setAttribute('aria-disabled', this.inputNumberDisabled);
  },
  updated() {
    if (!this.$refs || !this.$refs.input) return;
    const innerInput = this.$refs.input.$refs.input;
    innerInput.setAttribute('aria-valuenow', this.currentValue);
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        const reg = /^(([^0][0-9]*|0)(\.([0-9]+))?)$/;
        let newVal = reg.test(value) ? Number(value) : "";
        if (newVal !== undefined) {
          if (isNaN(newVal) || newVal === "") {
            this.currentValue = "";
            return;
          }
          if (this.precision !== undefined) {
            newVal = this.toPrecision(newVal, this.precision);
          }
        }
        if (newVal >= this.max) newVal = this.max;
        if (newVal <= this.min) newVal = this.min;
        this.currentValue = newVal;
        this.userInput = null;
        this.$emit('input', newVal);
      }
    }
  },
}
</script>
<style lang='scss' scoped>
.dist-input-number{
  position: relative;
  // height: 27px;
  // border-radius: 5px;
  border: 1px solid #b3b3b3;
  background: #fff;
  /deep/ .el-input{
    border: none;
    // height: 27px;
    .el-input__inner{
      // height: 22px;
      text-align: left;
      border: none;
    }
  }
  span{
    position: absolute;
    right: 12px;
    top: 0;
    margin-top: 5px;
    display: inline-block;
    // height: 28px;
    line-height: 26px;
    color: #333;
  }
  /deep/ .el-input-group__append{
    padding-right: 0px;
    background: #fff;
    border: 0;
  }
}
.isActive{
  border-color: #409EFF;
  outline: 0;
}
.is-disabled{
  background-color: #f5f7fa;
  color: #C0C4CC;
  cursor: not-allowed;
}
 /deep/ .el-input__suffix{
  right:10px ;
}
.append-text{
  line-height: 40px;
  color: #333
}
</style>