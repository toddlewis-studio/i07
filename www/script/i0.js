const i0 = {} //guid, view, vo

i0.guid = (r, v) =>
'i0-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => 
  (r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8))
  .toString(16))

class Model {
  constructor (data) {
    this.data = Object.assign({}, data)
  }
  get (p,...pd) {
    let o = this.data
    if(p === undefined) return o
    let path = p[0].concat(...pd)
    try { return eval(`this.data${path ? `.${path}` : ''}`) }
    catch (e) { console.error(e) }
  }
  set (p,...pd) {
    let path = p[0].concat(...pd)
    return value => {
      try { eval(`this.data${path ? `.${path}` : ''} = value`); return eval(`this.data${path ? `.${path}` : ''}`) }
      catch (e) { console.error(e) }
    }
  }
}

let m = new Model({counter: 1, account: {age: 22}})
console.log( m.get`counter` )
m.set`counter`(69)
console.log( m.get`counter` )
console.log( m.get`account.age` )
console.log( m.get() )

class View {
  constructor (model, view, update) {
    this.model = new Model(model)
    this.view = view
    this.update = update
    this.objects = {}
    this.id = i0.guid()

    this.view.forEach( vo => {
      this.objects[vo.id] = vo
      vo.setView( this ) 
      console.log( vo.ref )
    })
    let u = vo => {
      vo.update()
      Object.values(vo.children).forEach(vo => u(vo))
    }
    this.view.forEach( vo => u(vo) )
  }
  length () { return Object.keys( this.children ).length }
  broadcast (msg, ...args) { return this.update[msg]( this.model, ...args ) }
  appendTo (el) { this.view.forEach(vo => el.appendChild(vo.el)) }
  ref (path) {
    Object.values(this.objects).forEach(vo => {
      Object.values(vo.ref).forEach(ref => {
        
      })
    }) 
  }
}

class ViewObject {
  constructor ( tag ){
    this.id = i0.guid()
    this.el = document.createElement( tag )
    this.children = {}
    this.ref = {}
    this.parent
    this.view
    this.dataArgs
  }
  style (d,...dd) {
    let str = d[0].concat( ...dd )
    this.el.classList.add( str.split(' ') )
    return this
  }
  on (d,...dd) {
    let str = d[0].concat( ...dd )
    let args = str.split('::')
    addEventListener(args[0], () => {
      if( this.view )
        this.view.broadcast(args[1])
      else console.error( 'view not found' )
    })
    return this
  }
  text (val) { this.el.innerText = val ; return this }
  html (html) { this.el.innerHTML = html ; return this }
  data (str, ...tokens) {
    this.dataArgs = [str, tokens]
    return this
  }
  update () {
    console.log('update called')
    if(!this.dataArgs) return this
    let str = this.dataArgs[0]+'', tokens = [...this.dataArgs[1]]
    let val = str + ''
    let model = this.view?.model
    console.log(this.dataArgs, model)
    tokens.forEach((t, i) => {
      this.ref[t] = true
      if(model) 
      	val = val.replaceAll(`{${i}}`, model.get`${t}`)
    })
    this.el.innerText = val
    return this
  }
  setView (view) {
    this.view = view
    Object.values(this.children).forEach( child => child.setView( view ) )
  }
  child (...voAr) { 
    voAr.forEach( vo => {
      this.children[vo.id] = vo
      this.el.appendChild( vo.el )
      vo.parent = this
      if( this.view ) vo.view = this.view
    })
    return this
  }
}

i0.view = (model, view, update) => {
  const v = new View(model, view, update)
  console.log('view', v)
  return v
}

i0.vo = (t, ...td) => {
  const tag = t[0].concat(...td)
  const vo = new ViewObject(tag)
  console.log('vo', vo)
  return vo
}

export default i0
