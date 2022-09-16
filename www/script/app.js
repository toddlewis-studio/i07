import i0 from './i0/i0.js'
import ui from './ui.js'

i0.view (
  { counter: 0
  , title: 'Welcome to i07' 
  , user: { username: 'test', age: 10, inv: {badges: [], test: 'asdf'} } 
  },
  [ ui.container ( ui.userCard () ) ],
  { increment: model => console.log( model.set`counter`( model.get`counter` + 1 ) ) 
  , addBadge: model => {
    const badges = model.get`user.inv.badges`
    badges.push({title: 'new badge'})
    console.log(badges)
    model.set`user.inv.badges`( badges )
  }
  }
).appendTo(document.body)

let div = i0.vo`div`
            .attr`title=title attr`
            .child
              ( i0.vo`span`.text`Works!`.on`click::test`
              )
let clone = div.clone``

console.log('clone', clone)

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

// view = i0.view (
//   { todos: []
//   , todoVal: ''
//   },
//   [ container
//       ( card
//           ( i0.vo`h1`.text`Todos`
//           , card
//             ( i0.vo`input`
//                 .attr`placeholder=Enter your todo...`
//                 .attr`title=Enter your todo...`
//                 .bind`todoVal`
//             , i0.vo`button`
//                 .text`Create`
//                 .on`click::createTodo`
//             )
//           , card
//             ( i0.vo`div`
//                 .list`todos::t`
//                 .style`card`
//                 .child
//                   ( i0.vo`div`
//                       .style`card-body`
//                       .data('{0}', 't')
//                   )
//             )
//           )
//       )
//   ],
//   { createTodo: m => {
//       m.todos.push({val: m.todoVal})
//       m.todoVal = ''
//     }
//   }
// )

// view.appendTo( document.body )
