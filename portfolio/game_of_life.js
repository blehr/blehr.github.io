"use strict";

var App = function App(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(Header, null),
    React.createElement(GameBoard, null)
  );
};

var randomNumberArray = [];
var possibleNumbersArray = [];

var randomNumber = function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var fillRandomNumberArray = function fillRandomNumberArray(x, min, max) {
  for (var i = 0; i < x; i++) {
    randomNumberArray.push(randomNumber(min, max));
  }
};

var fillPossibleNumbersArray = function fillPossibleNumbersArray(x) {
  for (var i = 1; i <= x; i++) {
    possibleNumbersArray.push(i);
  }
};

var init = function init() {
  fillRandomNumberArray(500, 1, 1500);
  fillPossibleNumbersArray(1500);
};

var Container = function Container(props) {
  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-sm-12" },
        props.children
      )
    )
  );
};

var Header = function Header(props) {
  return React.createElement(
    "div",
    { className: "text-center gol-header" },
    React.createElement(
      "h1",
      null,
      
      React.createElement(
        "small",
        null,
        "Conway's Game of Life ",
        React.createElement(
          "small",
          null,
          React.createElement(
            "a",
            { href: "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life", title: "Game of Life?", target: "_blank", "data-toggle": "tooltip" },
            React.createElement("span", { className: "glyphicon glyphicon-question-sign" })
          )
        )
      )
    ),
    
    React.createElement("hr", null)
  );
};

var Block = React.createClass({
  displayName: "Block",
  handleClick: function handleClick() {
    this.props.isAlive === true ? this.props.onMakeDead(this.props.id) : this.props.onMakeAlive(this.props.id);
  },
  render: function render() {
    return React.createElement("div", { className: this.props.isBaby === true ? "block baby" : this.props.isAlive === true ? "block alive" : "block",
      id: this.props.id,
      onClick: this.handleClick });
  }
});

var ControlPanel = function ControlPanel(props) {
  return React.createElement(
    "div",
    { className: "control-panel btn-group btn-group-justified btn-group-sm" },
    React.createElement(Button, { text: "", "class": "btn btn-default", title: "start", spanClass: "glyphicon glyphicon-play", handleClick: props.startGame }),
    React.createElement(Button, { text: "", "class": "btn btn-default", title: "pause", spanClass: "glyphicon glyphicon-pause", handleClick: props.pauseGame }),
    React.createElement(Button, { text: "", "class": "btn btn-default", title: "clear game", spanClass: "glyphicon glyphicon-remove", handleClick: props.clearGame }),
    React.createElement(Badge, { text: props.generation, "class": "btn btn-default" }),
    React.createElement(Button, { text: "", "class": props.speed === 800 ? "btn btn-default active" : "btn btn-default", title: "slow", spanClass: "glyphicon glyphicon-minus", handleClick: props.slow }),
    React.createElement(Button, { text: "", "class": props.speed === 200 ? "btn btn-default active" : "btn btn-default", title: "fast", spanClass: "glyphicon glyphicon-plus", handleClick: props.fast })
  );
};

var Button = React.createClass({
  displayName: "Button",
  componentDidMount: function componentDidMount() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip({ container: "body", trigger: "hover" });
    });
  },
  render: function render() {
    return React.createElement(
      "a",
      { href: "#", title: this.props.title, className: this.props.class, onClick: this.props.handleClick, "data-toggle": "tooltip" },
      this.props.text,
      React.createElement("span", { className: this.props.spanClass })
    );
  }
});

var Badge = React.createClass({
  displayName: "Badge",
  render: function render() {
    return React.createElement(
      "a",
      { href: "#", className: "btn btn-default" },
      React.createElement(
        "span",
        { className: "badge" },
        this.props.text
      )
    );
  }
});

