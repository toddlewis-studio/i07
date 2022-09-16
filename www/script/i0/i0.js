const i0 = {} //guid, view, vo

// utils :: guid, str

i0.guid = (r, v) =>
'i0-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => 
  (r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8))
  .toString(16))

i0.str = (...params) => {
  let str = ''
  params[0].forEach((s, i) => {
    if(i > 0) str += params[i]
    str += s
  })
  return str
}

// main

class Model {
  constructor (data) {
    this.data = Object.assign({}, data)
    console.log('model', this.data)
    this.ref = {}
  }
  register (vo) {
    if(vo?.dataArgs && vo.dataArgs[1]){
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
    if(loc && loc.error && loc.i0error) return loc
    const u = path => Object.values(path).forEach(vo => {
      if(vo instanceof ViewObject) vo.update()
      else u(vo)
    })
    u(loc)
  }
  get (...path) { 
    let o = this.data
    let p = i0.str(...path)
    if(p === undefined || p === '') return o
    try { return eval(`this.data${p ? `.${p}` : ''}`) }
    catch (e) { console.error(e) }
  }
  set (...path) {
    let p = i0.str(...path)
    return value => {
      try { 
       eval(`this.data${p ? `.${p}` : ''} = value`)
       this.update(p)
       return eval(`this.data${p ? `.${p}` : ''}`) 
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

class ViewObjectType {
  constructor( value ) { this.value = value } 
  apply( vo, type ) { vo.type = new type(this.value) }
}
class ViewObjectTypeText extends ViewObjectType {
  constructor(text){ super(text) } 
  apply(vo){
    super.apply(vo, ViewObjectTypeText)
    vo.el.innerText = this.value
  }
}
class ViewObjectTypeHtml extends ViewObjectType {
  constructor(html){super(html)} 
  apply(vo){
    super.apply(vo, ViewObjectTypeHtml)
    vo.el.innerHTML = this.value
  }
}
class ViewObjectTypeData extends ViewObjectType {
  constructor(dataArgs){super(dataArgs)} 
  apply(vo){
    super.apply(vo, ViewObjectTypeData)
    vo.dataArgs = this.value
  }
}

class ViewObject {
  constructor ( tag ){
    this.id = i0.guid()
    this.el = document.createElement( tag )
    this.children = {}
    this.ref = {}
    this.alias = {}
    this.events = []
    this.type
    this.parent
    this.view
    this.dataArgs
  }
  style (...classList) {
    let str = i0.str(...classList)
    this.el.classList.add( ...str.split(' ') )
    return this
  }
  attr (...attrString){ 
    let str = i0.str(...attrString)
    let val = [str.substring(0, str.indexOf('=')), str.substring(str.indexOf('=') + 1)]
    this.el.setAttribute(...val)
    return this
  }
  on (...eventString) {
    console.log('eventstring', eventString)
    this.events.push(eventString)
    let str = i0.str(...eventString)
    let args = str.split('::')
    this.el.addEventListener(args[0], e => {
      if( this.view )
        this.view.broadcast(args[1], e)
      else console.warn( 'i0 warning: event called but view not found.' )
    })
    return this
  }
  text (...innerText) { this.el.innerText = i0.str(...innerText) ; this.type = new ViewObjectTypeText(i0.str(...innerText)) ; return this }
  html (...innerHtml) { this.el.innerHTML = i0.str(...innerHtml) ; this.type = new ViewObjectTypeHtml(i0.str(...innerHtml)) ; return this }
  data (str, ...tokens) {
    this.dataArgs = [str, tokens]
    this.type = new ViewObjectTypeData(this.dataArgs) 
    return this
  }
  clone (view) {
    let vo = new ViewObject(this.el.tagName)
    //view
    if(view) vo.view = view
    //type
    if(this.type) this.type.apply(vo)
    //events
    this.events.forEach(e => vo.on(...e))
    //attributes
    Array.from(this.el.attributes).forEach( attr => vo.el.setAttribute(attr.name, attr.value) )
    //children
    Object.values(this.children).forEach(child => {
      let c = child.clone()
      vo.children[c.id] = c
      vo.el.appendChild(c.el)
      c.parent = vo
      if(child.view) c.view = child.view
    })
    return vo
  }
  update () {
    if(this.listArgs){
      if(this.view?.model){
        console.log('We found a list bois', ...this.listArgs)
        const ar = this.view.model.get`${this.listArgs[0]}`
        console.log('ar', ar)
        
      }
    }
    if(this.dataArgs) {
      let str = this.dataArgs[0]+'', tokens = [...this.dataArgs[1]]
      let val = str + ''
      let model = this.view?.model
      tokens.forEach((t, i) => {
        this.ref[t] = true
        if(model) 
          val = val.replaceAll(`{${i}}`, model.get`${t}`)
      })
      this.el.innerText = val
    }
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
  list (...listString) {
    const list = i0.str(...listString)
    const args = list.split('::')
    this.listArgs = args
    return this
  }
}

// exports :: view, vo, type

i0.view = (model, view, update) => {
  const v = new View(model, view, update)
  return v
}

i0.vo = (...tagName) => {
  const tag = i0.str(...tagName)
  const vo = new ViewObject(tag)
  return vo
}

i0.type = 
  { View
  , ViewObject
  , Model
  , ViewObjectType
  , ViewObjectTypeText
  , ViewObjectTypeHtml
  , ViewObjectTypeData
  }

export default i0