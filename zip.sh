#! /bin/bash

cd build
rm ./zip/*.zip

mkdir ./zip

#! version=""

#! if [ "$1" != "" ]; then
#!   version="-$1"
#! fi

for DIRECTORY in */; do
	if [ "$DIRECTORY" != "zip/" ] && [ "$DIRECTORY" != "index-assets/" ]; then
		#! 7z a -tzip with any -mx="*" didn't upload to sizmek :(
	    #! zip -r -X "./zip/all-ads$version.zip" "$DIRECTORY"
		#! zip -r -X "./zip/${DIRECTORY%/}$version.zip" "$DIRECTORY"
		zip -r -X "./zip/all-ads.zip" "$DIRECTORY"
		zip -r -X "./zip/${DIRECTORY%/}.zip" "$DIRECTORY"
	fi
done