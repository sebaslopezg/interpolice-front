const btnRegistrar = document.querySelector('#btnRegistrar')
const btnNuevoRegistro = document.querySelector('#btnNuevoRegistro')
const txtNombreDelito = document.querySelector('#txtNombreDelito')
const txtDescripcion = document.querySelector('#txtDescripcion')
const idgadoDelito = document.querySelector('#idgadoDelito')
const tabla = document.querySelector('#gradosDelito')
let idregistro
let estaEditando = false

fntListar()

btnNuevoRegistro.addEventListener('click', ()=>{
    $('#registroModal').modal('show')
    fntClearForm()
})

window.addEventListener('submit', (e)=>e.preventDefault())

btnRegistrar.addEventListener('click', ()=>{
    estaEditando ? fntActualizar(idregistro) : fntRegistrar()
})

document.addEventListener('click', (e)=>{
    try {
        let btn = e.target.closest("button")
        let accion = btn.getAttribute("data-action")
        let id = btn.getAttribute("data-grado-delito-id")

        if (accion == 'delete') {
            fntEliminar(id)
        }
        
        if (accion == 'update') {
            fntEdit(id)
            idregistro = id
            $('#registroModal').modal('show')
        }

    } catch (error) {}
})


function fntListar(){

    fetch(BASE_URL + '/api/grados_delitos/listartodos')
    .then((res)=> res.json())
    .then((data) => {
        data = data.datos
        html = ""
        data.forEach(el => {
            html += `
            <tr>
                <td scope="row">${el.id_grado_delito}</td>
                <td>${el.nombre}</td>
                <td>${el.descripcion == null ? "N/A" : el.descripcion}</td>
                <td>
                    <button class="btn btn-danger" data-action="delete" data-grado-delito-id="${el.id_grado_delito}"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-primary" data-action="update" data-grado-delito-id="${el.id_grado_delito}"><i class="bi bi-pencil-square"></i></button>
                </td>
            </tr>
            `
        })
        tabla.innerHTML = html
    })
}

function fntRegistrar(){

    fetch(BASE_URL+'/api/grados_delitos/crear',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            nombre:txtNombreDelito.value,
            descripcion:txtDescripcion.value
        })
    })
    .then((res) => res.json())
    .then((data) => {
        Swal.fire({
            title: data.status ? "Registro insertado" : "Error",
            text: data.mensaje,
            icon: data.status ? "success" : "error"
        })
        if (data.status) {
            $('#registroModal').modal('hide')
            fntListar()
        }
    })
}

function fntActualizar(id){

    fetch(BASE_URL+`/api/grados_delitos/editarporid/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            nombre:txtNombreDelito.value,
            descripcion:txtDescripcion.value
        })
    })
    .then((res) => res.json())
    .then((data) => {
        Swal.fire({
            title: data.status ? "Registro actualizado" : "Error",
            text: data.mensaje,
            icon: data.status ? "success" : "error"
        })
        if (data.status) {
            $('#registroModal').modal('hide')
            fntListar()
            estaEditando = false
        }
    })
}

function fntEliminar(id){

    fetch(`${BASE_URL}/api/grados_delitos/borrarporid/${id}`,{
        method: "DELETE"
    })
    .then((res) => res.json())
    .then((data) => Swal.fire({
        title: "Eliminar",
        text: data.mensaje,
        icon: data.status ? "success" : "error"
    })) 
    fntListar()
}

function fntEdit(id){
    fetch(`${BASE_URL}/api/grados_delitos/listarporid/${id}`)
    .then((res) => res.json())
    .then((json) => {
        data = json.datos[0]
        console.log(data)
        txtDescripcion.value = data.descripcion
        txtNombreDelito.value = data.nombre
        idgadoDelito.value =  id_grado_delito
    })
    estaEditando = true
}

function fntClearForm(){
    txtDescripcion.value = ""
    txtNombreDelito.value = ""
}