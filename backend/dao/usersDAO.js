let users
import { ObjectId } from "mongodb"

export default class usersDAO {
  static async injectDB(conn) {
    if (users) {
      return
    }
    try {
      users = await conn.db(process.env.DB_NAME).collection("users")
    } catch (e) {
      console.error(`Unable to establish a collection handle in slotDAO: ${e}`)
    }
  }
  static async getUsers() {
    try {
      const usersList = await users.find().toArray()
      const totalNumUsers = usersList.length
      return { usersList: usersList, totalNumUsers }
    } catch (e) {
      console.error(`Unable to get users: ${e}`)
      return { usersList: [], totalNumUsers: 0 }
    }
  }
}