var GameBoard = React.createClass({
  displayName: "GameBoard",
  getInitialState: function getInitialState() {
    return {
      alive: [],
      baby: [],
      speed: 200,
      generation: 0
    };
  },
  componentDidMount: function componentDidMount() {
    init();
    this.setState({
      alive: randomNumberArray
    });
    this.generationInterval = null;
    this.startGame();
  },
  checkAlive: function checkAlive(block) {
    return this.state.alive.indexOf(block) === -1 ? false : true;
  },
  checkBaby: function checkBaby(block) {
    return this.state.baby.indexOf(block) === -1 ? false : true;
  },
  pauseGame: function pauseGame() {
    clearInterval(this.generationInterval);
    this.generationInterval = null;
  },
  startGame: function startGame() {
    if (this.generationInterval !== null) return;
    this.generationInterval = setInterval(this.checkLifeChange, this.state.speed);
  },
  clearGame: function clearGame() {
    this.setState({
      alive: [],
      baby: [],
      generation: 0
    });
  },
  makeAlive: function makeAlive(id) {
    this.setState({
      alive: this.state.alive.concat([id]),
      baby: this.state.baby.concat([id])
    });
  },
  makeDead: function makeDead(id) {
    var index = this.state.alive.indexOf(id);
    this.state.alive.splice(index, 1);
    this.setState({
      alive: this.state.alive
    });
  },
  speedFast: function speedFast() {
    this.pauseGame();
    this.setState({
      speed: 200
    });
    setTimeout(this.startGame, 200);
  },
  speedSlow: function speedSlow() {
    this.pauseGame();
    this.setState({
      speed: 800
    });
    setTimeout(this.startGame, 600);
  },
  checkLifeChange: function checkLifeChange() {
    if (this.state.alive.length === 0) this.pauseGame();
    var nextGenerationArray = [];
    var babyArray = [];
    for (var i = 1; i < 1501; i++) {
      var alive = false;
      var lifePoints = 0;
      if (this.checkAlive(i)) {
        alive = true;
      }
      if (this.checkAlive(possibleNumbersArray.slice(i - 2, i - 1)[0])) lifePoints++;
      if (this.checkAlive(possibleNumbersArray.slice(i, i + 1)[0])) lifePoints++;
      if (this.checkAlive(possibleNumbersArray.slice(i - 52, i - 51)[0])) lifePoints++;
      if (this.checkAlive(possibleNumbersArray.slice(i - 51, i - 50)[0])) lifePoints++;
      if (this.checkAlive(possibleNumbersArray.slice(i - 50, i - 49)[0])) lifePoints++;
      if (this.checkAlive(possibleNumbersArray.slice(i + 50, i + 51)[0])) lifePoints++;
      if (this.checkAlive(possibleNumbersArray.slice(i + 49, i + 50)[0])) lifePoints++;
      if (this.checkAlive(possibleNumbersArray.slice(i + 48, i + 49)[0])) lifePoints++;
      if (alive === true && lifePoints === 2) nextGenerationArray.push(i);
      if (alive === true && lifePoints === 3) nextGenerationArray.push(i);
      if (alive === false && lifePoints === 3) {
        nextGenerationArray.push(i);babyArray.push(i);
      }
    }
    this.setState({
      alive: nextGenerationArray,
      baby: babyArray,
      generation: this.state.generation + 1
    });
  },
  render: function render() {
    var blockArray = [];
    for (var i = 1; i < 1501; i++) {
      blockArray.push(React.createElement(Block, { key: i, id: i, isAlive: this.checkAlive(i), isBaby: this.checkBaby(i), onMakeAlive: this.makeAlive, onMakeDead: this.makeDead }));
    }
    return React.createElement(
      "div",
      null,
      React.createElement(ControlPanel, { generation: this.state.generation, pauseGame: this.pauseGame, startGame: this.startGame, clearGame: this.clearGame, fast: this.speedFast, slow: this.speedSlow, speed: this.state.speed }),
      React.createElement(
        "div",
        { className: "game-board" },
        blockArray
      )
    );
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));