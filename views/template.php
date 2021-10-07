<?php

    require_once './config/base.php';
    require_once './views/layouts/header.php';
    require_once './views/layouts/sidebar.php';
    require_once './views/layouts/navtop.php';
    require_once './core/url.php';
    
    $url = new Url();
    $controller = $url->getController();
    $view = $url->getView();

    $ruta = './controller/'.$controller.'Controller.php';
    $instancia = ucfirst($controller).'Controller';
    
    if(!$controller && !$view){
        require_once './controller/pedidoController.php';
        $object = new PedidoController();
        $object->crud();
    }else{
        // Inicio contenido dinamico
        require_once $ruta;
        $object = new $instancia();
        $object->$view();
        // Fin contenido dinamico
    }
    
    require_once './views/layouts/footer.php';