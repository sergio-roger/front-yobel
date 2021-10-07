<div class="container-fluid" style="height: 90vh;">

    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Pedidos</h1>
    </div>

    <div class="row">
        <div class="col-12">

            <form id="form-pedido" method="POST" class="row">
                <div class="col-12 col-md-3">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Codigo" id="form-cliente-codigo">
                    </div>
                </div>
                <div class="col-12 col-md-3 form-group">
                    <div class="form-group">
                        <input type="date" class="form-control" placeholder="Fecha" id="form-cliente-fecha">
                    </div>
                </div>

                <div class="col-12 col-md-3 form-group">
                    <div class="form-group">
                        <select id="select-cliente-1" class="form-control">
                            <!-- <option value="0">Seleccione un cliente</option> -->
                        </select>
                    </div>
                </div>

                <div class="col-12 col-md-3 form-group">
                    <button class="btn btn-primary" type="submit">
                        <i class="fas fa-plus mr-2"></i>
                        Agregar
                    </button>
                </div>
            </form>
        </div>
    </div>

    <hr>

    <div class="row mt-4">
        <div class="col-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Codigo Pedido</th>
                        <th scope="col">Fecha Pedido</th>
                        <th scope="col">DNI</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody id="tbody-pedido">
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <th>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-secondary">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button type="button" class="btn btn-danger">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal" tabindex="-1" id="modal-editar-pedido">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar pedido</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form id="form-pedido-editar" method="POST" class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <input type="hidden" class="form-control" placeholder="Codigo" id="pedido-id">
                                <input type="text" class="form-control" placeholder="Codigo" id="form-cliente-codigo-editar" readonly>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <input type="date" class="form-control" placeholder="Fecha" id="form-cliente-fecha-editar">
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="form-group">
                                <select id="select-cliente-2" class="form-control">
                                    <!-- <option value="0">Seleccione un cliente</option> -->
                                </select>
                            </div>
                        </div>

                        <div class="col-12 col-md-3 form-group">
                            <button class="btn btn-primary" type="submit">
                            <i class="fas fa-check mr-2"></i>
                                Editar
                            </button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                   
                </div>
            </div>
        </div>
    </div>

    <script src="<?= BASE ?>assets/js/pedido.js" type="module"></script>