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

  deleteSlot(id) {
    return http.delete(`?id=${id}`)
  }

  updateSlotStatus(id, status) {
    return http.put(`/${id}`, { status })
  }
}

export default new slotService()
