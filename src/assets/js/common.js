/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
export function getDomById(id) {
  return document.getElementById(id)
}

/**
 * tab 切换
 * @param {*} id tab切换外层 dom 的 ID
 * @param {*} callback tab 切换触发的函数，回返回当前点击 tab 按钮的下标
 * @param {*} isLinkContent tab切换是否需要内容联动
 */
export function tabClick(id, callback, isLinkContent, tiggerMethod = 'mouseover mouseout') {
  const $tabItems = $(`${id} .tab-list .tab-item`)
  const $tabContent = $(`${id} .tab-content > div`)
  const isLink = isLinkContent && isLinkContent === true
  $tabItems.on(tiggerMethod, function () {
    const $index = $(this).index()
    $tabItems.removeClass('active')
    $(this).addClass('active')
    if (isLink) {
      $tabContent.hide()
      $tabContent.eq($index).show()
    }
    callback($index)
  })
}

/**
 * 节流
 * @param {*} method 触发的函数
 * @param {*} delay 延迟多少秒执行
 * @param {*} duration 多少秒执行一次
 */
export function throttle(method, delay, duration) {
  let timer = null;
  let begin = new Date()
  return function () {
    const context = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    const current = new Date()
    clearTimeout(timer)
    if (current - begin >= duration) {
      method.apply(context, args);
      begin = current
    } else {
      timer = setTimeout(function () {
        method.apply(context, args)
      }, delay)
    }
  }
}

/**
 * 将图片转化为
 * @param {*} arr 图片数组
 */
export function getTrueImgArr(arr, baseUrl) {
  // eslint-disable-next-line global-require
  // eslint-disable-next-line array-callback-return
  return arr.map(item => require(`@assets/images${baseUrl}/${item}`))
}
