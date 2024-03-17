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
  static async apiCreateUser(req, res, next) {
    try {
      const email = req.body.email
      const password = req.body.password
      const user = await usersDAO.addUser(email, password)
      res.json({ status: "success user created" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
  static async apiCheckEmail(req, res, next) {
    try {
      const email = req.body.email
      const user = await usersDAO.checkEmail(email)
      if (user) {
        res.json({ status: "success" })
      } else {
        res.json({ status: "failed" })
      }
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}
