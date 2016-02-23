Computer Science Department

T-427-WEPO - Web Programming II - Programming assignment 2

----

![RU logo](http://www.ru.is/skin/basic9k/i/sitelogo.png)

# Angular Chat App

## Team members

##### Kristinn Heiðar Freysteinsson
<kristinnf13@ru.is>
##### Sturla Halldórsson
<sturlah13@ru.is>

----

## Info

#### Browsers
The latest version of Google Chrome was used throughtout development.
We also used the latest version of Firefox for a few tests and the chatApp runs on both browsers.
Internet Explorer 11 also seemed to work but it wasn't used during development.

#### Minification & JSHint
We decided to use [gulp](http://gulpjs.com/) to run JSHint and there's a .jshintrc file included that contains the options (settings) provided on MySchool.
The 'default' task runs two other tasks, 'css' for minifying the css that we added and 'js' that runs all the project's .js files through JSHint and then minifies and concatenates them into one file.
Both tasks save their minified (and concatenated) files in the build folder. Those files are the ones included in the index.html.

#### Build
We presume that both [node.js](https://nodejs.org/en/download/) and [bower](http://bower.io/) are installed, and that the chatserver is already set up and running.

After un-zipping (decompressing) the zip file that contains the client you need to run the following commands from the 'client/' folder:
```
npm install
bower install
gulp
```
And then start up a http-server. There're a few ways to do that but we mainly used this python command:
```
python -m SimpleHTTPServer
```

#### Entry point
The index.html file is located in the client folder (mainly because Daníel Brandur did that in a lecture). We also felt that it simplified the entry point url.

For both Chrome and Firefox you type in: `http://localhost:8000/#/`

And for Internet Explorer you type in: `http://127.0.0.1:8000/#/`

#### Other notes
The full versions of the bower_components files (angular, angular_route, etc.) included in the index.html were used while developing and debugging. Links to the minified versions are in the index.html file but they're commented out. We decided to hand in the assignment with the full versions.

Using both npm and bower to install all the dependencies was mainly due to a misunderstanding of how the tools worked.
It will be fixed in later versions!
