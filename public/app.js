document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        remove(id).then(()=>{
            event.target.closest('li').remove()
        })
    }
    if (event.target.dataset.type === 'change') {
        const id = event.target.dataset.id
        const answer = prompt('Введите новое значение')
        change(id).then(()=>{
            if (answer) {
                console.log(answer);
                console.log(event.target.dataset);
            }
        })
    }
})

async function remove(id){
    await fetch(`/${id}`, {method: 'DELETE'})
}

async function change(id){
    await fetch(`/${id}`, {method: 'PUT'})
}