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
        nospawn: false
        debounceDelay: 1000
        interval: 500
        interrupt: true

      stylus:
        files: ['_stylus/**/*.styl', 'components/**/*.styl']
        tasks: ['stylus']

#    jshint:
#      options:
#        jshintrc: '.jshintrc'
#      all: [
#        'Gruntfile.js'
#        '<%= yeoman.app %>/scripts/**/*.js'
#      ]

    ###
    Styles
    ###
    stylus:
      dist:
        options:
          compress: false
          linenos: true
          paths: [
            '_stylus'
            '_stylus/components'
            '_stylus/blocks'
            'lib'
            'node_modules/nib/lib'
          ]
        files:
          'css/core.css': '_stylus/index.styl'
          'css/brand.css': '_stylus/brand.styl'

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

    # Generates a custom Modernizr build that includes only the tests you
    # reference in your app
#    modernizr:
#      devFile: "<%= yeoman.app %>/bower_components/modernizr/modernizr.js"
#      outputFile: "<%= yeoman.dist %>/bower_components/modernizr/modernizr.js"
#      files: ["<%= yeoman.dist %>/scripts/{,*/}*.js", "<%= yeoman.dist %>/styles/{,*/}*.css", "!<%= yeoman.dist %>/scripts/vendor/*"]
#      uglify: true

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
    'stylus:dist'
    'concurrent:dev'
  ]

  grunt.registerTask 'default', ['dev']


