let slots
import { ObjectId } from "mongodb"

export default class slotsDAO {
  static async injectDB(conn) {
    if (slots) {
      return
    }
    try {
      slots = await conn.db(process.env.DB_NAME).collection("slots")
    } catch (e) {
      console.error(`Unable to establish a collection handle in slotDAO: ${e}`)
    }
  }

  static async getSlots() {
    try {
      const slotsList = await slots.find().toArray()
      const totalNumSlots = slotsList.length
      return { slotsList: slotsList, totalNumSlots }
    } catch (e) {
      console.error(`Unable to get slots: ${e}`)
      return { slotsList: [], totalNumSlots: 0 }
    }
  }

  static async createSlot(title, venue, start, end, username) {
    try {
      const slot = {
        title: title,
        venue: venue,
        start: start,
        end: end,
        username: username,
        status: "pending",
      }
      return await slots.insertOne(slot)
    } catch (e) {
      console.error(`Unable to create slot: ${e}`)
      return { error: e }
    }
  }
  static async deleteSlot(id) {
    try {
      const deleteResponse = await slots.deleteOne({
        _id: new ObjectId(id),
      })
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete slot: ${e}`)
      return { error: e }
    }
  }
  static async updateSlotStatus(id, status) {
    try {
      const updateResponse = await slots.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: status } }
      )
      return updateResponse
    } catch (e) {
      console.error(`Unable to update slot status: ${e}`)
      return { error: e }
    }
  }
}
