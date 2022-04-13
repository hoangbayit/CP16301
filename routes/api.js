var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const userController = require('../compoments/user/controller');
const productController = require('../compoments/products/controller')
const authentication = require('./../middle/authentiaction');
/**
 * http://localhost:3000/api/dang-nhap
 * method: post
 * desc: tiến hành đăng nhập
 */
router.post("/dang-nhap", async function (req, res, next) {
    const { username, password } = req.body;
    // tiến hành đăng nhập
    const user = await userController.login(username, password);
    // await có tác dung là chờ nó chờ nó lấy
    // await thì phải có async
    if (user) {
        // lưu thông tin login vào session
        const token = jwt.sign({ id: user._id, username: user.username }, 'mykey');
        res.json({ status: true, id: user._id, username: user.username, token });
    } else {
        res.json({ status: false })
    }
});

/**
 * http://localhost:3000/api/dang-ky
 * method: post
 * desc: tiến hành đăng ký
 */
router.post("/dang-ky", async function (req, res, next) {
    const { username, password, comfirm_password } = req.body;
    // tiến hành đăng nhập
    const user = await userController.register(username, password, comfirm_password);
    // await có tác dung là chờ nó chờ nó lấy
    // await thì phải có async
    if (user) {
        res.json({ status: true });
        console.log('true: user=====' + username, 'password====' + password);
    } else {
        res.json({ status: false });
        console.log('false: user=====' + username, 'password====' + password);
    }
});
/**
 * http://localhost:3000/api/products/
 * method: get
 * desc: lấy danh sách sản phẩm
 */
 router.get("/products", [authentication.checkToken] , async function (req, res, next) {
    // lấy danh sách sản phẩm từ database và hiển thị
    const products = await productController.getProducts();
    res.json(products);
  });


  /**
 * http://localhost:3000/api/products/:id/detail
 * method: get
 * desc: hiển thị chi tiết 1 sản phẩm
 */
router.get("/products/:id/detail", [authentication.checkToken] , async function (req, res, next) {
    const { id } = req.params;
    const product = await productController.getProductById(id);
    res.json(product);
  });
  


module.exports = router;