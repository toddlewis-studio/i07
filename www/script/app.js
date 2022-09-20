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

// const getUser = async (uid) => {
//   const user = await i0.post`./api/user`({uid})
//   if(!user || user.error) return console.error('user error', user)
//   const news = await i0.get`./api/news`
//   if(!news || news.error) return console.error('news error', news)
// }

// i0.router({
//   '': () => view,
//   '#': () => view,
//   '#Home': () => view,
//   '#User': () => view 
// })