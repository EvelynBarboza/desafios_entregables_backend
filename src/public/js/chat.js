const socket = io()


const input = document.getElementById('message')
const messageList = document.getElementById('list-message')

input.addEventListener('keyup', evt =>{
    if (evt.key === 'Enter'){
        socket.emit('message_cliente', input.value)
        input.value = ''
    }
})

socket.on('message-server', data =>{
    console.log(data)
})
//cket.emit('message', 'data en forma de string')
//
//cket.on('socket_individual', data => {
//  console.log(data)
//
//cket.on('Para_todos_menos_el_que_lo_manda', data => {
//  console.log(data)
//
//
//
//cket.on('Eventos_para_todes_incluyendo_el_que_manda', data =>{
//  console.log(data)
//