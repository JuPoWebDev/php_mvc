<?php


namespace AccueilController;

class AccueilController
{
    private $data = "123";

    /**
     * @return string
     */
    public function getData(): string
    {
        return $this->data;
    }

    /**
     * @param string $data
     */
    public function setData(string $data)
    {
        $this->data = $data;
    }

    public function render() {
        $head_title = "Je suis une page de test avec un titre";
        $meta_description = "Je suis le texte qui sera lu sur google par les internautes";

        $page_data = $this->getData();
        $view = include __DIR__ . "/../vues/accueil.php";
        return $view;
    }
}