export const requireRole = (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const userRole = req.user.role; 
      if (roles.includes(userRole)) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden' });
      }
    };
  };