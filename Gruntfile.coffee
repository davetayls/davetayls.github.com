'use strict'
module.exports = (grunt) ->

  # load all grunt tasks
  require('load-grunt-tasks')(grunt)

  # show elapsed time at the end
  require('time-grunt') grunt

  # configurable paths
  grunt.initConfig
#    pkg: require('./package.json')
#    bower: require('./bower.json')

    ###
    File watching related
    ###
    watch:
      options:
        interrupt: true

      css:
        files: ['_site/bundle/index.css']
        options:
          livereload: true

    ###
    Release management
    ###
    imagemin:
      content:
        files: [
          expand: true
          cwd: 'content'
          src: '{,*/}*.{png,jpg,jpeg}'
          dest: 'content'
        ]

    svgmin:
      content:
        files:
          expand: true
          cwd: 'content'
          src: '*.svg'
          dest: 'content'

    exec:
      jekyll:
        cmd: 'jekyll serve -w'

    concurrent:
      dev:
        options:
          logConcurrentOutput: true
        tasks: [
          'exec:jekyll'
          'watch'
        ]


  ###
  Tasks
  ###
  grunt.registerTask 'dev', [
    'concurrent:dev'
  ]

  grunt.registerTask 'default', ['dev']


