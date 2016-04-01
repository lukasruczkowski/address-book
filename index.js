'use strict';

var di = require('di');
var injectorConfig = require('./injectorConfig');
var injector = new di.Injector([injectorConfig]);

injector.invoke(function main(config, app) {
    var port = config.port;

    app.listen(port, function () {
        console.log('Listening on port ' + port);
    });
});
