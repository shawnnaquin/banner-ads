#! /bin/bash

cd build
rm ./zip/*.zip

version=""

if [ "$1" != "" ]; then
    version="-$1"
fi

for DIRECTORY in */; do
	if [ "$DIRECTORY" != "zip/" ] && [ "$DIRECTORY" != "index-assets/" ]; then
	    7z a -tzip "./zip/all-ads$version.zip" "$DIRECTORY"
		7z a -tzip "./zip/${DIRECTORY%/}$version.zip" "$DIRECTORY"
	fi
done