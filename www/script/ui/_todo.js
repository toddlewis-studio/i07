import i0 from '../i0/i0.js'

import bs from './bs.js'

const ui = {
  ...bs
}

const model = 
  {
  }

const view =
  [ ui.section
      ( i0.vo`h1`.text`Hello Todos`
      )
  ]

const update =
  {
  }

export default () => i0.view(model, view, update)
