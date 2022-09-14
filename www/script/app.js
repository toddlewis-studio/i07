import i0 from './i0.js'

let view = i0.view (
  { counter: 0 },
  [ i0.vo`button`
      .on`click::increment`
      .data('Counter: {0}', 'counter')
  ],
  { increment: model => console.log( model.set`counter`(model.get`counter` + 1) )
  }
)

view.appendTo( document.body )

