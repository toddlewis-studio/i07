import i0 from '../i0/i0.js'

import bs from './bs.js'
import nav from './nav.js'

export default () => {
  const ui = {
    ...bs
  }

  ui.header = (...children) =>
    i0.vo`div`
      .style`py-5 pt-4 container`
      .child
        ( i0.vo`div`
            .style`d-flex justify-content-around py-5 align-items-center`
            .child
              ( i0.vo`div`
                  .style`text-center`
                  .child
                    ( i0.vo`h1`
                        .text`i0 7`
                    , i0.vo`p`
                        .text`The model-view-update js framework.`
                        .style`fs-4`
                    )
                , i0.vo`div`
                    .child
                      ( i0.vo`a`
                          .style`btn btn-primary fs-2`
                          .attr`href=#todo`
                          .text`Get Started`
                      )
              ) 
        )
        
  const model = 
    { nav: [ {text: 'Install', hash: '#install'}
           , {text: 'Learn', hash: '#learn'}
           , {text: 'Playground', hash: '#playground'}
           ]
    , counter: 0
    }

  const view =
    [ ui.card
        ( ui.nav()
        , ui.header()
        , ui.btn`inc`
            .data`counter`((vo, counter) => {
              vo.el.innerText = `Counter: ${counter}`
            })
        )
        .style`rounded-0`
    ]

  const update =
    { inc: m => m.set`counter`(m.get`counter` + 1)
    }

  return i0.view(model, view, update)
}