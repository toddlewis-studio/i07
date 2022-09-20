import i0 from '../i0/i0.js'

const ui = {}

ui.div = (...vo) =>
  i0.vo`div`
    .child( ...vo )

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

ui.btn = (...msg) =>
  i0.vo`button`
    .style`btn btn-primary`
    .on`click::${i0.str(...msg)}`

ui.inputWithBtn = (placeholder, bind, text, msg) =>
  i0.vo`div`
    .style`input-group mb-3`
    .child
      ( i0.vo`input`
          .style`form-control`
          .attr`placeholder=${placeholder}`
          .bind`${bind}`
      , i0.vo`div`
          .style`input-group-append`
          .child
            ( i0.vo`button`
                .style`btn btn-primary rounded-0`
                .text`${text}`
                .on`click::${msg}`
            )
      )

export default ui
