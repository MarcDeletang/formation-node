//Ceci est notre base :)
const items = {}

//Petite utilisation de closure, on s'assure ainsi que personne
//Ne peux venir modifier l'id
const getId = (function () {
  //Initialisation de l'id
  let id = 1
  //Puisque la closure est directement executée c'est cette methode qui sera
  //Appelée plus tard lors de la création des items
  return function getId() {
    return id++
  }
})()




// var item = { 0 : { name: 'test'}, 1: { name: 'toto'} }
// Object.keys = [0, 1]
// item[key] (key = 0) => { name: 'test'}


module.exports.init = function (app) {
  console.log('Init api !')

  app.get('/item', function (req, res) {
    console.log(req.param('lol'))
    //Object retourne un tableau contenant les clefs de l'objet items: cad les ids de notre base
    //On applique reduce sur ces clefs afin formatter le tableau qui va être retourné(acc)
    //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/keys
    //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce
    const idsAsArray = Object.keys(items)
    console.log(idsAsArray)
    console.log('--------------------------')
    idsAsArray.forEach(id => {
      console.log('id', id, 'data', items[id])
    })
    const itemsArray = idsAsArray.reduce(function (acc, key) {
      //Ici on récupere l'item correspondant à la clée key
      const item = items[key]
      //console.log('Key to be added', key, 'object to be added', item)
      //On rajoute l'item dans l'accumulateur
      acc.push(item)
      //Ne pas oublier de retourner l'accumulateur qui sera envoyé lors de la prochaine iteration
      return acc
    }, []/*Initialisation de acc*/)
    //console.log('Returned all items', itemsArray)
    return res.json(itemsArray)
  })

  app.post('/item', function (req, res) {
    //Création de notre nouvel objet à partir du body
    //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/assign
    //On récupere l'id unique, si jamais un id avait été envoyé, on l'écrase au passage
    //console.log('body', req.body)
    const newItem = Object.assign(req.body, { id: getId() })
    //On sauvegarde l'item dans la base
    items[newItem.id] = newItem
    //console.log('Saved item', newItem)
    return res.json(newItem)
  })

  app.get('/item/:idItem', function (req, res) {
    //On récupere l'item grâce au paramètre de l'url
    const item = items[req.params.idItem]
    console.log('Returned item', item)
    if (item)
      return res.json(item)
    return res.status(404).json({ error: 'Item not found' })
  })

  app.put('/item/:idItem', function (req, res) {
    const item = items[req.params.idItem]
    //console.log('Item before update', item)
    if (item) {
      //On met à jour l'objet avec le nouveau body, toujours en sauvegardant l'ancien id
      Object.assign(item, req.body, { id: item.id })
      //console.log('Item after update', item)
      return res.json(item)
    }
    return res.status(404).json({ error: 'Item not found' })
  })

  app.delete('/item/:idItem', function (req, res) {
    const removed = items[req.params.idItem]
    //console.log('Removed item', removed)
    if (removed) {
      //Si l'item à été trouvé, on le supprime de la base
      delete items[req.params.idItem]
      return res.json(removed)
    }
    return res.status(404).json({ error: 'Item not found' })
  })
}