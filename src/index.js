import home from './home'
import './css/style.css'

import _ from 'lodash-es'

const res = _.join(['li', 'wang'])
console.log(res)

home()

Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, 2000)
})
