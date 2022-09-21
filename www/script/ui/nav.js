import i0 from '../lib/i0.js'

const ui = {}

ui.nav = () => 
  i0.vo`nav`
    .style`d-md-flex align-items-center justify-content-between`
    .child
      ( i0.vo`a`
          .style`text-decoration-none text-dark tls fs-1 text-center d-block`
          .attr`href=#`
          .text`i07`
      , i0.vo`div`
          .style`d-flex justify-content-center flex-wrap`
          .child
            ( i0.vo`a`
                .list`nav::@link`
                .style`btn btn-link text-dark px-4`
                .data`@link`((vo, link) => {
                  vo.el.href = link.hash 
                  vo.el.innerText = link.text
                })
            )
      )

export default ui