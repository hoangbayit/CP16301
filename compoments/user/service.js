// service: tầng giao tiếp với database

const userModel = require('./model');
exports.login = async (username) => {
    // const user = data.filter((item) => item.username == username)[0];
    // return user;

    // select id, username, password from users where username= ''
    const user = await userModel.findOne
        ({ username: username }, 'id email password');
    return user;
};

exports.register = async (username, password) => {
    const user = new userModel({ username, password });
    return await user.save();
}

var data = [
    { id: 1, username: "admin@gmail.com", password: "1", name: "Hy" },
    { id: 2, username: "manager@gmail.com", password: "1", name: "Nam", },
    { id: 3, username: "employee@gmail.com", password: "1", name: "Tran " },
    { id: 4, username: "user@gmail.com", password: "1", name: "Thành" },
];