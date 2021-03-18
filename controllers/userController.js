const User = require('../models/User')
const client = require('../models/query')


class UserController {

  async createUser(request, response) {

    try {
      const newUserData = request.body
      newUserData.id = Date.now()
      // const user = new User({...newUserData})
      // await user.save()

      client.query(`INSERT INTO users (
        id,
        firstName,
        lastName,
        email,
        phone,
        linkTwitter,
        linkFacebook,
        linkLinkedin,
        linkTelegram,
        linkVK
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [
        newUserData.id,
        newUserData.firstName,
        newUserData.lastName,
        newUserData.email,
        newUserData.phone,
        newUserData.linkTwitter || 'no info',
        newUserData.linkFacebook || 'no info',
        newUserData.linkLinkedin || 'no info',
        newUserData.linkTelegram || 'no info',
        newUserData.linkVK || 'no info',
        ], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(newUserData)
      })

      // return response.status(200).json(user)
    } catch (error) {
      console.log(error)
      return response.status(500).json({message: 'Error during creating user'})
    }

  }

  async getAllUsers(request, response) {
    try {

      client.query('SELECT * FROM users', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      // return response.status(200).json(users)
    } catch (error) {
      console.log(error)
      return response.status(500).json({message: 'Can not get all users'})
    }
  }

  async getTopTenUsers(request, response) {
    try {
      client.query('SELECT * FROM Users ORDER BY id LIMIT 10', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({message: 'Can not get first 10 users'})
    }
  }

  async getUserLength(request, response) {
    try {
      client.query('SELECT count(*) FROM Users', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows[0])
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({message: 'Can not get first 10 users'})
    }
  }

  async removeAllUsers(request, response) {
    try {
      client.query('TRUNCATE Users', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json({ message: 'All users was deleted successfully'})
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({message: 'Can not remove all users'})
    }
  }

  async deleteUser(request, response) {
    try {
      const {userId} = request.query
      client.query('DELETE FROM users WHERE id = $1', [userId], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json({ message: 'User was deleted successfully'})
      })
      // return response.status(200).json({ message: 'User was deleted successfully'})
    } catch (error) {
      console.log(error)
      return response.status(500).json({message: 'User delete Error'})
    }
  }
}


module.exports = new UserController()
