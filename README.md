# SokCube

#### Description

Le but de ce projet et de découvrir le système des sockets. Le principe est simple : avoir un petit carré qu'on peut déplacer (avec zqsd). Assez simple non ?

> Oé oé super ton projet web ^^

Mais en plus de ça, si quelqu'un rejoint le site cela s'affiche automatiquement sur tous les écrans des joueurs.

> EN DIRECT ???? Woaaaaa

Et oui, c'est le principe des sockets, par besoin de spam sa touche F5 pour voir les mises à jour ! Le client garde une connexion ouverte vers les serveurs pour envoyer et recevoir les données !

> UwU

Comme par exemple quand vous regardez un stream d'Amouranth, ou lorsque vous parlez avec votre crush sur discord. **TOUT** ça c'est des sockets.


#### Install

* Installation : `npm i`
* Tester : [http://localhost:8080/](http://localhost:8080/)


#### Documentation

##### Config

Fichier de config :

```json
{
    "port": 8080,
    "name": "SokCube",
    "public_folder": "public",
    "views_folder": "views"
}
```




