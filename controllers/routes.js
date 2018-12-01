const { routeOptimizer } = require('../routeOptimizer');

module.exports = {
  optimizedRoutes: (req, res) => {
    let origins = JSON.parse(req.query.origins);
    let destinations = JSON.parse(req.query.destinations);

    routeOptimizer({ origins, destinations })
      .then((optimizedRoutes) => {
        if (optimizedRoutes) {
          res.json({ optimizedRoutes });
        } else {
          res.status(404).end();
        }
      });
  }
}
