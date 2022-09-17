import i0 from '../i0/i0.js'

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

ui.section = (...vo) =>
  ui.card(...vo)
    .style`rounded-0`

ui.btn = (...msg) =>
  i0.vo`button`
    .style`btn btn-primary`
    .on`click::${i0.str(...msg)}`

export default ui
