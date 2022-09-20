import i0 from './i0/i0.js'

import homeView from './view/home.js'
import todoView from './view/todo.js'

const app = document.createElement('i0-app')
i0.route( app, {
  '': homeView,
  '#': homeView,
  '#home': homeView,
  '#todo': todoView
})
document.body.appendChild(app)