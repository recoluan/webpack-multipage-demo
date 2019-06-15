/* eslint-disable no-nested-ternary */
import { tabClick, throttle } from '@assets/js/common'

function HeaderObj() {
  this.domArr = [
    {
      id: 'home',
      theme: 'remove'
    }
  ]

  this.domTopArr = this.domArr.map(item => ({
    top: $(`#${item.id}`).offset().top,
    bottom: $(`#${item.id}`).offset().top + $(`#${item.id}`).height()
  }))
}

HeaderObj.prototype.scrollFn = function () {
  const scrollTop = $('body').scrollTop();
  const { domTopArr, domArr } = this

  if (scrollTop > 20) {
    $('#header').removeClass('top')
  } else {
    $('#header').addClass('top')
  }

  for (let i = 0; i < domTopArr.length; i += 1) {
    if (scrollTop >= domTopArr[i].top && scrollTop < domTopArr[i].bottom) {
      const trueIndex = i === 10 ? 6 : i === 6 ? 100 : i
      $('#header .tab-list .tab-item').removeClass('active')
      $('#header .tab-list .tab-item').eq(trueIndex).addClass('active')
      if (domArr[i].theme === 'add') $('#header').addClass('theme-black')
      else $('#header').removeClass('theme-black')
      return
    }
  }
}

const headerObj = new HeaderObj()
const { scrollFn } = headerObj


// 头部导航点击
tabClick('#header', (index) => {
  const trueIndex = index !== 6 ? index : 10
  $('body').animate({ scrollTop: `${headerObj.domTopArr[trueIndex].top}` }, 500)
}, false, 'click')

// 监听滚动
$('body').on('scroll', throttle(scrollFn.bind(headerObj), 100, 800))

// 出现弹窗
$('.show-wechat').on('click', function () {
  $('#wechat').show()
})

// 弹窗消失
$('#wechat .btn-close').on('click', function () {
  $('#wechat').hide()
})

// 点击弹窗周围弹窗消失
$('#wechat').on('click', function (e) {
  if (e.target.id === 'wechat') $('#wechat').hide()
})

// 点击logo滚到顶部
$('#header .logo >div').on('click', () => {
  $('body').animate({ scrollTop: 0 }, 500)
})
