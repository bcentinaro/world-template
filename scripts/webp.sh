#!/bin/sh
find ./assets -iname '*.jpg' -exec rm {}.webp \; 
find ./assets -iname '*.png' -exec rm {}.webp \; 
find ./assets -iname '*.jpg' -exec cwebp {} -q 100 -o {}.webp \;
find ./assets -iname '*.png' -exec cwebp {} -q 100 -o {}.webp \;
