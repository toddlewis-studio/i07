import i0 from '../i0/i0.js'

import bs from './bs.js'

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

  ui.nav = () => 
    i0.vo`nav`
      .style`d-flex align-items-center justify-content-between`
      .child
        ( i0.vo`a`
            .style`text-decoration-none text-dark`
            .attr`href=./`
            .child ( i0.vo`h1`.text`i07` )
        , i0.vo`div`
            .child
              ( i0.vo`a`
                  .list`nav::@link`
                  .style`btn btn-link`
                  .data`@link`((vo, link) => {
                    vo.el.href = link.hash 
                    vo.el.innerText = link.text
                  })
              )
        )
        
  const model = 
    { nav: [ {text: 'Install', hash: '#install'}
           , {text: 'Learn', hash: '#learn'}
           , {text: 'Playground', hash: '#playground'}
           ]
    }

  const view =
    [ ui.card
        ( ui.nav()
        , ui.header()
        )
        .style`rounded-0`
    ]

  const update =
    {
    }

  return i0.view(model, view, update)
}