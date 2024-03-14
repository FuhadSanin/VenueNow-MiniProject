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
      const eventTitle = req.body.eventTitle
      const venue = req.body.venue
      const startDate = req.body.startDate
      const endDate = req.body.endDate
      const slot = await slotsDAO.createSlot(
        eventTitle,
        venue,
        startDate,
        endDate
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}
