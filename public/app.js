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
        if (item.is_done === 0) {
          itemElem.classList.add('notDone')
        } else {
          itemElem.classList.add('isDone')
        }
        itemElem.innerHTML = `
        <p id='text'>${item.text}</p>
        <button class="finish" id='${id}'>Finish</button>
        <button class="delete" id='${id}'>Delete</button>
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
      alert('Success!')
    })
    .catch(err => console.log(err))
  loadItems()
})

document.addEventListener('click', (event) => {
  event.preventDefault()
  if (event.target.className === 'finish') {
    if (event.target.parentNode.className === 'isDone') {
      event.target.parentNode.classList.remove('isDone')
      event.target.parentNode.classList.add('notDone')
      axios.put(`/api/items/${event.target.id}`, { is_done: false })
        .then(console.log('Updated to isDone!'))
        .catch(err => console.log(err))
    } else {
      event.target.parentNode.classList.remove('notDone')
      event.target.parentNode.classList.add('isDone')
      axios.put(`/api/items/${event.target.id}`, { is_done: true })
        .then(console.log('Updated to isDone!'))
        .catch(err => console.log(err))
    }
  } else if (event.target.className === 'delete') {
    axios.delete(`/api/items/${event.target.id}`)
      .then(() => {
        event.target.parentNode.remove()
      })
      .catch(err => { console.log(err) })
  }
})

loadItems()
