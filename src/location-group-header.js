export default ({ defaultLocationGroup = false }) => {
  return (req, res, next) => {
    let locationGroup = defaultLocationGroup;

    if (locationGroup !== 'false' && locationGroup !== false && locationGroup !== '') {
      req.feathers.locationGroup = locationGroup;
      return next();
    }

    locationGroup = req.get('x-location-group');
    if (locationGroup) {
      req.feathers.locationGroup = locationGroup;
    } else {
      req.feathers.locationGroup = '';
    }

    next();
  };
};
