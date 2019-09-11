// 放置工具方法
const getYearMonthDay = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  // 导出年月日
  return { year, month, day }
}
const getDate = (year, month, day) => {
  return new Date(year, month, day)
}

// 将方法暴露
export {
  getYearMonthDay,
  getDate
}
