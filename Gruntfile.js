module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        concat: {
            js: {
                src: ['src/*.js'],
                dest: 'dist/scroll.min.js'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/scroll.min.js': ['dist/scroll.min.js']
                }
            },
            options: {
                report: 'gzip'
            }
        },
        watch: {
            files: ['src/*'],
            tasks: ['concat', 'uglify']
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'src/*.js',
                'tests/specs/*Spec.js'
            ],
            options: {
                expr: true,
                node: true
            }
        },
        jasmine: {
            src: [
                'src/**/*.js'
            ],
            options: {
                specs: 'tests/specs/*Spec.js',
                vendor: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
                ],
                styles: 'src/**/*.css',
                outfile: 'tests/SpecRunner.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('test', ['jshint', 'jasmine']);
};