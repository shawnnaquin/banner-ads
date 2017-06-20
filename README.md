# SETUP

_

#### .secret.json
```json
{
    "host": "tbg.l2.design",
    "user": "**,
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
		"./source/somename/2nd-type/300x250/"
	]
},
```

#### sizmek template
copy a past ad into ad directories
be sure to check which was the last ad to find the most current project template
also check against sizmek template to see if any changes have been made to the sizmek API
```
"./source/somename/1st-type/160x600/",
```
#### gulpfile
Change the project name in `gulpfile.js`

```javascript
var	projectName = 'somename';
```
_

# SINGLE AD - BUILD/TEST 
changes will be watched
```sh
$ cd "./source/somename/1st-type/160x600
$ gulp serve
```

_

# ALL ADS - BUILD/TEST
Always check `gulpfile.js` and `package.json` for the latest **npm scripts** and **gulp tasks**

#### versioning
run the version command **before** building
```sh
$ npm run version
 ```
#### building
a few differnt options exist for building, always check `package.json` scripts for the latest

```json
all: 
    clean, build, zip, rename

allftp:
    all, cleanremote, & ftp

allserve: 
    all, serve (no ftp)
```