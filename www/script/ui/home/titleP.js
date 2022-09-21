import i0 from '../../lib/i0.js'
import bs from '../bs.js'

const ui = 
  { ...bs
  }

ui.titleP = (title, text) => 
  ui.div
    ( i0.vo`p`
        .text`${title}`
        .style`fs-3`
    , i0.vo`p`
        .text`${text}`
        .style`fs-5`
    )
    .style`pt-3 col-lg-4 px-1`

export default ui