import i0 from '../lib/i0.js'
import homeUI from '../ui/home/_ui.js'

export default () => {
  // Components
  const ui = {...homeUI}

  const view = i0.view(
    // Model
    { nav: [ {text: 'Install', hash: '#install'}
           , {text: 'Learn', hash: '#learn'}
           , {text: 'Playground', hash: '#playground'}
           , {text: 'API', hash: '#api'}
           ]
    , version: '0.0.1'
    , showText: false
    , testAr: [[0,1,2], [0,1,2], [0,1,2]]
    }, 
    
    // View
    [ ui.card
      ( ui.nav()
      , ui.header()
      )
      .style`rounded-0`
    , ui.whyi0()
    , i0.vo`p`
        .style`text-light`
        .data`hello-world`((vo, obj) => {
          vo.el.innerText = obj.text
        })
    , i0.vo`button`
        .text`Toggle Show`
        .on`click::toggleShow`
    , i0.vo`p`
        .style`text-light`
        .data`showText`((vo, b) => {
          vo.el.innerText = `Show Text: ${b}`
        })
        .when`showText`(b=>b)
    , i0.vo`div`
        .list`testAr::@obj`
        .child
          ( i0.vo`div`
              .list`@obj::@child`
              .data`@child`((vo, child) => {
                vo.el.innerText = child
              })
          )
    ], 
    // Update
    { toggleShow: m => m.set`showText`( !m.get`showText` )
    }
  )
  
  // Init
  const init = async () => {
    const res = await i0.http`http://localhost:4200/test`({})
    view.set`hello-world`(res)
  }
  init()
  
  // Export
  return view
}
