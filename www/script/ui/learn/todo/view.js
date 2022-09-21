import i0 from '../../../lib/i0.js'
import todoUI from './_ui.js'

export default () => {
  const ui = { ...todoUI }
        
  const view = i0.view(
    { todoText: ''
    , todos: []
    },
    [ i0.vo`div`
        .style`container mt-3`
        .child
          ( i0.vo`h1`
              .style`text-light text-center`
              .text`Todos`
          , ui.inputWithBtn( 
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