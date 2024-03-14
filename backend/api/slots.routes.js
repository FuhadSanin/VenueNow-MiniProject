import { Router } from "express"
import slotsController from "./slots.controller.js"

const router = Router()

router.route("/").get(slotsController.apiGetSlots)
router.route("/").post(slotsController.apiCreateSlot)

export default router
