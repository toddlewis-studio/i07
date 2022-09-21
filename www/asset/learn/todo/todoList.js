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

ui.inputWithBtn = (...args) => {
  const argsAr = i0.str(...args).split('::')
      // args
      , bind = argsAr[0]
      , msg = argsAr[1]
      , placeholder = argsAr[2]
      , text = argsAr[3]
      // 
  , vo = ui.div
      ( ui.input`${bind}::${placeholder}`
      , ui.div
          ( ui.btn`${msg}::primary::${text}` )
          .style`input-group-append`
      )
      .style`input-group mb-3`
  return vo
}

// todolist

ui.todoList = () =>
  ui.div
    ( i0.vo`div`
      .data`@todo`((vo, todo) => 
        vo.el.innerText = todo.text
      )
    , ui.btn`deleteTodo::danger::X`
    )
    .style`bg-light rounded p-1 m-1 d-flex justify-content-between align-items-center`
    .list`todos::@todo::@index`

export default ui