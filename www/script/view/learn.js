import i0 from '../lib/i0.js'
import todoUI from '../ui/learn/_ui.js'

export default () => {
  const ui = { ...todoUI }
        
  const view = i0.view(
    { nav: [ {text: 'Install', hash: '#install'}
           , {text: 'Learn', hash: '#learn'}
           , {text: 'Playground', hash: '#playground'}
           , {text: 'API', hash: '#api'}
           ]
    , views: 
        [ {fn: ui.todoView, name: 'Todo', code: ['todo/view.js', 'todo/bs.js', 'todo/todoList.js']} 
        , {fn: ui.web3View, name: 'Web 3', code: ['web3/view.js', 'web3/bs.js', 'web3/w3.js']}
        ]
    , code : ['todo/view.js', 'todo/bs.js', 'todo/todoList.js']
    , view: ui.todoView()
    , codeView: false
    , file: undefined
    },
    [ ui.card
        ( ui.nav()
        , ui.div
            ( ui.div
                ( ui.btn`toProjectView::success::Run`
                    .data`codeView`((vo, codeView) => {
                      vo.el.classList[codeView ? 'add' : 'remove']('btn-outline-success')
                      vo.el.classList[codeView ? 'remove' : 'add']('btn-success')
                    })
                , ui.btn`toCodeView::outline-primary::Code`
                    .data`codeView`((vo, codeView) => {
                      vo.el.classList[codeView ? 'remove' : 'add']('btn-outline-primary')
                      vo.el.classList[codeView ? 'add' : 'remove']('btn-primary')
                    })
                )
                .style`btn-group mx-1 bg-light`
            , i0.vo`select`
                .style`form-control`
                .on`change::selectChanged`
                .child
                  ( i0.vo`option`
                      .list`views::@view`
                      .data`@view`((vo, view) => {
                        vo.el.innerText = view.name
                      })
                  )
            )
            .style`d-flex`
        )
        .style`rounded-0`
    , i0.vo`div`
        // .when`codeView`((vo, codeView) => codeView === false)
        .data`view::codeView`((vo, view, codeView) => {
          while(vo.el.lastChild) vo.el.removeChild(vo.el.lastChild)
          vo.el.classList[codeView === true ? 'add' : 'remove']('d-none')
          if(vo.get`codeView` === false) 
            view.appendTo(vo.el)
        })
    , ui.div
        ( ui.card
            ( i0.vo`h4`
                .text`Files`
                .style`text-muted`
            , ui.div
                ( i0.vo`button`
                    .style`btn btn-link col p-0 px-1 m-1 text-start text-light`
                    .on`click::openFile`
                    .data`@fileName::file`((vo, fileName, file) => {
                      console.log('file', fileName, file)
                      vo.el.innerText = fileName
                      vo.el.classList[fileName === file ? 'add' : 'remove']('bg-light', 'bg-opacity-25')
                      vo.el.classList[fileName === file ? 'remove' : 'add']('text-decoration-none')
                    })
                )
                .style`d-flex`
                .list`code::@fileName`
            )
            .style`col-md-4 col-lg-3 bg-dark rounded-0`
        , ui.div
            ( i0.vo`pre`
                .style`learn-code lang-js`
                .child
                    ( i0.vo`code`
                        .style`lang-js`
                        .data`file`(async (vo, file) => {
                          const res = await fetch(`./asset/learn/${file}`)
                          const text = await res.text()
                          vo.el.innerHTML = Prism.highlight(text, Prism.languages.javascript, 'javascript')
                        })
                    )
            )
            .style`col-md-8 col-lg-9 rounded-0 bg-dark`
        )
        .style`d-md-flex`
        .data`codeView`((vo, codeView) => {
          vo.el.classList[codeView === true ? 'remove' : 'add']('d-none', 'd-md-none')
        })
    ],
    { selectChanged: (model, vo) => {
        const view = model.get`views.${vo.el.selectedIndex}`
        if(view) {
          vo.set`view`(view.fn())
          vo.set`code`(view.code)
          vo.set`file`(view.code[0])
        }
      }
    , toCodeView: m => m.set`codeView`(true)
    , toProjectView: m => m.set`codeView`(false)
    , openFile: (m, vo) => vo ? m.set`file`( vo.get`@fileName` ) : m.set`file`( m.get`code.0` )
    }
  )

  view.broadcast('openFile')

  return view
}