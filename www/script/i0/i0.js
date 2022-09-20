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
    this.ref = {}
  }
  register (vo) {
    if(vo?.listArgs){
      const pathAr = vo.listArgs[0].split('.')
      let loc = ''
      pathAr.forEach(path => {
        loc += `['${path}']`
        eval(`if(!this.ref${loc}) this.ref${loc} = {}`)
      })
      eval(`this.ref${loc}[vo.id] = vo`)
    }
    else if(vo?.dataArgs) {
      vo.dataArgs.forEach(obj => obj.args.forEach(str => {
        if(str.substring(0,1) === '@') {
          if(vo.aliasObj[str] && vo.aliasObj[str].literal === undefined)
            str = vo.aliasObj[str].val
          else return null
        }
        const pathAr = str.split('.')
        let loc = ''
        pathAr.forEach(path => {
          loc += `['${path}']`
          eval(`if(!this.ref${loc}) this.ref${loc} = {}`)
        })
        eval(`this.ref${loc}[vo.id] = vo`)
      }))
    }
  }
  unregister (vo) {  
    if(vo?.listArgs){
      const pathAr = vo.listArgs[0].split('.')
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
    }
    else if(vo?.dataArgs)
      vo.dataArgs.forEach(obj => obj.args.forEach(str => {
        if(str.substring(0,1) === '@') return null
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
      }))
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
    if(p.substring(0, 1) === '@') return undefined
    let pathString = ''
    p.split('.').forEach(s => pathString += `['${s}']`)
    try { return eval(`this.data${p ? `${pathString}` : ''}`) }
    catch (e) { console.error(e) }
  }
  set (...path) {
    let p = i0.str(...path)
    return value => {
      if(p.substring(0, 1) === '@') return undefined
      let pathString = ''
      p.split('.').forEach(s => pathString += `['${s}']`)
      try { 
       eval(`this.data${p ? `${pathString}` : ''} = value`)
       this.update(p)
       return eval(`this.data${p ? `${pathString}` : ''}`) 
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
    }
    this.view.forEach( vo => u(vo) )
  }
  length () { return Object.keys( this.children ).length }
  broadcast (msg, ...args) { return this.update[msg]( this.model, ...args ) }
  appendTo (el) { this.view.forEach(vo => el.appendChild(vo.el)) }
  get(...getStr){
    if(!this.model) return undefined
    let str = i0.str(...getStr)
    return this.view.model.get`${str}`
  }
  set(...setStr){
    if(!this.view || !this.model) return undefined
    let str = i0.str(...setStr)
    return this.model.set`${str}`
  }
  destroy(){
    this.view.forEach(vo => vo.instruct(function () {
      this.view = undefined
      this.destroy()
    }))
    Object.keys(this).forEach(key => delete this[key])
  }
}

class ViewObjectType {
  constructor( value ) { this.value = value } 
  apply( vo, type ) { vo.type = new type(this.value) }
}
class ViewObjectTypeText extends ViewObjectType {
  constructor(text){ super(text + '') } 
  apply(vo){
    super.apply(vo, ViewObjectTypeText)
    vo.el.innerText = this.value
  }
}
class ViewObjectTypeHtml extends ViewObjectType {
  constructor(html){super(html + '')} 
  apply(vo){
    super.apply(vo, ViewObjectTypeHtml)
    vo.el.innerHTML = this.value
  }
}
class ViewObjectTypeData extends ViewObjectType {
  constructor(dataArgs){
    super( [...dataArgs] ) 
  } 
  apply(vo){
    super.apply(vo, ViewObjectTypeData)
    vo.dataArgs = this.value
    vo.dataArgs.forEach(obj => {
      obj.args = [...obj.args]
      obj.fn = obj.fn.bind(vo)
    })
  }
}

