---
to: src/config.js
---
// Generated file
const smtp = {
    host: '<%= smtp.host %>',
    port: <%= smtp.port %>,
    username: '<%= smtp.username %>',
    password: '<%= smtp.password %>'
};

const alert = {
    forwards: '<%= alert.forwards %>'.split(','),
    hotword:'<%= alert.hotword %>',
    sender: '<%= alert.sender %>',
    from: '<%= alert.from %>',
    to: '<%= alert.to %>'
};

module.exports = { smtp, alert };
