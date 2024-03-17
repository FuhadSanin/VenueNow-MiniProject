import http from "../httpCommon.js"
class slotService {
  getAllSlots() {
    return http.get("/")
  }
  createSlot(data) {
    return http.post("/", data)
  }
  getAllUsers() {
    return http.get("/users")
  }
}
export default new slotService()
