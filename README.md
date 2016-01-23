# conference-app

[![Circle CI](https://circleci.com/gh/dpiatek/conference-app/tree/master.svg?style=svg)](https://circleci.com/gh/dpiatek/conference-app/tree/master)

List conferences and register your interest.

[App Link](https://blistering-fire-6946.firebaseapp.com/) (you will need a user to login, but that is not yet supported in app).

Uses [Firebase](firebase.com) for auth and backend, [Redux](http://redux.js.org/) and [React](https://facebook.github.io/react/) for the front end.

## Developing

See the [package.json](https://github.com/dpiatek/conference-app/blob/master/package.json#L9) for development scripts.

### Deployment

Deploys are automated thanks to [CircleCI](circleci.com). A passing build will deploy the app.

### Dev tools

The dev server is the webpack-dev-server running in [inline mode](https://webpack.github.io/docs/webpack-dev-server.html#inline-mode) with hot reloading. Redux [dev-tools](https://github.com/gaearon/redux-devtools) are also included. Press `ctrl-h` to show them, `ctrl-q` to switch the dock position.

### Roadmap

https://trello.com/b/LXDqhFBG/conference-app

### License

The MIT License (MIT)
Copyright (c) 2016 Dominik Piatek

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
