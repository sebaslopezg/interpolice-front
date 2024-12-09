const btnRegistrar = document.querySelector('#btnRegistrar')
const btnNuevoRegistro = document.querySelector('#btnNuevoRegistro')
const txtNombreDelito = document.querySelector('#txtNombreDelito')
const txtDescripcion = document.querySelector('#txtDescripcion')
const tabla = document.querySelector('#gradosDelito')

fntListar()

btnNuevoRegistro.addEventListener('click', ()=>{
    $('#registroModal').modal('show')
    fntClearForm()
})

window.addEventListener('submit', (e)=>e.preventDefault())

btnRegistrar.addEventListener('click', ()=>{
    fntRegistrar()
})


function fntListar(){

    fetch(BASE_URL + '/api/grados_delitos/listartodos')
    .then((res)=> res.json())
    .then((data) => {
        data = data.datos
        console.log(data)
        html = ""
        data.forEach(el => {
            html += `
            <tr>
                <td scope="row">${el.id_grado_delito}</td>
                <td>${el.nombre}</td>
                <td>${el.descripcion == null ? "N/A" : el.descripcion}</td>
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

function fntClearForm(){
    txtDescripcion.value = ""
    txtNombreDelito.value = ""
}