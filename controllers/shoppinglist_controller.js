const shoppinglist_model = require('../models/shoppinglist-model');
const shoppinglist_views = require('../views/shoppinglist-views');
const product_model = require('../models/product_model')


// käyttäjän tekemät shoppinglist
const get_shoppinglist = (req, res, next) => {
    const shoppinglist_id = req.params.id;
    shoppinglist_model.findOne({
        _id: shoppinglist_id
    }).then((shoppinglist) => {
        shoppinglist.populate('products').execPopulate().then(() => {
            let data = {
                shoppinglist_name: shoppinglist.name,
                products: shoppinglist.products,
                shoppinglist_id: shoppinglist._id
            };
            let html = shoppinglist_views.shoppinglist_view(data);
            res.send(html);
        });
    });
};

const get_shoppinglists = (req, res, next) => {
    const user = req.user;

    user.populate('shoppinglists').execPopulate().then(() => {
        let data = {
            user_name: user.name,
            shoppinglists: user.shoppinglists
        };
        let html = shoppinglist_views.shoppinglists_view(data);
        res.send(html);
    });
};

// const get_shoppinglists = (req, res, next) => {
//     const user = req.user;

//     user.populate('shoppinglists').execPopulate().then(() => {
//         let data = {
//             user_name: user.name,
//             shoppinglists: user.shoppinglists
//         };
//         let html = shoppinglist_views.shoppinglists_view(data);
//         res.send(html);
//     });
// };

/*const post_add_shoppinglist = (req,res, next) => {
    const user = req.user;

    let new_shoppinglist = shoppinglist_model({
        name: req.body.shoppinglist,
        products: []
    });

    new_shoppinglist.save().then(() => {
        user.shoppinglists.push(new_shoppinglist);
        user.save().then(() => {
            return res.direct('/');
        });
    });  
};*/


// shoppinglistn poistokomentojuttujuttu
const post_delete_shoppinglist = (req, res, next) => {
    const user = req.user;
    const shoppinglist_id_to_delete = req.body.shoppinglist_id;

    //Remove shoppinglist from user.shoppinglists
    const updated_shoppinglist = user.shoppinglists.filter((shoppinglist_id) => {
        return shoppinglist_id != shoppinglist_id_to_delete;
    });
    user.shoppinglists = updated_shoppinglist;

    //Remove shoppinglist object from database
    user.save().then(() => {
        shoppinglist_model.findByIdAndRemove(shoppinglist_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};


/* etsitään shoppinglist?!
const get_shoppinglist = (req, res, next) => {
    const shoppinglist_id = req.params.id;
    shoppinglist_model.findOne({
        _id: shoppinglist_id
    }).then((shoppinglist) => {
        let data = {
            text: shoppinglist.text
        };
        let html = shoppinglist_views.shoppinglist_view(data);
        res.send(html);
    });
}; */

// shoppinglistn tallennus komentojuttunen
const post_shoppinglist = (req, res, next) => {
    const user = req.user;
    let new_shoppinglist = shoppinglist_model({
        name: req.body.shoppinglist,
        products: []
    });

    new_shoppinglist.save().then(() => {
        console.log('shoppinglist saved');
        user.shoppinglists.push(new_shoppinglist);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};

const post_add_product = (req, res, next) => {
    const shoppinglist_id = req.params.id;
    shoppinglist_model.findOne({
        _id: shoppinglist_id
    }).then((shoppinglist)=> {
        let new_product = product_model({
            name: req.body.product_name,
            quantity: req.body.product_quantity,
            img: req.body.product_image_url
        });

        new_product.save().then(() => {
            shoppinglist.products.push(new_product);
            shoppinglist.save().then(() => {
                return res.redirect(`/shoppinglist/${shoppinglist._id}`);
            });
        });
    });
};


//ja tässä taas nämä constit mitkä yllä määritelty. get/post-settiä?
module.exports.get_shoppinglists = get_shoppinglists;
module.exports.get_shoppinglist = get_shoppinglist;
module.exports.post_shoppinglist = post_shoppinglist;
module.exports.post_delete_shoppinglist = post_delete_shoppinglist;
module.exports.post_add_product = post_add_product;
// module.exports.post_add_shoppinglist = post_add_shoppinglist;