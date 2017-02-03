module.exports = (res) => {

    const menu = require('../menu.json');
     
    res.render('menu', {title: 'TEST | Menu', message: 'Scegli ciò che preferisci!', itemsList: menu['ITEMS']['RESTAURANT']});
    return menu;
}