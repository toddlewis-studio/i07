import i0 from '../lib/i0.js'
// import homeUI from '../ui/home/_ui.js'

export default () => {
  // Components
  const ui = {}

  const view = i0.view(
    // Model
    { ar: [[1,2,3], ['a', 'b', 'c']]
    }, 
    
    // View
    [ i0.vo`ul`
        .list`ar::@test`
        .text`@test`
    ], 
    // Update
    {
    }
  )
  
  // Init
  const init = async () => {
    console.log(view)
  }
  init()
  
  // Export
  return view
}
