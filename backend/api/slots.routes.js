import { Router } from "express"
import slotsController from "./slots.controller.js"
import usersController from "./users.controller.js"

const router = Router()

router.route("/").get(slotsController.apiGetSlots)
router.route("/").post(slotsController.apiCreateSlot)
router.route("/").delete(slotsController.apiDeleteSlot)

router.route("/:id").put(slotsController.apiUpdateSlotStatus)

router.route("/users").get(usersController.apiGetUsers)

export default router
