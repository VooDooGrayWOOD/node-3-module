document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        remove(id).then(()=>{
            event.target.closest('li').remove()
        })
    }
    if (event.target.dataset.type === 'change') {
        const title = event.target.dataset.title
        const answer = prompt('Введите новое значение', title)
        change(answer).then(()=>{
                event.target.dataset.title = answer
        })
    }
})

async function remove(id){
    await fetch(`/${id}`, {method: 'DELETE'})
}

async function change(answer){
    await fetch(`/${answer}`, {method: 'PUT'})
}