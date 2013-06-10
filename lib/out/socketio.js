/**
		lucidtail
		i.e. lucidtail file*.log --udp4 514 -p 8080
		Copyright (C) 2013	David Duong

		https://github.com/davidnqd/lucidtail

		This program is free software: you can redistribute it and/or modify
		it under the terms of the GNU Affero General Public License as published by
		the Free Software Foundation, either version 3 of the License, or
		(at your option) any later version.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the
		GNU Affero General Public License for more details.

		You should have received a copy of the GNU Affero General Public License
		along with this program.	If not, see <http://www.gnu.org/licenses/>.
*/
var Aggregator = require('../Aggregator');

/**
 * Example demonstrating creating an emitter which broadcasts to socket.io
 */
module.exports = function (server, opts) {
	opts = opts || {};
	opts.emitter = opts.emitter || new Aggregator();

	// Serve up client-side socket.io resources
	var io = require('socket.io')
		.listen(server);

	var channel = (opts.of)? io.of(opts.of) : io;
	channel.on('connection', opts.emitter.pipe.bind(opts.emitter))

	// Configure socket.io if NODE_ENV=production with author's recommended config
	io.configure('production', function() {
		io.enable('browser client minification');  // send minified client
		io.enable('browser client etag');          // apply etag caching logic based on version number
		io.enable('browser client gzip');          // gzip the file
		io.set('log level', 1);                    // reduce logging
	});

	return opts.emitter;
}