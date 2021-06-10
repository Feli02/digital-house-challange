window.addEventListener('load', function(){

    let buttonDelete = document.querySelector('#deleteAccount')
    let formulario = document.querySelector('#formDelete')
    let confirmDelete = document.querySelector('#confirmDelete')
    let cancelButton = document.querySelector('#cancel')

    confirmDelete.style.display = 'none'

    buttonDelete.addEventListener('click', function(){
        confirmDelete.style.display = 'block'
    })

    cancelButton.addEventListener('click', function(){
        confirmDelete.style.display = 'none'
    })
})