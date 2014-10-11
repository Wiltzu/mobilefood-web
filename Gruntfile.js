
module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({

      // Task configuration
      concat: {
         options: {
           separator: ';',
         },
         js_frontend: {
           src: [
             './bower_components/jquery/jquery.js',
             './bower_components/bootstrap/dist/js/bootstrap.js',
             './app/assets/javascript/app.js'
           ],
           dest: './public/assets/javascript/app.js',
         },
      },
      less: {
        development: {
            options: {
              compress: true,  //minifying the result
            },
            files: {
              "./public/assets/stylesheets/app.css":"./app/assets/stylesheets/app.less",
            }
        }
      },
      uglify: {
        options: {
          mangle: false  // Use if you want the names of your functions and variables unchanged
        },
        frontend: {
          files: {
            './public/assets/javascript/app.js': './public/assets/javascript/app.js',
          }
        },
      },
      watch: {
        js_frontend: {
          files: [
            //watched files
            './bower_components/jquery/jquery.js',
            './bower_components/bootstrap/dist/js/bootstrap.js',
            './app/assets/javascript/app.js'
            ],
          tasks: ['concat:js_frontend','uglify:frontend'],     //tasks to run
          options: {
            livereload: true                        //reloads the browser
          }
        },
        less: {
          files: ['./app/assets/stylesheets/*.less'],  //watched files
          tasks: ['less'],                          //tasks to run
          options: {
            livereload: true                        //reloads the browser
          }
        }
      }
    });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Task definition
  grunt.registerTask('default', ['watch']);
};
