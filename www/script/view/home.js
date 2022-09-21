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
    }, 
    
    // View
    [ ui.card
      ( ui.nav()
      , ui.header()
      )
      .style`rounded-0`
    , ui.card
        ( ui.container
            ( ui.div
                ( i0.vo`h2`
                    .style`home-underline d-inline-block`
                    .text`Why i0?`
                )
            , ui.div
                ( ui.titleP('MVU', 'Quickly create apps with the MVU pattern')
                , ui.titleP('ES6', 'Use the latest javascript features to their fullest potential')
                , ui.titleP('Swaggy', 'Have more swag than the average front-end developer by using i07')
                )
              .style`d-lg-flex pb-5`
            )
            .style`p-3`
        )
        .style`rounded-0 bg-success text-white`
    , i0.vo`p`
        .style`text-light`
        .data`hello-world`((vo, obj) => {
          vo.el.innerText = obj.text
        })
    ], 
    
    // Update
    {}
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