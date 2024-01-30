function checkYearParam(req, res, next) {
    const { year } = req.params;

    if (year === 'current') {
        return next('route');
    }

    next();
}

module.exports = checkYearParam;
