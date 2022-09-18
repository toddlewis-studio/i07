import i0 from '../i0/i0.js'

import bs from './bs.js'

export default () => {
  const ui = {
    ...bs
  }

  ui.nav = () => 
    i0.vo`nav`
      .style`d-flex align-items-center justify-content-between`
      .child
        ( i0.vo`a`
            .style`text-decoration-none text-dark`
            .attr`href=./`
            .child ( i0.vo`h1`.text`i07` )
        , i0.vo`div`
            .child
              ( i0.vo`a`
                  .list`nav::@link`
                  .style`btn btn-link`
                  .data`@link`((vo, link) => {
                    vo.el.href = link.hash 
                    vo.el.innerText = link.text
                  })
              )
        )
        
  const model = 
    { nav: [ {text: 'Install', hash: '#install'}
           , {text: 'Learn', hash: '#learn'}
           , {text: 'Playground', hash: '#playground'}
           ]
    , todoText: ''
    , todos: []
    }

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
          , ui.card
              ( i0.vo`div`
                  .list`todos::@todo::@index`
                  .style`d-flex`
                  .child
                    ( i0.vo`div`
                        .data`@todo`((vo, todo) => {
                          console.log(vo.aliasObj)
                          console.log(todo)
                          vo.el.innerText = todo.text
                        })
                    , i0.vo`button`
                        .style`btn btn-danger`
                        .text`X`
                        .on`click::deleteTodo`
                    )
              )
          )
    ]

  const update =
    { createTodo: model => {
        const todos = model.get`todos`
        todos.push({text: model.todoText})
        model.set`todos`(todos)
        model.set`todoText`('')
      }
    , deleteTodo: (model, vo) => {
        const index = vo.get`@index`
        console.log(index)
      }
    }

  return i0.view(model, view, update)
}