module.exports = function ( grunt ) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    var taskConfig = {
        jshint: {
            src: ['src/**/*.js', '!fileToExclude.js'],
            options: {
                "curly":   true,
                "eqnull":  true,
                "eqeqeq":  true,
                "undef":   true,
                "globals": {
                    "jQuery":  true,
                    "console": true
                }
            }
        }
    };
    grunt.initConfig(taskConfig);
    grunt.registerTask('default', ['jshint']);
};
