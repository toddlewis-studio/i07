const i0 = {} //guid, view, vo

i0.guid = (r, v) =>
'i0-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => 
  (r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8))
  .toString(16))

i0.str = (...params) => params.pop().concat(...params)

class Model {
  constructor (data) {
    this.data = Object.assign({}, data)
    this.ref = {}
  }
  register (vo) {
    if(vo?.dataArgs && vo.dataArgs[1]){
      console.log('register', vo)
      vo.dataArgs[1].forEach(str => {
        const pathAr = str.split('.')
        let loc = ''
        pathAr.forEach(path => {
          loc += `['${path}']`
          eval(`if(!this.ref${loc}) this.ref${loc} = {}`)
        })
        eval(`this.ref${loc}[vo.id] = vo`)
      })
    }
  }
  unregister (vo) {  
    if(vo?.dataArgs?.tokens)
      vo.dataArgs.tokens.forEach(str => {
        const pathAr = str.split('.')
        let path = ''
        pathAr.forEach(p => path += `[${p}]`)
        eval(`delete this.ref${path}`)
        while(pathAr.length){
          pathAr.pop()
          path = ''
          pathAr.forEach(p => path += `[${p}]`)
          eval(`
            if(Object.keys(this.ref${path}).length === 0)
              delete this.ref${path}
            else
              pathAr = []
          `)
        }
      })
  }
  update (path) {
    const pathAr = path.split('.')
    let loc = this.ref
    pathAr.find(p => {
      if(loc[p]) loc = loc[p]
      else return loc = {error: 'path not found', pathAr, p, loc, i0error: true}
    })
    if(loc && loc.error && loc.i0error) return console.warn(loc)
    const u = path => Object.values(path).forEach(vo => {
      if(vo instanceof ViewObject) vo.update()
      else u(vo)
    })
    u(loc)
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
      try { 
       eval(`this.data${path ? `.${path}` : ''} = value`)
       this.update(path)
       return eval(`this.data${path ? `.${path}` : ''}`) 
      }
      catch (e) { console.error(e) }
    }
  }
}

class View {
  constructor (model, view, update) {
    this.model = new Model(model)
    this.view = view
    this.update = update
    this.objects = {}
    this.id = i0.guid()

    let u = vo => {
      this.objects[vo.id] = vo
      vo.setView( this )
      this.model.register(vo)
      vo.update()
      Object.values(vo.children).forEach(vo => u(vo))
    }
    this.view.forEach( vo => u(vo) )
  }
  length () { return Object.keys( this.children ).length }
  broadcast (msg, ...args) { return this.update[msg]( this.model, ...args ) }
  appendTo (el) { this.view.forEach(vo => el.appendChild(vo.el)) }
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
    this.el.classList.add( ...str.split(' ') )
    return this
  }
  attr (d,...dd){ 
    let str = d[0].concat( ...dd )
    let val = [str.substring(0, str.indexOf('=')), str.substring(str.indexOf('=') + 1)]
    this.el.setAttribute(...val)
    return this
  }
  on (d,...dd) {
    let str = d[0].concat( ...dd )
    let args = str.split('::')
    this.el.addEventListener(args[0], () => {
      if( this.view )
        this.view.broadcast(args[1])
      else console.error( 'view not found' )
    })
    return this
  }
  text (v,...vd) { this.el.innerText = v[0].concat( ...vd ) ; return this }
  html (v,...vd) { this.el.innerHTML = v[0].concat( ...vd ) ; return this }
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
  return v
}

i0.vo = (t, ...td) => {
  const tag = t[0].concat(...td)
  const vo = new ViewObject(tag)
  return vo
}

i0.model = data => new Model(data)

i0.Model = Model
i0.View = View
i0.ViewObject = ViewObject

export default i0