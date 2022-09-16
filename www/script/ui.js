import i0 from './i0/i0.js'
const ui = {}

ui.container = (...vo) =>
  i0.vo`div`
    .style`container`
    .child ( ...vo )

ui.card = (...vo) =>
  i0.vo`div`
    .style`card`
    .child
       ( i0.vo`div`
           .style`card-body`
           .child (...vo)
       )

ui.counter = () =>
  i0.vo`button`
    .style`btn btn-primary`
    .on`click::increment`
    .data('Counter: {0}', 'counter')

ui.counterCard = () =>
  ui.card
    ( i0.vo`h1`.data('{0}', 'user.username')
    , ui.counter ()
    )

ui.btn = (...msg) =>
  i0.vo`button`
    .style`btn btn-primary`
    .on`click::${i0.str(...msg)}`

ui.userCard = () =>
  ui.card
    ( i0.vo`${'h1'}`.data('{0}', 'user.username')
    , i0.vo`div`.data('Age: {0}', 'user.age')
    , i0.vo`div`.data('Test: {0}', 'user.inv.test')
    , i0.vo`div`.data('Badges: {0}', 'user.inv.badges.length')
    , ui.btn`addBadge`.text`Add Badge`
    , i0.vo`div`
        .list`user.inv.badges::@badge`
        .child
          ( i0.vo`span`
              .style`badge`
              // .data('{0}', '@badge.title')
          )
    )

export default ui