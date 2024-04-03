import slotsDAO from "../dao/slotsDAO.js"

export default class slotsController {
  static async apiGetSlots(req, res, next) {
    const { slotsList, totalNumSlots } = await slotsDAO.getSlots()
    let response = {
      slots: slotsList,
      total_results: totalNumSlots,
    }
    res.json(response)
  }

  static async apiCreateSlot(req, res, next) {
    try {
      const username = req.body.username
      const title = req.body.eventTitle
      const venue = req.body.venue
      const start = req.body.startDate
      const end = req.body.endDate
      const slot = await slotsDAO.createSlot(title, venue, start, end, username)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteSlot(req, res, next) {
    try {
      const slotId = req.query.id
      const slot = await slotsDAO.deleteSlot(slotId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
  static async apiUpdateSlotStatus(req, res, next) {
    try {
      const { id } = req.params
      const { status } = req.body
      const updateResponse = await slotsDAO.updateSlotStatus(id, status)
      if (updateResponse.modifiedCount === 1) {
        res.json({ status: "success" })
      } else {
        throw new Error("Unable to update slot status")
      }
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}
