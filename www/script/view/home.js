import i0 from '../i0/i0.js'

import bs from '../ui/bs.js'
import nav from '../ui/nav.js'

export default () => {
  const ui = 
    { ...bs
    , ...nav
    }

  const model = 
    { nav: [ {text: 'Install', hash: '#install'}
           , {text: 'Learn', hash: '#learn'}
           , {text: 'Playground', hash: '#playground'}
           , {text: 'API', hash: '#api'}
           ]
    , version: '0.0.1'
    }

  ui.header = (...children) =>
    i0.vo`div`
      .style`py-5 pt-4 container`
      .child
        ( i0.vo`div`
            .style`d-lg-flex pt-3 pb-5 align-items-center`
            .child
              ( i0.vo`div`
                  .style`col-lg-8 text-center`
                  .child
                    ( i0.vo`h1`
                        .style`tls home-title`
                        .text`i07`
                    , i0.vo`p`
                        .text`The model-view-update js framework.`
                        .style`fs-4`
                    )
                , i0.vo`div`
                    .style`col-lg-4 d-flex flex-column text-center`
                    .child
                      ( i0.vo`a`
                          .style`btn btn-warning fs-2`
                          .attr`href=#todo`
                          .text`Get Started`
                      , i0.vo`div`
                          .style`text-center pt-3`
                          .data`version`((vo, v)=>vo.el.innerText = `Version: ${v}`)
                      )
              ) 
        )

  const titleP = (title, text) => 
    ui.div
      ( i0.vo`p`
          .text`${title}`
          .style`fs-3`
      , i0.vo`p`
          .text`${text}`
          .style`fs-5`
      )
      .style`pt-3 col-lg-4`

  const view =
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
                ( titleP('MVU', 'Quickly create apps with the MVU pattern')
                , titleP('ES6', 'Use the latest javascript features to their fullest potential')
                , titleP('Swaggy', 'Have more swag than the average front-end developer by using i07')
                )
              .style`d-lg-flex pb-5`
            )
            .style`p-3`
        )
        .style`rounded-0 bg-success text-white`
    ]

  const update = {}

  return i0.view(model, view, update)
}