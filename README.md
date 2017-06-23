# SETUP

_

#### .secret.json

- create the file `.secret.json` in the root directory for ftp access

```json
{
    "host": "tbg.l2.design",
    "user": "**",
    "pass": "**",
    "remotePath": "/tbg.l2.design/somename/"
}
```

#### projects.json
- Add a project or change the `projects.json` if starting new ads
- Be sure to actually create the directories

```json
"somename": {
	"somename-version": "1.0.0",
	"directory": "./source/somename/",
	"index": "somename.html",
	"files": [
		"./source/somename/1st-type/160x600/",
		"./source/somename/1st-type/300x250/",
		"./source/somename/2nd-type/160x600/",
		"./source/somename/2nd-type/300x600/"
	]
},

```

#### gulpfile
Change the project name in `./gulpfile.js`

```javascript
var	projectName = 'somename';
```
_

# SIZMEK TEMPLATE

#### copy markup

- copy and paste an ad into ad directories
- be sure to check which was the last ad to find the most current project template
- also check against sizmek template to see if any changes have been made to the sizmek API

```
"./source/somename/1st-type/300x600/",
```

#### individual gulpfiles

- each ad comes with it's own `gulpfile.js`.
- find and replace the target build directory line (in each individual ad's directory):
- depending on your structure (if you have 'types' or not) the build directory might be one more up or down in the nav tree

```javascript
build = '../../../../build/somename-1stttype-300x600-build/',
```

#### enabling extras

- you may want to enable, css/js maps, linters, beautify the output, uncollapse whitspace, etc,
- find and uncomment the lines in each ad's individual `gulpfile.js`
- be sure to comment them back when building for production!

#### building the landing page

also refactor `./source/somename/somename.html` (the landing page) 

- specified in `projects.json` 
- the assets for this landing page can be found in `./build/index-assets/`
- `./source/somename/somename.html` will be copied and renamed to `./build/index.html`
- serving an individual ad or build all ads will perform this tasks

to ftp only the index

```sh
$ npm run ftpIndex
```

example markup for landing page:
(be sure to keep the `<!-- inject-->` line before the `</body>` tag)


```html 
    <div class="list">

        <div class="group">
            <h1>Some Name - 1st Type</h1>

            <ul>

                <!-- item -->
                <li>
                    <a href="somename-1sttype-300x600-build/index.html" target="_blank">
                        Some Name - 1st Type - 300x600
                    </a>
                </li>

                <li>
                    <a href="http://.../really_long_sizmek_link/" target="_blank">
                      44990085 <!-- sizmek id -->
                    </a>
                </li>
            </ul>
        </div>

        <div class="group">
            <h1>Some Name - 2nd Type</h1>
            ...
        </div>
    </div>

        ...
        <!-- inject -->

    </body>
```
_

# SINGLE AD - BUILD/TEST

changes will be watched and served from `./build/`

```sh
$ cd "./source/somename/1st-type/300x600"
$ gulp serve
```

- images are NOT watched on change
- if you add or change an image you must kill the serve task and rerun `gulp serve`
- the images are then moved to your individual ad's build directory `./build/somename-1sttype-300x600-build/images/**`

_

# ALL ADS - BUILD/TEST

- Always check `gulpfile.js` for latest gulp tasks
- Always check `package.json` for the latest npm scripts
- All `gulpfile.js` tasks have a npm script alias
- `package.json` npm scripts combine several gulp and npm scripts to create various build tasks
- sometimes individual gulp tasks come in handy
- you will usually build via npm scripts

#### versioning

```sh
$ npm run version
 ```

 - run the version command **before** building
 - the zip version will be replaced in `./build/index.html`
 - the zip version is automatically injected javascript line when you build via one of the below commands

#### building

- a few different options exist for building
- always check `package.json` scripts for the latest

```sh
$ npm run all
$ npm run allftp
$ npm run allserve
 ```

```
all:
    clean, build, zip, rename

allftp:
    all, cleanremote, & ftp

allserve:
    all, serve (no ftp)
```

#### custom building

- it is possible to manipulate the build process by combining or using any other combination of npm scripts and gulp tasks to accomplish almost anything you need to do
- if you alter the npm scripts, gulp tasks or project structure please update the readme!
- see Shawn for further information
- happy building!

