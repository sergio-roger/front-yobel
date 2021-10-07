import * as b from './../../config/base.js';

window.onpageshow = () => {

    _init();

    function _init() {
        cargarClientes();
        agregarPedido();
        cargarPedidos();
        editarPedido();
    }

    function cargarClientes() {

        let _url = b.url + '?controller=cliente&accion=listar';

        fetch(_url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    let option = '<option value="0">Seleccione un cliente</option>';

                    data.forEach(element => {
                        option += `<option value="${element.id}"> ${element.nombres} ${element.apellidos}</option>`;
                    });

                    let select = document.getElementById('select-cliente-1');
                    let select2 = document.getElementById('select-cliente-2');

                    select.innerHTML = option;
                    select2.innerHTML = option;
                }
            });
    }

    function cargarPedidos() {
        let _url = b.url + '?controller=pedidos&accion=listar';

        fetch(_url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    let option = '';

                    data.forEach((element, i) => {
                        option += `<tr id="fila-${element.id}">
                    <th scope="row">${i + 1}</th>
                    <td>${element.codigo}</td>
                    <td>${element.fecha}</td>
                    <td>${element.cliente.dni}</td>
                    <td>${element.cliente.nombres}</td>
                    <td>${element.cliente.apellidos}</td>
                    <th>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-secondary btn-editar btn-sm" data-id="${element.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-danger btn-eliminar btn-sm" data-id="${element.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </th>
                </tr>`;
                    });

                    let select = document.getElementById('tbody-pedido');
                    select.innerHTML = option;
                    addEvent();

                    function addEvent() {
                        let btnEditar = document.querySelectorAll('.btn-editar');
                        let btnEliminar = document.querySelectorAll('.btn-eliminar');

                        if (btnEditar.length > 0) {
                            btnEditar.forEach(btn => {
                                btn.addEventListener('click', () => {
                                    let id = btn.getAttribute('data-id');

                                    $('#modal-editar-pedido').modal('show');
                                    getPedido(id);
                                });
                            })

                            btnEliminar.forEach(btn => {
                                btn.addEventListener('click', () => {
                                    let id = btn.getAttribute('data-id');
                                    eliminar(id);
                                });
                            });
                        }

                        function eliminar(id) {
                            Swal.fire({
                                title: 'Estas seguro de eliminar?',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Si, seguro!',
                                cancelButtonText: 'No'
                            }).then((result) => {
                                if (result.isConfirmed) {

                                    let json = {
                                        model: 'pedido',
                                        accion: 'eliminar',
                                        data: { id }
                                    };

                                    const options = {
                                        method: "POST",
                                        body: JSON.stringify(json)
                                    };

                                    fetch(_url, options)
                                        .then(response => response.json())
                                        .then(response => {

                                            let fila = document.getElementById('fila-' + id);
                                            cargarPedidos();
                                        });
                                }
                            })
                        }

                        function getPedido(id) {
                            let _url = b.url + '?controller=pedidos&accion=buscar&id=' + id;

                            fetch(_url)
                                .then(response => response.json())
                                .then(data => {

                                    document.getElementById('pedido-id').value = data.id
                                    document.getElementById('form-cliente-codigo-editar').value = data.codigo;
                                    document.getElementById('form-cliente-fecha-editar').value = data.fecha
                                    document.getElementById('select-cliente-2').value = data.cliente_id
                                    document.getElementById('pedido-id').value = data.id

                                });
                        }
                    }
                }
            });
    }

    function agregarPedido() {
        let form = document.getElementById('form-pedido');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let date = new Date();
            let hoy = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
            let codigo = document.getElementById('form-cliente-codigo').value;
            let fecha = document.getElementById('form-cliente-fecha').value;
            let cliente_id = document.getElementById('select-cliente-1').value;

            let json = {
                model: 'pedido',
                accion: 'insertar',
                data: {
                    codigo, fecha, cliente_id
                }
            };

            if (codigo.length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ingrese un codigo',
                })
            } else
                if (fecha.length == 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ingrese una fecha',
                    })
                } else
                    if (moment(hoy).isAfter(fecha)) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Fecha de pedido no debe ser menor a la actual',
                        })
                    } else
                        if (cliente_id == 0) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Seleccione un cliente',
                            })
                        } else {

                            let _url = b.url + '?controller=cliente&accion=listar';
                            const options = {
                                method: "POST",
                                body: JSON.stringify(json)
                            };

                            fetch(_url, options)
                                .then(response => response.json())
                                .then(response => {
                                    if (response.status) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Pedido agregado !!',
                                        })

                                        form.reset();
                                        cargarPedidos();
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: response.msj,
                                        })
                                    }
                                });

                        }
        })
    }

    function editarPedido(){
        let form = document.getElementById('form-pedido-editar');
        form.addEventListener('submit', (e) => {

            e.preventDefault();

            let date = new Date();
            let hoy = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
            let codigo = document.getElementById('form-cliente-codigo-editar').value;
            let fecha = document.getElementById('form-cliente-fecha-editar').value;
            let cliente_id = document.getElementById('select-cliente-2').value;
            let id = document.getElementById('pedido-id').value;

            let json = {
                model: 'pedido',
                accion: 'actualizar',
                data: {
                    id,codigo, fecha, cliente_id
                }
            };

            if (codigo.length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ingrese un codigo',
                })
            } else
            if (fecha.length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ingrese una fecha',
                })
            } else
            if (moment(hoy).isAfter(fecha)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fecha de pedido no debe ser menor a la actual',
                })
            } else
                if (cliente_id == 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Seleccione un cliente',
                    })
                } else {

                    let _url = b.url;
                    const options = {
                        method: "POST",
                        body: JSON.stringify(json)
                    };

                    fetch(_url, options)
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);

                            if (response.status) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Pedido actualizado !!',
                                })

                                $('#modal-editar-pedido').modal('hide');
                                cargarPedidos();
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: response.msj,
                                })
                            }
                        });

                }

            console.log("click");
        })
    }
}