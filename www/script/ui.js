import i0 from './i0/i0.js'

import todoView from './ui/_todo.js'
import bs from './ui/bs.js'

const ui = 
  { ...bs
  , _route: {
    '': todoView,
    '#': todoView,
    '#todo': todoView
  }
}

//ui.ul = () => 
  //i0.vo`ul`
    //.child
      //( i0.vo`li`
          //.list`list::@listItem::@listIndex`
          //.data('{@1}. List Item: {0}', '@listItem', '@listIndex')
      //)
//
//ui.userCard = () =>
  //ui.card
    //( i0.vo`${'h1'}`.data('{0}', 'user.username')
    //, ui.ul()
    //, i0.vo`div`.data('Badges: {0}', 'user.inv.badges.length')
    //, ui.btn`addBadge`.text`Add Badge`
    //, i0.vo`div`
        //.list`user.inv.badges::@badge`
        //.child
          //( i0.vo`span`
              //.data('{0}', '@badge.title')
          //)
    //)

export default ui
