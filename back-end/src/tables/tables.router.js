/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./tables.controller");
const cors = require("cors");

router.use(cors());

router.route("/:table_id/seat")
    .put(controller.seat)
    .delete(controller.finish)
    .all(methodNotAllowed);

router.route("/:table_id")
    .get(controller.read)
    .all(methodNotAllowed);



router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;
