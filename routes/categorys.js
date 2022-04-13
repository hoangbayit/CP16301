var express = require('express');
var router = express.Router();

const categoryController = require("../compoments/categories/controller");
const authentication = require('../middle/authentiaction');

/**
 * http://localhost:3000/danh-muc/
 * method: get
 * desc: hiển thị danh sách danh mục
 */
router.get("/", [authentication.checkLogin], async function (req, res, next) {
    // lấy danh sách danh mục từ database và hiển thị
    const data = await categoryController.getCategoriesSelected();

    res.render("categorys", { categorys: data });
    //hiển thị(render)
});

// ==================== danh mục ====================
/**
 * http://localhost:3000/danh-muc/
 * method: post
 * desc: thêm mới 1 danh mục
 * middleware: tần trung gian sử lý tất cả thao tác trước khi vô hàm ở trong (up hình ,bắt lỗi ,ktra login....)
 */
router.post("/", [authentication.checkLogin], async function (req, res, next) {
    // thêm mới sp vào db
    const {name,description} = req.body;
    console.log('ksdhjsgdjhgsajhdgsajhgdjsahdjhsadjhsa');
    
    // dấu... có td: thêm 1 thuốc tính vô thêm , đưa thuộc tính hình vào trong body
    await categoryController.insert( req.body);
    console.log('body_insert===== = ',  req.body);
    res.redirect("/danh-muc");
    //chuyển lại trang danh mục 
});

//===================== Thêm Mới danh mục ==================
/**
 * http://localhost:3000/danh-muc/them-moi
 * method: get
 * desc: hiển thị trang them mới danh mục
 */
router.get("/them-moi", [authentication.checkLogin], async function (req, res, next) {

    res.render("categorys_insert");
    //hiển thị(render)
});

//================== Sửa danh mục =======================
/**
 * http://localhost:3000/danh-muc/:id/edit
 * method: get
 * desc: hiển thị chi tiết 1 danh muc
 */
router.get("/:id/edit", [authentication.checkLogin], async function (req, res, next) {
    // lấy 1 sản phẩm từ database và hiển thị
    const { id } = req.params;
    // lấy thông tin chi tiết của sản phẩm
    const category = await categoryController.getCategoryById(id);
    res.render("categorys_edit", { category: category });
    //hiển thị(render)
});

//=============== Cập nhật danh mục ===================
/**
 * http://localhost:3000/danh-muc/:id/edit
 * method: post
 * desc: Cập nhật danh muc
 */
router.post("/:id/edit", [authentication.checkLogin], async function (req, res, next) {

    // Update 1 danh mục vào db
    // let { body, params } = req;
    const id = req.params.id;
    const body = req.body;
   
    await categoryController.update(id, body);

    res.redirect('/danh-muc');
});

//=============== Xóa danh mục ========================
/**
 * http://localhost:3000/danh-muc/:id/delete
 * method: delete
 * desc: xóa 1 danh mục
 */
router.delete("/:id/delete", [authentication.checkLogin], async function (req, res, next) {
    // xóa 1 sản phẩm
    const { id } = req.params;
    await categoryController.delete(id);

    res.json({ result: true });
    // trả về kết quả xóa

});
module.exports = router;