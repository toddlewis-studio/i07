import i0 from './i0.js'

const ui = {}

ui.container = (...vo) =>
  i0.vo`div`
    .style`container`
    .child ( ...vo )

ui.card = (...vo) =>
  i0.vo`div`
    .style`card`
    .child
       ( i0.vo`div`
	         .style`card-body`
	         .child (...vo)
       )

ui.counter = () =>
  i0.vo`button`
    .style`btn btn-primary`
    .on`click::increment`
    .data('Counter: {0}', 'counter')

ui.counterCard = () =>
  ui.card
    ( i0.vo`h1`.data('{0}', 'user.username')
    , ui.counter ()
    )

ui.btn = (...str) =>
  i0.vo`button`
    .style`btn btn-primary`
    .on`click::${i0.str(...str)}`

ui.userCard = () =>
  ui.card
    ( i0.vo`h1`.data('{0}', 'user.username')
    , i0.vo`div`.data('Age: {0}', 'user.age')
    , i0.vo`div`.data('Test: {0}', 'user.inv.test')
    , i0.vo`div`.data('Badges: {0}', 'user.inv.badges.length')
    , ui.btn`addBadge`
        .text`Add Badge`
    )

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
    model.set`user.inv.badges`(badges)
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
//   '': view,
//   '#': view,
//   '#Home': view,
//   '#User': view 
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