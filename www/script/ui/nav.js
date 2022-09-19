import i0 from '../i0/i0.js'

const ui = {}

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
                .list`nav::@link::@index`
                .style`btn btn-link`
                .data`@link::@index`((vo, link, index) => {
                  vo.el.href = link.hash 
                  vo.el.innerText = link.text
                })
            )
      )

export default ui