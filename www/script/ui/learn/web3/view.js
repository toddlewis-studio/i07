import i0 from '../../../lib/i0.js'
import w3 from '../../../lib/w3.js'
import _ui from './_ui.js'

export default () => {
  const ui = { ..._ui }
        
  const view = i0.view(
    { cryptoName: ''
    , tkview: 'wallet'
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
            , ui.div
                ( i0.vo`h4`
                    .text`Crypto`
                , ui.div
                    ( ui.div
                      ( ui.btn`tkviewWallet::outline-primary::Wallet`
                          .data`tkview`((vo, tkview) => {
                            vo.el.classList[tkview === 'wallet' ? 'remove' : 'add']('btn-outline-primary')
                            vo.el.classList[tkview === 'wallet' ? 'add' : 'remove']('btn-primary')
                          })
                      , ui.btn`tkviewCreate::outline-success::Create`
                          .data`tkview`((vo, tkview) => {
                            vo.el.classList[tkview === 'create' ? 'remove' : 'add']('btn-outline-success')
                            vo.el.classList[tkview === 'create' ? 'add' : 'remove']('btn-success')
                          })
                      )
                      .style`btn-group`
                    )
                    .style`ms-4`
                )
                .style`d-flex align-items-center`
            , i0.vo`form`
                .style`input-group`
                .data`tkview`((vo, tkview) => {
                  vo.el.classList[tkview === 'create' ? 'remove' : 'add']('d-none')
                })
                .child
                  ( ui.input`cryptoName::Token Name`
                  , ui.btn`createToken::success::Create Token`
                  )
            )
        )
        .style`container mt-3`
    ],
    { connectWallet: () => w3.Get.Connect()
    , messageWallet: () => w3.Msg.Send('This is a test message.')
    , tkviewWallet: m => m.set`tkview`('wallet')
    , tkviewCreate: m => m.set`tkview`('create')
    , createToken: () => {
        
      }
    }
  )

  return view
}
