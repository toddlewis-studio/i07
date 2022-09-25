import i0 from './lib/i0.js'

import homeView from './view/home.js'
import learnView from './view/learn.js'

const app = document.createElement('i0-app')
i0.route( app, {
  '': homeView,
  '#': homeView,
  '#home': homeView,
  '#learn': learnView
})
document.body.appendChild(app)
