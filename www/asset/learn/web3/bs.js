import i0 from './i0.js'

const ui = {}

// bootstrap util

ui.div = (...vo) =>
  i0.vo`div`
    .child( ...vo )

ui.card = (...vo) =>
  ui.div
    ( ui.div 
        (...vo)
        .style`card-body`
    )
    .style`card bg-dark text-light`

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

export default ui