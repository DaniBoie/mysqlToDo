const router = require("../routes/itemRoutes")

axios.get('/api/items')
  .then(({data}) => {
    data.forEach(item =>{
      let id = item.id
      let itemElem = document.createElement('div')
      itemElem.innerHTML = `
      <p>${item.text}</p>
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
   axios.post('/api/items', { text: `${item}` , is_done: 'false'})
 })






  document.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.className === 'finish'){

    } else if (event.target.className === 'delete'){

    }

  })