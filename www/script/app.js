import i0 from './i0/i0.js'
import ui from './ui.js'

i0.view (
  { counter: 0
  , title: 'Welcome to i07' 
  , user: { username: 'test', inv: {badges: [], test: 'asdf'} }
  , list: ['a', 'b', 'c'] 
  },
  [ ui.container ( ui.userCard () ) ],
  { increment: model => console.log( model.set`counter`( model.get`counter` + 1 ) ) 
  , addBadge: model => {
      const badges = model.get`user.inv.badges`
      const r = Math.floor(Math.random() * 1000)
      badges.push({title: 'Badge #' + r})
      model.set`user.inv.badges`( badges )
    }
  }
).appendTo(document.body)

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