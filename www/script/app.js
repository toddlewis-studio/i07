import i0 from './i0.js'

const container = (...vo) =>
  i0.vo`div`
    .style`container`
    .child ( ...vo )

const card = (...vo) =>
  i0.vo`div`
    .style`card`
    .child
       ( i0.vo`div`
	         .style`card-body`
	         .child (...vo)
       )

const counter = () =>
  i0.vo`button`
    .style`btn btn-primary`
    .on`click::increment`
    .data('Counter: {0}', 'counter')

let view = i0.view (
  { counter: 0, title: 'Welcome to i07' },
  [ container
      ( card
          ( i0.vo`h1`
	            .data('{0}', 'title')
              , counter ()
          )
      )
  ],
  { increment: model => console.log( model.set`counter`(model.get`counter` + 1) )
  }
)

view = i0.view (
  { todos: []
  , todoVal: ''
  },
  [ container
      ( card
          ( i0.vo`h1`.text`Todos`
          , card
            ( i0.vo`input`
                .attr`placeholder=Enter your todo...`
                .attr`title=Enter your todo...`
                .bind`todoVal`
            , i0.vo`button`
                .text`Create`
                .on`click::createTodo`
            )
          , card
            ( i0.vo`div`
                .list`todos::t`
                .style`card`
                .child
                  ( i0.vo`div`
                      .style`card-body`
                      .data('{0}', 't')
                  )
            )
          )
      )
  ],
  { createTodo: m => {
      m.todos.push({val: m.todoVal})
      m.todoVal = ''
    }
  }
)

view.appendTo( document.body )

