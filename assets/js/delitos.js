const tabla = document.querySelector('#delitos')
const btnNuevoDelito = document.querySelector('#btnNuevoDelito')
const txtNombreDelito = document.querySelector('#txtNombreDelito')
const txtDescripcionDelito = document.querySelector('#txtDescripcionDelito')
const gradoDelito = document.querySelector('#gradoDelito')
const btnRegistrar = document.querySelector('#btnRegistrar')
const idDelito = document.querySelector('#idDelito')

fntListar()

window.addEventListener('submit', (e)=>e.preventDefault())

btnNuevoDelito.addEventListener('click', ()=>{
    $('#registroModal').modal('show')
    fntClearForm()
})

btnRegistrar.addEventListener('click', ()=>{
    fntRegistrar()
})

document.addEventListener('click', (e)=>{
    try {
        let btn = e.target.closest("button")
        let accion = btn.getAttribute("data-action")
        let delitoId = btn.getAttribute("data-delito-id")

        if (accion == 'delete') {
            fntEliminar(delitoId)
            fntListar()
        }
        
        if (accion == 'update') {
            fntEdit(delitoId)
            $('#registroModal').modal('show')
        }

    } catch (error) {}
})

function fntListar(){

    fetch(BASE_URL + '/api/delitos/listartodos')
    .then((res)=> res.json())
    .then((data) => {
        data = data.datos
        console.log(data)
        html = ""
        data.forEach(el => {
            html += `
            <tr>
                <td scope="row">${el.id_delito}</td>
                <td>${el.nombre_delito}</td>
                <td>${el.descripcion_delito}</td>
                <td>${el.grados_delitos_id_grado_delito}</td>
                <td>
                    <button class="btn btn-danger" data-action="delete" data-delito-id="${el.id_delito}"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-primary" data-action="update" data-delito-id="${el.id_delito}"><i class="bi bi-pencil-square"></i></button>
                </td>
            </tr>
            `
        })
        tabla.innerHTML = html
    })
}

function fntRegistrar(){

    fetch(BASE_URL+'/api/delitos/crear',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            nombre_delito:txtNombreDelito.value,
            descripcion_delito:txtDescripcionDelito.value,
            grados_delitos_id_grado_delito:gradoDelito.value
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

    fetch(`${BASE_URL}/api/delitos/borrarporid/${id}`,{
        method: "DELETE"
    })
    .then((res) => res.json())
    .then((data) => console.log(data)) 
}

function fntEdit(id){
    fetch(`${BASE_URL}/api/delitos/listarporid/${id}`)
    .then((res) => res.json())
    .then((json) => {
        data = json.datos[0]
        console.log(data)
        idDelito.value = id_delito
        txtNombreDelito.value = data.nombre_delito
        txtDescripcionDelito.value = data.descripcion_delito
        gradoDelito.value = data.grados_delitos_id_grado_delito

    })
}

function fntClearForm(){
    idDelito.value = ""
    txtNombreDelito.value = ""
    txtDescripcionDelito.value = ""
    gradoDelito.value = ""
}