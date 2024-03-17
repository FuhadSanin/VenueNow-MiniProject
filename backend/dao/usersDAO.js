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
  static async addUser(email, password) {
    try {
      const user = { email: email, password: password }
      return await users.insertOne(user)
    } catch (e) {
      console.error(`Unable to create user: ${e}`)
      return { error: e }
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
  static async checkEmail(email) {
    try {
      const user = await users.findOne({ email: email })
      return user
    } catch (e) {
      console.error(`Unable to get user: ${e}`)
      return null
    }
  }
}
