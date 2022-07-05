// const axios = require('axios')
// import axios from 'axios'

function loadItems () {
  document.getElementById('notes').innerHTML = ''
  axios.get('/api/items')
    .then(({ data }) => {
      console.log(data)
      data.forEach(item => {
        const id = item.id
        const itemElem = document.createElement('div')
        itemElem.className = 'card'
        itemElem.classList.add('listItem')
        if (item.is_done === 0) {
          itemElem.classList.add('notDone')
        } else {
          itemElem.classList.add('isDone')
        }
        itemElem.innerHTML = `
        <div class='row card-body'>
          <p id='text' class='col itemText'>${item.text}</p>
          <div class='col'>
            <button class="finish btn btn-success" id='${id}'>Finish</button>
            <button class="delete btn btn-danger" id='${id}'>Delete</button>
          </div>
        </div>
        `
        document.getElementById('notes').append(itemElem)
      })
    })
    .catch(err => console.log(err))
}

document.getElementById('addItem').addEventListener('click', (event) => {
  event.preventDefault()
  let item = document.getElementById('text').value
  console.log(document.getElementById('text').value)
  axios.post('/api/items', { text: `${item}`, is_done: false })
    .then(({ data }) => {
      document.getElementById('text').value = ''
      // alert('Success!')
    })
    .catch(err => console.log(err))
  loadItems()
})

document.addEventListener('click', (event) => {
  event.preventDefault()
  if (event.target.classList.contains('finish')) {
    console.log('HIT!')
    if (event.target.parentNode.parentNode.parentNode.classList.contains('isDone')) {
      event.target.parentNode.parentNode.parentNode.classList.remove('isDone')
      event.target.parentNode.parentNode.parentNode.classList.add('notDone')
      axios.put(`/api/items/${event.target.id}`, { is_done: false })
        .then(console.log('Updated to notDone!'))
        .catch(err => console.log(err))
    } else {
      event.target.parentNode.parentNode.classList.remove('notDone')
      event.target.parentNode.parentNode.classList.add('isDone')
      axios.put(`/api/items/${event.target.id}`, { is_done: true })
        .then(console.log('Updated to isDone!'))
        .catch(err => console.log(err))
    }
  } else if (event.target.classList.contains('delete')) {
    axios.delete(`/api/items/${event.target.id}`)
      .then(() => {
        event.target.parentNode.parentNode.remove()
      })
      .catch(err => { console.log(err) })
  }
})

loadItems()
