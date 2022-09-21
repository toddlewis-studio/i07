import i0 from '../lib/i0.js'
import todoUI from '../ui/learn/_ui.js'

export default () => {
  const ui = { ...todoUI }
        
  const view = i0.view(
    { nav: [ {text: 'Install', hash: '#install'}
           , {text: 'Learn', hash: '#learn'}
           , {text: 'Playground', hash: '#playground'}
           , {text: 'API', hash: '#api'}
           ]
    , todoText: ''
    , todos: []
    },
    [ ui.card( ui.nav() )
      .style`rounded-0`
    , i0.vo`div`
        .style`container mt-3`
        .child
          ( ui.inputWithBtn( 
              'Remember todo...', 'todoText',
              '+', 'createTodo' 
            )
          , ui.todoList`todos`
          )
    ],
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
      }
    }
  )

  return view
}