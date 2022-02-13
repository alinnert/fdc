# Fonto Dev Companion

This is a web based UI that helps you configure XML schemas for FontoXML.

It scans `.xsd` files for element definitions and tells you if there are any `configureAs*()` calls or `insert_contextual-*` operations for each of them.

## System requirements

- [ripgrep](https://github.com/BurntSushi/ripgrep) must be installed and in your `PATH` variable. It must be callable by `rg`. Only version 13.0.0 has been tested so far.

## Install

```
npm i -g @alinnert/fdc
```

## Usage

Run the command `fdc` in your project directory.
