import i0 from '../../lib/i0.js'
import bs from '../bs.js'

const ui = 
  { ...bs
  }

const titleP = (title, text) => 
  ui.div
    ( i0.vo`p`
        .text`${title}`
        .style`fs-3`
    , i0.vo`p`
        .text`${text}`
        .style`fs-5`
    )
    .style`pt-3 col-lg-4 px-1`

ui.whyi0 = () =>
  i0.vo`div`
    .style`card rounded-0 bg-success text-white`
    .child
      ( i0.vo`div`
          .style`card-body`
          .child
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
      )

export default ui