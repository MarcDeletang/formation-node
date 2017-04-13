class HTTPWrapper {
  constructor() {
  }

  sendRequest(url, type = 'GET', data = null, headers = []) {
    const request = new XMLHttpRequest()
    return new Promise((resolve, reject) => {
      request.open(type, url, true)
      request.setRequestHeader(...headers)
      request.onreadystatechange = function (aEvt) {
        if (request.readyState == 4) {
          if (request.status == 200)
            return resolve({ result: request.responseText, status: request.status })
          else
            return reject({ result: request.responseText, status: request.status })
        }
      }
      request.send(data)
    })
  }
}


class JSONWrapper extends HTTPWrapper {
  constructor() {
    super()
  }

  sendRequest(url, type = 'GET', data = null) {
    return super.sendRequest(url, type,
      data ? JSON.stringify(data) : null,
      ['Content-Type', 'application/json;charset=UTF-8']).then(result => {
        return { result: JSON.parse(result.result), status: result.status }
      }).catch(err => {
        console.log('Error sendRequest', err)
        return Promise.reject({ result: JSON.parse(err.result), status: err.status })
      })
  }

  sendRequests(requests) {
    return Promise.all(requests.map(elem => {
      return this.sendRequest(...elem)
    })).then(results => {
      return results
    }).catch(err => {
      return Promise.reject(err)
    })
  }

}

const payload = {
  "name": "Michelle2",
  "color": "white",
  "weight": 90,
  "titsCount": 4
}


function createGoat(payload) {
  new JSONWrapper().sendRequest('http://127.0.0.1:1337/item', 'post', payload).then(res => {
    console.log('createGoat', res)
  })
}

function getGoats() {
  new JSONWrapper().sendRequest('http://127.0.0.1:1337/item', 'get').then(res => {
    console.log('getGoats', res)
  })
}

function getGoat(id) {
  new JSONWrapper().sendRequest(`http://127.0.0.1:1337/item/${id}`, 'get').then(res => {
    console.log('getGoat', res)
  })
}

function removeGoat(id) {
  new JSONWrapper().sendRequest(`http://127.0.0.1:1337/item/${id}`, 'delete').then(res => {
    console.log('removeGoat', res)
  })
}

function editGoat(id, payload) {
  new JSONWrapper().sendRequest(`http://127.0.0.1:1337/item/${id}`, 'put', payload).then(res => {
    console.log('editGoat', res)
  })
}