class ViewObject {
  constructor ( tag ){
    this.id = i0.guid()
    this.el = document.createElement( tag )
    this.children = {}
    this.ref = {}
    this.events = []
    this.aliasObj = {}
    this.type
    this.parent
    this.view
    this.dataArgs
    this.listArgs
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
    this.events.push(eventString)
    let str = i0.str(...eventString)
    let args = str.split('::')
    let event = args.shift()
    let msg = args.shift()
    this.el.addEventListener(event, e => {
      if( this.view )
        this.view.broadcast(msg, this, e, ...args.map(a => this.get`${a}`))
      else console.warn( 'i0 warning: event called but view not found.' )
    })
    return this
  }
  text (...innerText) { this.el.innerText = i0.str(...innerText) ; this.type = new ViewObjectTypeText(i0.str(...innerText)) ; return this }
  html (...innerHtml) { this.el.innerHTML = i0.str(...innerHtml) ; this.type = new ViewObjectTypeHtml(i0.str(...innerHtml)) ; return this }
  data (...dataPath) {
    let str = i0.str(...dataPath)
    let args = str.split('::')
    if(!this.dataArgs) this.dataArgs = []
    return fn => {
      this.dataArgs.push({args, fn})
      this.type = new ViewObjectTypeData( this.dataArgs )
      return this
    }
  }
  bind (...bindPath) {
    let args = [i0.str(...bindPath)]
    if(!this.dataArgs) this.dataArgs = []
    this.dataArgs.push({ args, fn: (vo, val) => vo.el.value = val })
    this.type = new ViewObjectTypeData( this.dataArgs )
    this.el.addEventListener('change', e => this.set`${args[0]}`(this.el.value))
    return this
  }
  edit (fn) {
    fn(this)
    return this
  }
  clone (view) {
    let vo = new ViewObject(this.el.tagName)
    //view
    if(view) vo.view = view
    //type - text, innerHtml, data
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
    })
    if(view) vo.setView(view)
    return vo
  }
  update () {
    if(this.listArgs){
      if(this.view?.model && this.el.nodeName !== '#comment'){
        const comment = document.createComment('i0')
        const clone = this.clone()
        const rmAr = vo => {
          Object.values(vo.children).forEach(vo => {
            rmAr(vo)
            vo.destroy()
          })
          vo.children = {}
        }
        rmAr(this)
        
        if(this.el.parentNode){
          this.el.parentNode.insertBefore(comment, this.el)
          this.el.parentNode.removeChild(this.el)
          this.el = comment
          this.cloneVO = clone
          this.cloneList = []
        }
        this.ref[this.listArgs[0]] = true
      }
      if(this.el.nodeName === '#comment'){
        const ar = this.view.model.get`${this.listArgs[0]}`
        let edited = false
        ar.forEach((item, i) => {
          if(this.cloneList[i]) this.cloneList[i].update()
          else {
            this.cloneList[i] = this.cloneVO.clone()
            this.cloneList[i].alias(this.listArgs[1], `${this.listArgs[0]}.${i}`)
            if(this.listArgs[2]) this.cloneList[i].alias(this.listArgs[2], `${i}`, i)
            edited = true
          }
        })
        if(ar.length < this.cloneList.length){
            this.cloneList.splice(ar.length).forEach(vo => vo.destroy())
            this.cloneList.forEach(vo => vo.update())
        }
        if(edited){
          this.cloneList.forEach((c, i) => {
            if(!c.el.parentNode){
              this.parent.add(c)
              this.el.parentNode.insertBefore(c.el, this.el)
            }
          })
        }
      }
    }
    else if(this.view?.model && this.dataArgs) {
      this.dataArgs.forEach(obj => {
        let args = obj.args.map( str =>  this.get`${str}` )
        if(args.indexOf(undefined) === -1) obj.fn(this, ...args)
      })
    }
    return this
  }
  aliasString(str){
    let res = str + ''
    Object.keys(this.aliasObj).forEach(token => {
      if(this.aliasObj[token].literal === undefined) res = res.replaceAll(token, this.aliasObj[token].val)
    })
    return res
  }
  alias(token, val, literal){
    this.aliasObj[token] = {val, literal}
    Object.values(this.children).forEach(child => child.alias(token, val, literal))
  }
  get(...getStr){
    if(!this.view || !this.view.model) return undefined
    let str = this.aliasString( i0.str(...getStr) )
    let res = Object.keys(this.aliasObj).find(token => str.indexOf(token) !== -1)
    if(res === undefined) return this.view.model.get`${str}`
    else return this.aliasObj[res].literal
  }
  set(...setStr){
    if(!this.view || !this.view.model) return undefined
    let str = this.aliasString( i0.str(...setStr) )
    return this.view.model.set`${str}`
  }
  add(vo){
    if(this.view) {
      vo.parent = this
      if(this.view) vo.setView(this.view)
    }
  }
  rm(){
    if(this.view) {
      this.view.model.unregister(this)
      this.view = undefined
    }
    if(this.parent) {
      delete this.parent.children[this.id]
      this.parent = undefined
    }
    if(this.el.parentNode) this.el.parentNode.removeChild(this.el)
  }
  setView (view) {
    this.view = view
    view.model.register(this)
    this.update()
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
  destroy () {
    Object.values(this.children).forEach(vo => vo.destroy())
    this.rm()
    Object.keys(this).forEach(key => delete this[key])
  }
  instruct (fn) {
    Object.values(this.children).forEach(vo => vo.instruct(fn))
    fn.call(this)
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

i0.route = (el, routes) => {
  let cachedView
  const fn = () => {
    if(routes[location.hash]){
      if(cachedView) cachedView.destroy()
      cachedView = routes[location.hash]()
      cachedView.appendTo(el)
    }
  }
  addEventListener('hashchange', fn)
  fn()
}

const JSON_to_URLEncoded = (element,key,list) => {
  list = list || []
  if(typeof element == 'object')
      for (let idx in element)
      JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list)
  else 
      list.push(key+'='+encodeURIComponent(element))
  return list.join('&')
}

const post = body => { return {
  method: "POST",
  body: JSON_to_URLEncoded(body || {}), 
  cache: 'no-cache',
  headers: {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/x-www-form-urlencoded'
  }
} }

const onFetch = (path, body) => fetch( path, post(body) ).then(res => res.json())

i0.http = (...httpPath) => body => onFetch(i0.str(...httpPath), body)

// i0.http`./api/new-todo`(todo)

export default i0