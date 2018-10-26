# software-engineering-lab

## Installation

Refer to https://nodejs.org/en/, https://www.meteor.com/install, https://git-scm.com/downloads

### macOS

Install [Homebrew](https://brew.sh/), which is a popular open-source package manager for macOS.

Next, use Homebrew in the terminal to download Node.

```
brew install node
```

Now download Meteor as recommended on the install page linked above. For comfort, you can try `node -v` and `meteor --version`.

The environment is ready to go, so use Git to clone this repository, syncing up automatically.

```
git clone https://github.com/rbergin-scu/software-engineering-lab.git
cd software-engineering-lab
```

Now you can simply start Meteor:

```
meteor
```


## Dependencies

### [Meteor](https://www.meteor.com/)

Meteor is a JavaScript web application framework. It handles routing, databases, viewing, security, and everything else on the server side of things.

### [React](https://reactjs.org/)

React is a JavaScript library that provides an object-oriented system for constructing view pages. It also includes a special language called JSX, which allows you to write JavaScript directly embedded into HTML in addition to constructing JavaScript objects that represent visual elements.

### [Bootstrap](https://getbootstrap.com/)

Bootstrap is a CSS and JS file that provide lots of well-designed common UI elements, like Navbars and Buttons. The markup is standards-compliant and (mostly) abides by accessibility standards. The stylesheet leverages flexbox for structuring the webpage via rows and columns.

### [Reactstrap](https://reactstrap.github.io/)

Reactstrap is a Nodejs package that contains React models for Bootstrap 4 components like Cards and Navbars. Its primary function is to make it so we do not need to re-write BS4 components into JSX ourselves, which will be messier code.
