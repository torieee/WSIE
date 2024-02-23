async function logout(req, res) {
    req.session.data = null;
    return res.status(200).json();
  }
  async function checkAuth(req, res) {
    if (!req.session.data) {
      return res.status(401).json();
    }
    const { username } = req.session.data;
    return res.status(200).json({ username });
  }
  
  module.exports = {
    logout,
    checkAuth
  };