import i0 from '../../../lib/i0.js'
import w3 from '../../../lib/w3.js'
import _ui from './_ui.js'

export default () => {
  const ui = { ..._ui }
        
  const view = i0.view(
    { cryptoName
    },
    [ ui.div
        ( i0.vo`h1`
            .style`text-light text-center`
            .text`Web 3 - Solana`
        , ui.card
            ( i0.vo`h4`
                .text`Phantom Wallet`
            , ui.btn`connectWallet::primary m-1::Connect Wallet`
            , ui.btn`messageWallet::primary m-1::Message Wallet`
            )
        , i0.vo`br`
        , ui.card
            ( i0.vo`h4`.text`Wallet`
            , ui.btn`newWallet::success m-1::Create Wallet`
            , ui.btn`loadWallet::primary m-1::Load Wallet`
            , i0.vo`h4`.text`Crypto`
            , i0.vo`form`
                .child
                  ( ui.input`cryptoName::Token Name`
                  , ui.btn`createToken::success m-1::Create Token`
                  )
            , i0.vo`form`
                .child
                  ( 
                  )
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
