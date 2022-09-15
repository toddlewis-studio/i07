const i0 = {} //guid, view, vo

i0.guid = (r, v) =>
'i0-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => 
  (r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8))
  .toString(16))

class Model {
  constructor (data, ref) {
    this.data = Object.assign({}, data)
    this.ref = ref
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
       this.ref(path)
       return eval(`this.data${path ? `.${path}` : ''}`) 
      }
      catch (e) { console.error(e) }
    }
  }
}

class View {
  constructor (model, view, update) {
    this.model = new Model(model, p => this.ref(p))
    this.view = view
    this.update = update
    this.objects = {}
    this.id = i0.guid()

    let u = vo => {
      this.objects[vo.id] = vo
      vo.setView( this )
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
      Object.keys(vo.ref).forEach(ref => {
        if(path.includes(ref)){
          let i = ref.indexOf(path)
	        let res = path[i + ref.length]
          if(res === undefined || res === '.') vo.update()
	      }
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
  return v
}

i0.vo = (t, ...td) => {
  const tag = t[0].concat(...td)
  const vo = new ViewObject(tag)
  return vo
}

export default i0