import i0 from './i0.js'
import bs from './bs.js'

const ui = { ...bs }

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