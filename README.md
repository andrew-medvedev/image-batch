# Batch images resizing [NO NATIVE DEPENDENCIES NEEDED]
[![Build Status](https://travis-ci.org/andrew-medvedev/image-batch.svg?branch=master)](https://travis-ci.org/andrew-medvedev/image-batch)

Easy module for resizing of large amount of images

Powered by [Jimp](https://www.npmjs.com/package/jimp) which does not require any native dependencies

Just use
```bash
image-batch -D path/to/images --resize 50% --postfix m
```

## Motivation

Need to resize huge amount of images.

For example here is directory with big amount of device mockups of different image types:

    iphone_6.png
    iphone_6_gold.jpg
    iphone_mockup.jpg
    mockup_htc_8.png
    galaxy-note-4-psd-mockup.png

The task: Produce iPhone mockups of 3 types(100% size with -l postfix, 50% size with -m postfix and 25% size with -s postfix) and png format.

Here is how to get things done with `image-batch`:
Let's create 100% size mockups for beginning:
```bash
image-batch -D path/to/mockups --name iphone% --resize 100% --save-as png --postfix l
```
Now our directory look like this:

    iphone_6.png
    iphone_6_gold.jpg
    iphone_mockup.jpg
    iphone_6-l.png
    iphone_6_gold-l.png
    iphone_mockup-l.png
    mockup_htc_8.png
    galaxy-note-4-psd-mockup.png

Next we need 50% size mockups:
```bash
image-batch -D path/to/mockups --name iphone% --no-name iphone%-l --resize 50% --save-as png --postfix m
```

And 25% size:
```bash
image-batch -D path/to/mockups --name iphone% --no-name iphone%-l,iphone%-m --resize 25% --save-as png --postfix s --remove-original
```

Here is how our directory should look like on finish:

    iphone_6-l.png
    iphone_6_gold-l.png
    iphone_mockup-l.png
    iphone_6-m.png
    iphone_6_gold-m.png
    iphone_mockup-m.png
    iphone_6-s.png
    iphone_6_gold-s.png
    iphone_mockup-s.png
    mockup_htc_8.png
    galaxy-note-4-psd-mockup.png

## Installation

```bash
npm install -g image-batch
```

## Usage

```bash
image-batch --help
```

```bash
Usage: image-batch [options]

Options:
 -V, --version          Prints version
 -H, --help             Prints this message

 -R, --resize           Set resize query
 -D, --directory                Set base directory where images are
 -N, --name             Filename search pattern. Can be listed with comma
 -NN, --no-name         Filename excluding pattern. Can be listed with comma
 -OF, --only-format             Set exclusive image format to process
 -WOF, --without-format         Set image format that will be not processed
 -P, --postfix          Set name postfix for output files
 -F, --formats          Set exclusive list of formats separated by commas
 -S, --save-as          Set format for output files
 -REMOVE, --remove-original             Set remove original files flag
```