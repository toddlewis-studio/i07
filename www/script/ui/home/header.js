import i0 from '../../i0/i0.js'
import bs from '../bs.js'

const ui = 
  { ...bs
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

export default ui