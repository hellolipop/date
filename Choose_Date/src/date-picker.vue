<template>
  <div v-click-outside class="datePicker">
    <input class="input" type="text" :value="formatDate">
    <div class="pannel" v-if="isVisible">
      <!-- 面板头部 -->
      <div class="pannel_head">
        <span @click="preveYear">&lt;</span>
        <span @click="preveMonth">&lt;&lt;</span>
        <span>{{time.year}}年</span>
        <span>{{time.month+1}}月</span>
        <span @click="nextMonth">&gt;&gt;</span>
        <span @click="nextYear">&gt;</span>
      </div>
      <!-- 面板主体 -->
      <div class="pannel_main">
        <div class="days">
          <span
               v-for="j in 7"
               :key="'_'+j"
               class="cell"
               >
               {{week[j-1]}}
            </span>
          <div
            v-for="i in 6"
            :key="i"
            class="tab"
            >
            <!-- 判断是否是当年当月isCurrentMonth -->
            <span
               v-for="j in 7"
               :key="j"
               class="cell cell_day"
               @click="chooseDate(visitDays[(i-1)*7+(j-1)])"
               :class="[
               {notCurrentMonth:!isCurrentMonth(visitDays[(i-1)*7+(j-1)])},
               {today:isToday(visitDays[(i-1)*7+(j-1)])},
               {select:isSelect(visitDays[(i-1)*7+(j-1)])}
               ]"
               >
              {{visitDays[(i-1)*7+(j-1)].getDate()}}
            </span>
          </div>
        </div>
      </div>
      <!-- 面板底部 -->
      <div class="pannel_footer">

      </div>
    </div>
  </div>
</template>

<script>
import * as tools from './tools'
export default {
  directives: {
    clickOutside: { // 指令的生命周期
      bind (el, bindings, vnode) {
        let handle = e => {
          // contains可以判断元素是包含某元素
          if (el.contains(e.target)) {
            // 当已经显示的时候不再调用此方法，为此加上一个判断
            if (!vnode.context.isVisible) {
              vnode.context.showTime()
            }
          } else {
            if (vnode.context.isVisible) {
              vnode.context.hideTime()
            }
          }
        }
        el.handle = handle
        // 创建事件监听
        document.addEventListener('click', handle)
      },
      unbind (el) {
        document.removeEventListener('click', el.handle)
      }
    }
  },
  data () {
    let { year, month } = tools.getYearMonthDay(this.value)
    return {
      // 控制时间选项框是否可见，默认为不可见
      isVisible: false,
      week: ['日', '一', '二', '三', '四', '五', '六'],
      time: { year, month },
      message: 'Hello boy!'
    }
  },
  created () {
    console.log(Object.prototype.toString.call('o'))
  },
  // 用于接收父组件传过来的值
  props:
    { value: {
      type: Date,
      // 校验父组件传入的值是否为时间类型
      // 如果父组件没有传值，默认为当前时间
      default: () => new Date() // 注意！默认值必须是一个函数类型 {} []
    }
    },
  computed: {
    // 使用计算属性以年月日的格式显示
    formatDate () {
      // 将经过方法处理的时间结构出来进行格式化
      let { year, month, day } = tools.getYearMonthDay(this.value)
      return `${year}年${month + 1}月${day}日`
    },
    visitDays () {
      // 获取当前是周几
      let { year, month } = tools.getYearMonthDay(tools.getDate(this.time.year, this.time.month, 1))
      // 获取这个月的第一天
      let currentFirstDay = tools.getDate(year, month, 1)
      // 计算出当月第一天是周几
      let week = currentFirstDay.getDay()
      // 当前开始的天数
      let startDay = currentFirstDay - week * 60 * 60 * 1000 * 24
      // 循环42天
      let arr = []
      for (var i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
      }
      return arr
    }

  },
  methods: {

    showTime () { // 获取焦点后显示时间选项
      this.isVisible = true
    },

    hideTime () { // 失去焦点后隐藏时间选项
      this.isVisible = false
    },
    // 判断日期是否是当年当月
    isCurrentMonth (date) {
      let { year, month } = tools.getYearMonthDay(tools.getDate(this.time.year, this.time.month, 1))
      let { year: y, month: m } = tools.getYearMonthDay(date)
      return year === y && m === month
    },
    // 判断日期是否是今天
    isToday (date) {
      let { year, month, day } = tools.getYearMonthDay(this.value)
      let { year: y, month: m, day: d } = tools.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    // 选择日期后输入框进行双向数据绑定
    chooseDate (date) {
      this.$emit('input', date)
      // 将选择的新日期赋值给time
      this.time = tools.getYearMonthDay(date)
      this.hideTime() // 选择好日期后关闭
    },
    // 选择日期后显示高亮
    isSelect (date) {
      let { year, month, day } = tools.getYearMonthDay(this.value)
      let { year: y, month: m, day: d } = tools.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    // 上一年
    preveYear () {
      this.time.year--
    },
    // 下一年
    nextYear () {
      this.time.year++
    },
    preveMonth () {
      if (this.time.month > 0) {
        this.time.month--
      } else {
        this.time.month = 11
        this.time.year--
      }
    },
    nextMonth () {
      if (this.time.month < 11) {
        this.time.month++
      } else {
        this.time.month = 0
        this.time.year++
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .datePicker{
    color: #333;
    .input{
      background-color: #f1f1f1;

    }
    .cell{
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 32px;
            cursor: pointer;
          }
    .pannel{
      padding: 5px;
      position: absolute;
      background-color: #5e9fd0;
      // box-shadow: 2px 2px 2px pink, -2px -2px -2px orangered;
      border: 3px solid #b4b4b4;
      .pannel_head{
        height: 30px;
        display: flex;
        justify-content: space-around;
        span{
          cursor: pointer;
          user-select: none;
        }
      }
      .pannel_main{
        .tab{
          .cell_day:hover,  .select{
              border: orange 1px solid;
              box-sizing: border-box;
              border-radius: 2px;
            }
          .notCurrentMonth{
            color: #fff;
          }
          .today{
            background-color: #e5d349;
            border-radius: 2px;
          }
        }
      }
      .pannel_footer{
        height: 30px;
      }
    }
  }
</style>
