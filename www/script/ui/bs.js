import i0 from '../lib/i0.js'

const ui = {}

ui.div = (...vo) =>
  i0.vo`div`
    .child( ...vo )

ui.container = (...vo) =>
  ui.div(...vo)
    .style`container`

ui.card = (...vo) =>
  ui.div
    ( ui.div 
        (...vo)
        .style`card-body`
    )
    .style`card`

ui.btn = (...args) => {
  const argsAr = i0.str(...args).split('::')
      , msg = argsAr[0]    
      , color = argsAr[1]
      , text = argsAr[2]
      , vo = i0.vo`button`
  if(msg) vo.on`click::${msg}`
  if(color) vo.style`btn btn-${color}`
  if(text) vo.text`${text}`
  return vo
}

ui.input = (...args) => {
  const argsAr = i0.str(...args).split('::')
      , bind = argsAr[0]
      , placeholder = argsAr[1]
      , vo = i0.vo`input`.style`form-control`
  if(bind) vo.bind`${bind}`
  if(placeholder) vo.attr`placeholder=${placeholder}`
  return vo
}

ui.inputWithBtn = (placeholder, bind, text, msg) =>
  ui.div
    ( ui.input`${bind}::${placeholder}`
    , ui.div
        ( ui.btn`${msg}::primary rounded-0::${text}` )
        .style`input-group-append`
    )
    .style`input-group mb-3`
  
export default ui