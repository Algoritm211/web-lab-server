const User = require('../models/User')


class UserController {

  async createUser(request, response) {

    try {
      const newUserData = request.body

      const user = new User({...newUserData})
      await user.save()

      return response.status(200).json(user)
    } catch (error) {
      console.log(error)
      return response.status(500).json({message: 'Error during creating user'})
    }

  }

  async getAllUsers(request, response) {
    try {

      const users = await User.find({})

      return response.status(200).json(users)
    } catch (error) {
      console.log(error)
      return response.status(500).json({message: 'Can not get all users'})
    }
  }

  async deleteUser(request, response) {
    try {
      const {userId} = request.query
      const user = await User.findOne({_id: userId})
      if (!user) {
        return response.status(404).json({message: 'User was not found'})
      }
      await user.remove()
      return response.status(200).json({user: user, message: 'User was deleted successfully'})
    } catch (error) {
      console.log(error)
      return response.status(500).json({message: 'User delete Error'})
    }
  }
}


module.exports = new UserController()
