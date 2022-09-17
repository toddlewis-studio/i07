import i0 from '../i0/i0.js'

import bs from './bs.js'

export default () => {
  const ui = {
    ...bs
  }

  ui.header = (...text) =>
    i0.vo`div`
      .style`flex py-5 align-items-center`
      .child
        ( i0.vo`h1`.text`${i0.str(...text)}`
        )

  ui.nav = () => 
    i0.vo`div`
      .child
        ( i0.vo`a`
            .list`nav::@link`
            // .data`@link`((vo, link) => {
            //   vo.el.href = link.hash 
            //   vo.el.innerText = link.text
            // })
        )
        
  const model = 
    { nav: [ {text: 'Documentation', hash: '#documentation'} ]
    }

  const view =
    [ ui.card
        ( ui.header`Hello Todos`
            .child( ui.nav() )
        , 
        )
        .style`rounded-0`
    ]

  const update =
    {
    }

  return i0.view(model, view, update)
}