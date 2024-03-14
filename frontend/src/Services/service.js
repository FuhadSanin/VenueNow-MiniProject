import http from "../httpCommon.js"
class slotService {
  getAllSlots() {
    return http.get("/")
  }
  createSlot(data) {
    return http.post("/", data)
  }
}
export default new slotService()
