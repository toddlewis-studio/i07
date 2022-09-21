import i0 from './i0.js'
import w3 from './w3.js'
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
        , ui.card
            ( ui.btn`connectWallet::primary m-1::Connect Wallet`
            , ui.btn`messageWallet::primary m-1::Message Wallet`
            )
        )
        .style`container mt-3`
    ],
    { connectWallet: () => w3.Get.Connect()
    , messageWallet: () => w3.Msg.Send('This is a test message.')
    }
  )

  return view
}