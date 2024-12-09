const tabla = document.querySelector('#infoCiudadanos')
const btnRegistrar = document.querySelector('#btnRegistrar')
const btnNuevoCiudadano = document.querySelector('#btnNuevoCiudadano')
const registroModal = document.querySelector('#registroModal')

const frmNombreEntidad = document.querySelector('#nombreEntidad')
const frmApellidoEntidad = document.querySelector('#apellidoEntidad')
const frmApodoEntidad = document.querySelector('#apodoEntidad')
const frmEmailEntidad = document.querySelector('#emailEntidad')
const frmFechaEntidad = document.querySelector('#fechaEntidad')
const frmIdEntidad = document.querySelector('#idEntidad')

fntListar()

window.addEventListener('submit', (e)=>e.preventDefault())

btnRegistrar.addEventListener('click', ()=>{
    fntRegistrar()
})

btnNuevoCiudadano.addEventListener('click', ()=>{
    $('#registroModal').modal('show')
})

document.addEventListener('click', (e)=>{
    try {
        let btn = e.target.closest("button")
        let accion = btn.getAttribute("data-action")
        let ciudadanoId = btn.getAttribute("data-ciudadano-id")

        if (accion == 'delete') {
            fntEliminar(ciudadanoId)
            fntListar()
        }
        
        if (accion == 'update') {
            fntEdit(ciudadanoId)
            $('#registroModal').modal('show')
        }

    } catch (error) {}
})

function fntRegistrar(){
    let nombreEntidad = document.querySelector('#nombreEntidad')
    let apellidoEntidad = document.querySelector('#apellidoEntidad')
    let emailEntidad = document.querySelector('#emailEntidad')
    let apodoEntidad = document.querySelector('#apodoEntidad')
    let fechaEntidad = document.querySelector('#fechaEntidad')
    fetch(BASE_URL+'/api/ciudadano/crear',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            nombre: nombreEntidad.value,
            apellido: apellidoEntidad.value,
            fecha_nacimiento: fechaEntidad.value,
            categoria_id_categoria: 1
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
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

function fntEliminar(id){

    fetch(`${BASE_URL}/api/ciudadano/borrarporid/${id}`,{
        method: "DELETE"
    })
    .then((res) => res.json())
    .then((data) => console.log(data)) 
}

function fntListar(){

    fetch(BASE_URL + '/api/ciudadano/listartodos')
    .then((res)=> res.json())
    .then((data) => {
        data = data.datos
        console.log(data)
        html = ""
        data.forEach(el => {
            html += `
            <tr>
                <td scope="row">${el.id_ciudadanos}</td>
                <td>${el.nombre}</td>
                <td>${el.apellido}</td>
                <td>${el.categoria_id_categoria}</td>
                <td>
                    <button class="btn btn-danger" data-action="delete" data-ciudadano-id="${el.id_ciudadanos}"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-primary" data-action="update" data-ciudadano-id="${el.id_ciudadanos}"><i class="bi bi-pencil-square"></i></button>
                </td>
            </tr>
            `
        })
        tabla.innerHTML = html
    })
}

function fntEdit(id){
    fetch(`${BASE_URL}/api/ciudadano/listarporid/${id}`)
    .then((res) => res.json())
    .then((json) => {
        data = json.datos[0]
        console.log(data)
        frmNombreEntidad.value = data.nombre
        frmApellidoEntidad.value = data.apellido
        frmFechaEntidad.value = data.fecha_nacimiento
        frmIdEntidad.value = data.id_ciudadanos

    })
}