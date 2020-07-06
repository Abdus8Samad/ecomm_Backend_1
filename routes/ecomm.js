const router = require('express').Router(),
Cart = require('../models/cart'),
Product = require('../models/product'),
isAuthenticated = require('../middlewares/isAuthenticated');



/*----------CART----------*/

//Cart Page
router.get('/cart',isAuthenticated,(req,res) =>{
    //Find cart by logged in user's id
    Cart.findOne({owner:req.user._id}).populate('Product').exec((err,cart) =>{
        //Render Cart Page
        res.render('cart',{cart})
    })
})

/*----------PRODUCTS----------*/

router.get('/products',(req,res) =>{
    let products = [];
    //By default show new arrivals
    Product.find().sort({date:-1})
    .then(prods =>{products = prods})
    .catch(err =>{
        req.flash('error',err.message);res.redirect('/')
    })
    res.render('products',{products});
})

//Search query
router.post('/products/search',(req,res) =>{
    //Post the search query right here at '/search'
    let query = req.body.query;
    let regexp = new RegExp(query,'g');

})

router.post('/products/filter',(req,res) =>{
    //Send Post req to this route with filter = yourfilter for filtering like price lth or new arrivals etc
    let filter = req.body.filter;
    let products = [];
    switch(filter){
        case 'new':
            Product.find().sort({date:-1}).then(prods =>{products = prods}).catch(err =>{req.flash('error',err.message);res.redirect('/')})
            break;
        case 'lth':
            Product.find().sort({price:1}).then(prods =>{products = prods}).catch(err =>{req.flash('error',err.message);res.redirect('/')})
            break;
        case 'htl':
            Product.find().sort({price:-1}).then(prods =>{products = prods}).catch(err =>{req.flash('error',err.message);res.redirect('/')})
            break;
        default:
            Product.find().sort({date:-1}).then(prods =>{products = prods}).catch(err =>{req.flash('error',err.message);res.redirect('/')})
    }
    res.render('products',{products});
})

//View a specific product
router.get('/products/:productid',(req,res) =>{
    Product.findOne({name:req.params.productid})
    .then(product =>{
        res.render('productView',{product})
    })
    .catch(err =>{
        req.flash('error',err.message);
        res.redirect('/products');
    })
})


//Add to Cart
router.post('/products/:productid',isAuthenticated,(req,res) =>{
    Cart.findOne({owner:req.user._id})
    .then(cart =>{
        let { total } = cart;
        Cart.findOneAndUpdate({owner:req.user._id},{$set:{}})
        res.redirect('/cart');
    })
    .catch(err =>{
        req.flash('error',err.message);
        res.redirect('/products');
    })
})

module.exports = router;