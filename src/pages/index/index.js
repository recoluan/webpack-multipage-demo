import './js/index'
import './test.ts'
import './css/index.scss'

$(window).on('load', function () {
  $('#loading').animate({ opacity: '0' }, 300)
  setTimeout(function () {
    $('#loading').hide()
  }, 500)
})
