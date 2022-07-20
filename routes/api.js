const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const todoController = require("../controller/todo");
const auth = require("../middlewares/auth");

router.post('/admin/signup', adminController.signup);
router.post('/admin/login', adminController.login);

router.post('/todo/add', auth, todoController.add);
router.patch('/todo/update', auth, todoController.update);
router.delete('/todo/delete/:id', auth, todoController.deleteTodo);
router.post('/todo/list', auth, todoController.getTodos);

module.exports = router;