axios.get('/api/items')
  .then(({ data }) => {
    data.forEach(item => {
      let id = item.id
      let itemElem = document.createElement('div')
      if (item.is_done === 0) {
        itemElem.classList.add("notDone")
      } else {
        itemElem.classList.add("isDone")
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

document.getElementById('addItem').addEventListener('click', (event) => {
  event.preventDefault()
  let item = document.getElementById('text').value
  axios.post('/api/items', { text: `${item}`, is_done: false })
    .then(({ data }) => {
      document.getElementById('text').value = ''

    })
    .catch(err => console.log(err))
})

document.addEventListener('click', (event) => {
  event.preventDefault()
  if (event.target.className === 'finish') {
    if (event.target.parentNode.className === 'isDone') {
      event.target.parentNode.classList.remove("isDone")
      event.target.parentNode.classList.add("notDone")
    } else {
      event.target.parentNode.classList.remove("notDone")
      event.target.parentNode.classList.add("isDone")
    }
  } else if (event.target.className === 'delete') {
    axios.delete(`/api/items/${event.target.id}`)
      .then(() => {
        event.target.parentNode.remove()
      })
      .catch(err => { console.log(err) })
  }
})