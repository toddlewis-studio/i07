import i0 from './i0.js'

const ui = {}

// bootstrap util

ui.div = (...vo) =>
  i0.vo`div`
    .child( ...vo )

ui.btn = (...args) => {
  const argsAr = i0.str(...args).split('::')
      // args
      , msg = argsAr[0]    
      , color = argsAr[1]
      , text = argsAr[2]
      // 
      , vo = i0.vo`button`
  if(msg) vo.on`click::${msg}`
  if(color) vo.style`btn btn-${color}`
  if(text) vo.text`${text}`
  return vo
}

ui.input = (...args) => {
  const argsAr = i0.str(...args).split('::')
      // args
      , bind = argsAr[0]
      , placeholder = argsAr[1]
      // 
      , vo = i0.vo`input`.style`form-control`
  if(bind) vo.bind`${bind}`
  if(placeholder) vo.attr`placeholder=${placeholder}`
  return vo
}

ui.inputWithBtn = (...bindMsgPlaceholderText) => {
  const argsAr = i0.str(...bindMsgPlaceholderText).split('::')
      , bind = argsAr[0]
      , msg = argsAr[1]
      , placeholder = argsAr[2]
      , text = argsAr[3]
  
  return i0.vo`form`
    .style`input-group mb-3`
    .on`submit::${msg}`
    .child
      ( ui.input`${bind}::${placeholder}`
      , ui.btn`${msg}::primary::${text}`
      )
}

export default ui