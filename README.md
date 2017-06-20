# build a single add:

cd to directory:
```
site/source/*name*/160x600
```
#### build and test
```sh
$ gulp serve
```
changes will be watched

# building and packaging all ads:

**Dependencies:** 7zip

#### version
```sh
$ npm run version
 ```
#### build
```sh
$ npm run build -- v1.0.0
```

#### Serve or FTP
```sh
$ npm run ftp && npm run serve
```
#### .secret.json
```json
{
	"host": "tbg.l2.design",
	"user": "",
	"pass": "",
	"remotePath": "/tbg.l2.design/"
}
```
see gulpfile and package.json for npm scripts and gulp tasks