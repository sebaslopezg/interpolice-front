const tabla = document.querySelector('#delitos')

fntListar()

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
                    <button class="btn btn-danger" data-action="delete" data-ciudadano-id="${el.id_ciudadanos}"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-primary" data-action="update" data-ciudadano-id="${el.id_ciudadanos}"><i class="bi bi-pencil-square"></i></button>
                </td>
            </tr>
            `
        })
        tabla.innerHTML = html
    })
}