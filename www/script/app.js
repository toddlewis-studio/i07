import i0 from './i0.js'

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
    .on`click::increment`
    .data('Counter: {0}', 'counter')

let view = i0.view (
  { counter: 0 },
  [ card
      ( counter ()
      )
  ],
  { increment: model => console.log( model.set`counter`(model.get`counter` + 1) )
  }
)

view.appendTo( document.body )

