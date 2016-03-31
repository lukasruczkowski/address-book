'use strict';

function StatusController(config) {
    this._config = config;
    this.getStatus = this.getStatus.bind(this);
}

StatusController.prototype.getStatus = function getStatus(req, res) {
    var status = {
        api: this._config.name,
        description: this._config.description,
        environment: process.env.NODE_ENV.toUpperCase()
    };

    return res.json(status);
};

module.exports = StatusController;
