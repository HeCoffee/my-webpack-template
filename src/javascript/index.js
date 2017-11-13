import _ from 'lodash'
import '../css/index.css'
import '../css/index.less'

if (module.hot) {
 module.hot.accept()
}

function asd() {
  let a = [1, 2, 3, 4, 5, 5, 6, 7, 1]
   _.forEach(a, (i) => {console.log('>>>>123', i)})
}

asd()
