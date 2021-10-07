<?php

class Url {

    private $url;

    public function __construct(){
        $this->url = (isset($_GET['url'])) ? $_GET['url'] : '/';
    }

    public function getController(){
        $controller = false;

        if($this->url != '/'){
            $array = explode('/',$this->url);
            $controller = (isset($array[0])) ? $array[0] : false;
        }

        return $controller;
    }

    public function getView(){
        $view = false;

        if($this->url != '/'){
            $array = explode('/',$this->url);
            $view = (isset($array[1])) ? $array[1] : false;
        }

        return $view;
    }
}