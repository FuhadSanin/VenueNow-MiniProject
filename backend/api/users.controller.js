import usersDAO from "../dao/usersDAO.js"

export default class usersController {
  static async apiGetUsers(req, res, next) {
    const { usersList, totalNumUsers } = await usersDAO.getUsers()
    let response = {
      users: usersList,
      total_results: totalNumUsers,
    }
    res.json(response)
  }
}
