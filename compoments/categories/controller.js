const categoryService = require('../categories/service');


// 1
exports.getCategories = async () => {
    const data = await categoryService.getCategories();
    return data;
}


//2
exports.getCategoriesSelected = async (id) => {
    let data = await categoryService.getCategories();
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            name: item.name,
            description: item.description,
            selected: item._id == id,
            index: index + 1,
        }
        return item;
    })
    return data;
}


//3
// lấy danh mục theo id
exports.getCategoryById = async (id) => {
    let category = await categoryService.getCategoryById(id);
    category = {
        _id: category._id,
        name: category.name,
        description: category.description,
    }
    return category;
}


//4
exports.insert = async (category) => {
    await categoryService.insert(category);
}


//5
exports.delete = async (id) => {
    await categoryService.delete(id);
}


//6
exports.update = async (id,newCategory) => {
    await categoryService.update(id,newCategory);
}