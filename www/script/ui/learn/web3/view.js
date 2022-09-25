import i0 from '../../../lib/i0.js'
import w3 from '../../../lib/w3.js'
import _ui from './_ui.js'

export default () => {
  const ui = { ..._ui }
        
  const headerWBtns = (text, ...btns) =>
    ui.div
      ( i0.vo`h4`
          .text`${text}`
          .style`m-0`
      , ui.div
          ( ...btns
          )
          .style`btn-group ms-4`
      )
      .style`d-flex align-items-center my-4`

  const view = i0.view(
    { cryptoName: ''
    , tkview: 'wallet'
    },
    [ ui.div
        ( i0.vo`h1`
            .style`text-light text-center`
            .text`Web 3 - Solana`
        , ui.card
            ( headerWBtns( 'Phantom Wallet'
                , ui.btn`connectWallet::primary::Connect Wallet`
                , ui.btn`messageWallet::primary::Message Wallet`
              )
            )
        , i0.vo`br`
        , ui.card
            ( headerWBtns( 'Solana Wallet'
                , ui.btn`newWallet::success::Create Wallet`
                , ui.btn`loadWallet::primary::Load Wallet`
              )
            , headerWBtns( 'Crypto Tokens'
                , ui.btn`tkviewWallet::outline-primary::Wallet`
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
            , i0.vo`div`
                .data`tkview`((vo, tkview) => {
                  vo.el.classList[tkview === 'wallet' ? 'remove' : 'add']('d-none')
                })
                .child
                  ( i0.vo`p`.text`You have no wallet`
                  )
            , i0.vo`div`
                .data`tkview`((vo, tkview) => {
                  vo.el.classList[tkview === 'create' ? 'remove' : 'add']('d-none')
                })
                .child
                  ( i0.vo`form`
                      .style`input-group`
                      .child
                        ( ui.input`cryptoName::Token Name`
                        , ui.btn`createToken::success::Create Token`
                        )
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
