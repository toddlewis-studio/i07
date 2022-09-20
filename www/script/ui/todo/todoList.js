import i0 from '../../i0/i0.js'

const ui = {}

ui.todoList = (...arName) =>
  i0.vo`div`
  .style`bg-light rounded p-1 m-1 d-flex justify-content-between align-items-center`
  .list`${i0.str(...arName)}::@todo::@index`
  .child
    ( i0.vo`div`
        .data`@todo`((vo, todo) => {
          vo.el.innerText = todo.text
        })
    , i0.vo`button`
        .style`btn btn-danger`
        .text`X`
        .on`click::deleteTodo`
    )

export default ui