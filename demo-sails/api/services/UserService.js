module.exports = {
  
  async tryCreate(payload) {
    try {
      let user = await User.create(payload)
      return user
    }
    catch (e) {
      return null
    }
  }
}