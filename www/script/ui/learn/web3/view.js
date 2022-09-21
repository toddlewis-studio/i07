import i0 from '../../../lib/i0.js'
import _ui from './_ui.js'

export default () => {
  const ui = { ..._ui }
        
  const view = i0.view(
    { 
    },
    [ ui.div
        ( i0.vo`h1`
            .style`text-light text-center`
            .text`Web 3 - Solana`
        )
        .style`container mt-3`
    ],
    {
    }
  )

  return view
}