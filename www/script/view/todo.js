import i0 from '../i0/i0.js'

import bs from '../ui/bs.js'
import nav from '../ui/nav.js'

export default () => {
  const ui = 
    { ...bs
    , ...nav
    }
        
  const model = 
    { nav: [ {text: 'Install', hash: '#install'}
           , {text: 'Learn', hash: '#learn'}
           , {text: 'Playground', hash: '#playground'}
           , {text: 'API', hash: '#api'}
           ]
    , todoText: ''
    , todos: []
    }

  const todoList = (...arName) =>
    i0.vo`div`
    .style`bg-light rounded p-1 m-1 d-flex justify-content-between align-items-center`
    .list`${i0.str(...arName)}::@todo::@index`
    .child
      ( i0.vo`div`
          .data`@todo`((vo, todo) => {
            vo.el.innerText = todo.text
          })
      , i0.vo`button`
          .style`btn btn-danger`
          .text`X`
          .on`click::deleteTodo`
      )

  const view =
    [ ui.card( ui.nav() )
        .style`rounded-0`
    , i0.vo`div`
        .style`container mt-3`
        .child
          ( ui.inputWithBtn( 
              'Remember todo...', 'todoText',
              '+', 'createTodo' 
            )
          , todoList`todos`
          )
    ]

  const update =
    { createTodo: model => {
        const text = model.get`todoText`
        if(text){
          const todos = model.get`todos`
          todos.push({text})
          model.set`todoText`('')
          model.set`todos`(todos)
        }
      }
    , deleteTodo: (model, vo) => {
        const index = vo.get`@index`
        const ar = model.get`todos`
        ar.splice(index, 1)
        model.set`todos`(ar)
        console.log(ar)
      }
    }

  return i0.view(model, view, update)
}