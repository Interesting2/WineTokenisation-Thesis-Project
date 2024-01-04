const Wine = require('../models/wine');
const jwt = require('jsonwebtoken');

async function getAllWine(req, res) {
    const wines = await Wine.getAllWine();
    return res.status(200).json({ wines:wines});
}

async function getAllWineByPrice(req, res) {
    var orderBy = 'ASC'
    if (req.query.order_by == 1){
        orderBy = 'DESC'
    }
    const wines = await Wine.getAllWineByPrice(orderBy);
    return res.status(200).json({ wines:wines});
}

async function getAllWineByVintage(req, res) {
    var orderBy = 'ASC'
    if (req.query.order_by == 1){
        orderBy = 'DESC'
    }
    const wines = await Wine.getAllWineByVintage(orderBy);
    return res.status(200).json({ wines:wines});
}

async function getWineBySellerId(req, res) {

    const token =  req.cookies.token;
    // console.log(token)
    const decoded = jwt.verify(token, '12345678');
    const seller_id = decoded.id;

    const {status_list} = req.body;
    if (!status_list) {
        const wines = await Wine.getWineBySellerId(seller_id);
        return res.status(200).json({ wines:wines});
    }else{
        const wines = await Wine.getWineBySellerIdAndStatus(seller_id,status_list);
        return res.status(200).json({ wines:wines});
    }
}

async function getWineBySellerIdOrderByPrice(req, res) {

    const token =  req.cookies.token;
    // console.log(token)
    const decoded = jwt.verify(token, '12345678');
    const seller_id = decoded.id;

    var orderBy = 'ASC'
    if (req.query.order_by == 1){
        orderBy = 'DESC'
    }
    const wines = await Wine.getWineBySellerIdOrderByPrice(seller_id, orderBy);
    return res.status(200).json({ wines:wines});   
}

async function getWineBySellerIdOrderByVintage(req, res) {

    const token =  req.cookies.token;
    // console.log(token)
    const decoded = jwt.verify(token, '12345678');
    const seller_id = decoded.id;

    var orderBy = 'ASC'
    if (req.query.order_by == 1){
        orderBy = 'DESC'
    }
    const wines = await Wine.getWineBySellerIdOrderByVintage(seller_id, orderBy);
    return res.status(200).json({ wines:wines});   
}

async function getWineByWineId(req, res) {
    const wineId = req.query.wine_id;
    const wines = await Wine.getWineByWineId(wineId);
    return res.status(200).json({ wines : wines});
    
}

async function sellWine(req, res) {
    const {wine_id,wine_name,price,intro,current_num,pic_name,vintage} = req.body;

    const token =  req.cookies.token;
    // console.log(token)
    const decoded = jwt.verify(token, '12345678');
    const seller_id = decoded.id;
    console.log(seller_id, price, intro, current_num, pic_name, vintage);

    
    // const {wine_name,price,intro,seller_id,current_num,pic_name,vintage} = req.body;
    const result = await Wine.sellWine(wine_id,wine_name,price,intro,seller_id,current_num,pic_name,vintage)
    return res.status(200).json({ sell_result:result});
}

async function updateWine(req, res) {
    const {wine_id,wine_name,price,intro,current_num,pic_name} = req.body;
    const result = await Wine.updateWine(wine_id,wine_name,price,intro,current_num,pic_name)
    return res.status(200).json({ update_result:result});
}

async function deleteWine(req, res) {
    const { wine_id} = req.body;
    await Wine.deleteWine(wine_id);
    const wine = await Wine.getWineByWineId(wine_id)
    if (wine.status == 1) {
        return res.status(200).json({ wine:wine});
    }else{
        return res.status(400).json({ wine:wine});
    }
}

module.exports = { getAllWine,getAllWineByPrice,getAllWineByVintage,getWineBySellerId,sellWine,updateWine,deleteWine, getWineByWineId, getWineBySellerIdOrderByPrice, getWineBySellerIdOrderByVintage};