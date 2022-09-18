import i0 from './i0/i0.js'
import ui from './ui.js'

let view, app = i0.vo`div`.attr`id=app`
document.body.appendChild(app.el)
const onRoute = () => {
  view = ui._route[location.hash]
  if( view ) {
    view = view()
    document.body.removeChild( app.el )
    app = i0.vo`div`.attr`id=app`
    view.appendTo( app.el )
    document.body.appendChild( app.el )
  }
}
addEventListener('hashchange', () => onRoute())
onRoute()

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
