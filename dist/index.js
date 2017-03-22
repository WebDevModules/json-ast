(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.index = mod.exports;
  }
})(this, function (module) {
  'use strict';

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _nodeTypeObjectMappin;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var nodeTypes = {
    DOCUMENT: 'document',
    COMMENT: 'comment',
    OBJECT: 'object',
    PROPERTY: 'property',
    KEY: 'key',
    ARRAY: 'array',
    VALUE: 'value',
    STRING: 'string',
    NUMBER: 'number',
    TRUE: 'true',
    FALSE: 'false',
    NULL: 'null',
    ERROR: 'error'
  };

  // All elements in the tree will extend the `JsonNode` base class

  var JsonNode = function () {
    function JsonNode() {
      var _type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : nodeTypes.ERROR;

      _classCallCheck(this, JsonNode);

      this._type = _type || nodeTypes.ERROR;
      this._position = null;
    }

    _createClass(JsonNode, [{
      key: 'accept',
      value: function accept(visitor) {
        visitor.visit(this);
      }
    }, {
      key: 'type',
      get: function get() {
        return this._type;
      }
    }, {
      key: 'position',
      set: function set(_pos) {
        this._position = _pos || null;
      },
      get: function get() {
        return this._position;
      }
    }], [{
      key: 'toObject',
      value: function toObject(jsonNode) {
        return JSON.parse(JSON.stringify(jsonNode));
      }
    }, {
      key: 'toString',
      value: function toString(jsonNode) {
        return JSON.stringify(jsonNode);
      }
    }, {
      key: 'toJSON',
      value: function toJSON(jsonNode) {
        return _toJSON(jsonNode);
      }
    }]);

    return JsonNode;
  }();

  ;

  var JsonDocument = function (_JsonNode) {
    _inherits(JsonDocument, _JsonNode);

    function JsonDocument() {
      _classCallCheck(this, JsonDocument);

      var _this = _possibleConstructorReturn(this, (JsonDocument.__proto__ || Object.getPrototypeOf(JsonDocument)).call(this, nodeTypes.DOCUMENT));

      _this._child = null;
      _this._comments = [];
      return _this;
    }

    _createClass(JsonDocument, [{
      key: 'child',
      set: function set(_child) {
        this._child = _child;
      },
      get: function get() {
        return this._child;
      }
    }, {
      key: 'comments',
      get: function get() {
        return this._comments;
      }
    }]);

    return JsonDocument;
  }(JsonNode);

  ;

  var JsonObject = function (_JsonNode2) {
    _inherits(JsonObject, _JsonNode2);

    function JsonObject() {
      _classCallCheck(this, JsonObject);

      var _this2 = _possibleConstructorReturn(this, (JsonObject.__proto__ || Object.getPrototypeOf(JsonObject)).call(this, nodeTypes.OBJECT));

      _this2._properties = [];
      _this2._comments = [];
      return _this2;
    }

    _createClass(JsonObject, [{
      key: 'properties',
      get: function get() {
        return this._properties;
      }
    }, {
      key: 'comments',
      get: function get() {
        return this._comments;
      }
    }]);

    return JsonObject;
  }(JsonNode);

  ;

  var JsonProperty = function (_JsonNode3) {
    _inherits(JsonProperty, _JsonNode3);

    function JsonProperty() {
      _classCallCheck(this, JsonProperty);

      var _this3 = _possibleConstructorReturn(this, (JsonProperty.__proto__ || Object.getPrototypeOf(JsonProperty)).call(this, nodeTypes.PROPERTY));

      _this3._key = null;
      _this3._value = null;
      return _this3;
    }

    _createClass(JsonProperty, [{
      key: 'key',
      get: function get() {
        return this._key;
      },
      set: function set(_key) {
        this._key = _key;
      }
    }, {
      key: 'value',
      get: function get() {
        return this._value;
      },
      set: function set(_value) {
        this._value = _value;
      }
    }]);

    return JsonProperty;
  }(JsonNode);

  ;

  var JsonArray = function (_JsonNode4) {
    _inherits(JsonArray, _JsonNode4);

    function JsonArray() {
      _classCallCheck(this, JsonArray);

      var _this4 = _possibleConstructorReturn(this, (JsonArray.__proto__ || Object.getPrototypeOf(JsonArray)).call(this, nodeTypes.ARRAY));

      _this4._items = [];
      _this4._comments = [];
      return _this4;
    }

    _createClass(JsonArray, [{
      key: 'items',
      get: function get() {
        return this._items;
      }
    }, {
      key: 'comments',
      get: function get() {
        return this._comments;
      }
    }]);

    return JsonArray;
  }(JsonNode);

  ;

  var JsonValue = function (_JsonNode5) {
    _inherits(JsonValue, _JsonNode5);

    function JsonValue() {
      var _value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var _type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : nodeTypes.VALUE;

      _classCallCheck(this, JsonValue);

      var _this5 = _possibleConstructorReturn(this, (JsonValue.__proto__ || Object.getPrototypeOf(JsonValue)).call(this, _type));

      _this5._value = _value;
      return _this5;
    }

    _createClass(JsonValue, [{
      key: 'value',
      get: function get() {
        return this._value;
      },
      set: function set(_value) {
        this._value = _value;
      }
    }]);

    return JsonValue;
  }(JsonNode);

  ;

  var JsonKey = function (_JsonValue) {
    _inherits(JsonKey, _JsonValue);

    function JsonKey() {
      var _value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _classCallCheck(this, JsonKey);

      return _possibleConstructorReturn(this, (JsonKey.__proto__ || Object.getPrototypeOf(JsonKey)).call(this, _value, nodeTypes.KEY));
    }

    return JsonKey;
  }(JsonValue);

  ;

  var JsonComment = function (_JsonValue2) {
    _inherits(JsonComment, _JsonValue2);

    function JsonComment() {
      var _value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _classCallCheck(this, JsonComment);

      return _possibleConstructorReturn(this, (JsonComment.__proto__ || Object.getPrototypeOf(JsonComment)).call(this, _value, nodeTypes.COMMENT));
    }

    return JsonComment;
  }(JsonValue);

  ;

  var JsonString = function (_JsonValue3) {
    _inherits(JsonString, _JsonValue3);

    function JsonString() {
      var _value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _classCallCheck(this, JsonString);

      return _possibleConstructorReturn(this, (JsonString.__proto__ || Object.getPrototypeOf(JsonString)).call(this, _value, nodeTypes.STRING));
    }

    return JsonString;
  }(JsonValue);

  ;

  var JsonNumber = function (_JsonValue4) {
    _inherits(JsonNumber, _JsonValue4);

    function JsonNumber() {
      var _value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _classCallCheck(this, JsonNumber);

      return _possibleConstructorReturn(this, (JsonNumber.__proto__ || Object.getPrototypeOf(JsonNumber)).call(this, _value, nodeTypes.NUMBER));
    }

    return JsonNumber;
  }(JsonValue);

  ;

  var JsonTrue = function (_JsonValue5) {
    _inherits(JsonTrue, _JsonValue5);

    function JsonTrue() {
      _classCallCheck(this, JsonTrue);

      return _possibleConstructorReturn(this, (JsonTrue.__proto__ || Object.getPrototypeOf(JsonTrue)).call(this, true, nodeTypes.TRUE));
    }

    return JsonTrue;
  }(JsonValue);

  ;

  var JsonFalse = function (_JsonValue6) {
    _inherits(JsonFalse, _JsonValue6);

    function JsonFalse() {
      _classCallCheck(this, JsonFalse);

      return _possibleConstructorReturn(this, (JsonFalse.__proto__ || Object.getPrototypeOf(JsonFalse)).call(this, false, nodeTypes.FALSE));
    }

    return JsonFalse;
  }(JsonValue);

  ;

  var JsonNull = function (_JsonValue7) {
    _inherits(JsonNull, _JsonValue7);

    function JsonNull() {
      _classCallCheck(this, JsonNull);

      return _possibleConstructorReturn(this, (JsonNull.__proto__ || Object.getPrototypeOf(JsonNull)).call(this, null, nodeTypes.NULL));
    }

    return JsonNull;
  }(JsonValue);

  ;

  var nodeTypeObjectMapping = (_nodeTypeObjectMappin = {}, _defineProperty(_nodeTypeObjectMappin, nodeTypes.DOCUMENT, JsonDocument), _defineProperty(_nodeTypeObjectMappin, nodeTypes.COMMENT, JsonComment), _defineProperty(_nodeTypeObjectMappin, nodeTypes.OBJECT, JsonObject), _defineProperty(_nodeTypeObjectMappin, nodeTypes.PROPERTY, JsonProperty), _defineProperty(_nodeTypeObjectMappin, nodeTypes.KEY, JsonKey), _defineProperty(_nodeTypeObjectMappin, nodeTypes.ARRAY, JsonArray), _defineProperty(_nodeTypeObjectMappin, nodeTypes.VALUE, JsonValue), _defineProperty(_nodeTypeObjectMappin, nodeTypes.STRING, JsonString), _defineProperty(_nodeTypeObjectMappin, nodeTypes.NUMBER, JsonNumber), _defineProperty(_nodeTypeObjectMappin, nodeTypes.TRUE, JsonTrue), _defineProperty(_nodeTypeObjectMappin, nodeTypes.FALSE, JsonFalse), _defineProperty(_nodeTypeObjectMappin, nodeTypes.NULL, JsonNull), _nodeTypeObjectMappin);

  //
  // Utility methods to construct the objects
  //

  var NodeFactory = function () {
    function NodeFactory() {
      _classCallCheck(this, NodeFactory);
    }

    _createClass(NodeFactory, null, [{
      key: 'fromType',
      value: function fromType(objectType) {
        var _value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var clazz = nodeTypeObjectMapping[objectType];
        if (clazz === null) throw new Error('AST node of type ' + objectType + ' cannot be found');
        return _value !== null ? new clazz(_value) : new clazz();
      }
    }]);

    return NodeFactory;
  }();

  function _toJSON(jsonNode) {
    if (!(jsonNode instanceof JsonNode)) throw new Error('JSON conversion only accepts a kind of JsonNode');

    // Just a recursive, slow implementation to a JavaScript object from this
    // JsonNode
    function recursiveNodeConversion(rootNode, parentObject) {
      var result = null;
      switch (rootNode.type) {
        case nodeTypes.DOCUMENT:
          return recursiveNodeConversion(rootNode.child);
        case nodeTypes.OBJECT:
          {
            result = {};
            rootNode.properties.forEach(function (propNode) {
              result[recursiveNodeConversion(propNode.key)] = recursiveNodeConversion(propNode.value);
            });
            return result;
          }
        case nodeTypes.ARRAY:
          {
            result = [];
            rootNode.items.forEach(function (itemNode) {
              result.push(recursiveNodeConversion(itemNode));
            });
            return result;
          }
        case nodeTypes.VALUE:
        case nodeTypes.STRING:
        case nodeTypes.KEY:
          return rootNode.value;
        case nodeTypes.NUMBER:
          {
            // typecast
            if (rootNode.value instanceof Number) return rootNode.value;
            return new Number(rootNode.value).valueOf();
          }
        case nodeTypes.TRUE:
          return true;
        case nodeTypes.FALSE:
          return false;
        case nodeTypes.NULL:
          return null;
        default:
          return undefined;
      }
    }

    return recursiveNodeConversion(jsonNode);
  }

  var Position = function () {
    function Position(startLine, startColumn, startChar, endLine, endColumn, endChar) {
      _classCallCheck(this, Position);

      this._start = { line: startLine, column: startColumn, char: startChar };
      this._end = { line: endLine, column: endColumn, char: endChar };
      this._human = startLine + ':' + startColumn + ' - ' + endLine + ':' + endColumn + ' [' + startChar + ':' + endChar + ']';
    }

    _createClass(Position, [{
      key: 'start',
      get: function get() {
        return this._start;
      }
    }, {
      key: 'end',
      get: function get() {
        return this._end;
      }
    }, {
      key: 'human',
      get: function get() {
        return this._human;
      }
    }]);

    return Position;
  }();

  ;

  function showCodeFragment(source, linePosition, columnPosition) {
    var lines = source.split(/\n|\r\n?|\f/);
    var line = lines[linePosition - 1];
    var marker = new Array(columnPosition).join(' ') + '^';

    return line + '\n' + marker;
  }

  var ParseError = function (_SyntaxError) {
    _inherits(ParseError, _SyntaxError);

    function ParseError(message, source, linePosition, columnPosition) {
      _classCallCheck(this, ParseError);

      var fullMessage = linePosition ? message + '\n' + showCodeFragment(source, linePosition, columnPosition) : message;

      var _this13 = _possibleConstructorReturn(this, (ParseError.__proto__ || Object.getPrototypeOf(ParseError)).call(this, fullMessage));

      _this13.rawMessage = message;
      return _this13;
    }

    return ParseError;
  }(SyntaxError);

  function error(message, source, line, column) {
    throw new ParseError(message, source, line, column);
  }

  var parseErrorTypes = {
    unexpectedEnd: function unexpectedEnd() {
      return 'Unexpected end of JSON input';
    },
    unexpectedToken: function unexpectedToken(token, line, column) {
      return 'Unexpected token <' + token + '> at ' + line + ':' + column;
    }
  };

  var tokenizeErrorTypes = {
    cannotTokenizeSymbol: function cannotTokenizeSymbol(symbol, line, column) {
      return 'Cannot tokenize symbol <' + symbol + '> at ' + line + ':' + column;
    }
  };

  var tokenTypes = {
    COMMENT: 'COMMENT', // // ... \n\r? or /* ... */
    LEFT_BRACE: 'LEFT_BRACE', // {
    RIGHT_BRACE: 'RIGHT_BRACE', // }
    LEFT_BRACKET: 'LEFT_BRACKET', // [
    RIGHT_BRACKET: 'RIGHT_BRACKET', // ]
    COLON: 'COLON', // :
    COMMA: 'COMMA', // ,
    STRING: 'STRING', //
    NUMBER: 'NUMBER', //
    TRUE: 'TRUE', // true
    FALSE: 'FALSE', // false
    NULL: 'NULL', // null
    IDENTIFIER: 'IDENTIFIER' };

  var charTokens = {
    '{': tokenTypes.LEFT_BRACE,
    '}': tokenTypes.RIGHT_BRACE,
    '[': tokenTypes.LEFT_BRACKET,
    ']': tokenTypes.RIGHT_BRACKET,
    ':': tokenTypes.COLON,
    ',': tokenTypes.COMMA
  };

  var keywordsTokens = {
    'true': tokenTypes.TRUE,
    'false': tokenTypes.FALSE,
    'null': tokenTypes.NULL
  };

  var stringStates = {
    _START_: 0,
    START_QUOTE_OR_CHAR: 1,
    ESCAPE: 2
  };

  var escapes = {
    '"': 0, // Quotation mask
    '\\': 1, // Reverse solidus
    '/': 2, // Solidus
    'b': 3, // Backspace
    'f': 4, // Form feed
    'n': 5, // New line
    'r': 6, // Carriage return
    't': 7, // Horizontal tab
    'u': 8 // 4 hexadecimal digits
  };
  // Support regex
  ['d', 'D', 'w', 'W', 's', 'S'].forEach(function (d, i) {
    escapes[d] = i;
  });

  var numberStates = {
    _START_: 0,
    MINUS: 1,
    ZERO: 2,
    DIGIT: 3,
    POINT: 4,
    DIGIT_FRACTION: 5,
    EXP: 6,
    EXP_DIGIT_OR_SIGN: 7
  };

  // HELPERS

  function isDigit1to9(char) {
    return char >= '1' && char <= '9';
  }

  function isDigit(char) {
    return char >= '0' && char <= '9';
  }

  function isLetter(char) {
    return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z';
  }

  function isHex(char) {
    return isDigit(char) || char >= 'a' && char <= 'f' || char >= 'A' && char <= 'F';
  }

  function isExp(char) {
    return char === 'e' || char === 'E';
  }

  // PARSERS

  function parseWhitespace(source, index, line, column) {
    var char = source.charAt(index);

    if (char === '\r') {
      // CR (Unix)
      index++;
      line++;
      column = 1;
      if (source.charAt(index + 1) === '\n') {
        // CRLF (Windows)
        index++;
      }
    } else if (char === '\n') {
      // LF (MacOS)
      index++;
      line++;
      column = 1;
    } else if (char === '\t' || char === ' ') {
      index++;
      column++;
    } else {
      return null;
    }

    return { index: index, line: line, column: column };
  }

  function parseComment(source, index, line, column) {
    var char = source.charAt(index);
    if (char === '/') {
      var next_char = source.charAt(index + 1) || '';
      if ('/' === next_char) {
        // Unroll until the end of the line
        var first_index = index + 2,
            last_index = index + 2;
        index += 2;
        while (index < source.length) {
          char = source.charAt(index);
          if (char === '\r') {
            last_index = index;
            index++;
            line++;
            column = 1;
            if (source.charAt(index + 1) === '\n') {
              // CR LF
              last_index = index;
              index++;
            }
            break;
          } else if (char === '\n') {
            last_index = index;
            index++;
            line++;
            column = 1;
            break;
          } else {
            index++;
          }
        }

        if (index >= source.length) {
          last_index = source.length;
        }

        return {
          type: tokenTypes.COMMENT,
          value: source.substring(first_index, last_index).replace(/(\r\n|\n|\r)/gm, ""),
          index: index, line: line, column: column
        };
      } else if ('*' === next_char) {
        // unroll until we find */
        var _first_index = index + 2,
            _last_index = index + 2;
        index += 2;
        while (index < source.length) {
          char = source.charAt(index);
          if (char !== '*') {
            if (char === '\r') {
              next_char = source.charAt(index + 1) || '';
              line++;
              column = 1;
              if (next_char === '\n') {
                index++;
              }
            } else if (char === '\n') {
              line++;
              column = 1;
            }
          } else {
            next_char = source.charAt(index + 1) || '';
            if ('/' === next_char) {
              _last_index = index;
              if (_last_index >= source.length) {
                _last_index = source.length;
              }

              return {
                type: tokenTypes.COMMENT,
                value: source.substring(_first_index, _last_index),
                index: index + 2,
                line: line,
                column: column
              };
            }
          }
          index++;
        }
      }
    } else {
      return null;
    }
  }

  function parseChar(source, index, line, column) {
    var char = source.charAt(index);

    if (char in charTokens) {
      return {
        type: charTokens[char],
        line: line,
        column: column + 1,
        index: index + 1
      };
    } else {
      return null;
    }
  }

  function parseKeyword(source, index, line, column) {
    var matched = Object.keys(keywordsTokens).find(function (name) {
      return name === source.substr(index, name.length);
    });

    if (matched) {
      return {
        type: keywordsTokens[matched],
        line: line,
        column: column + matched.length,
        index: index + matched.length,
        value: null
      };
    } else {
      return null;
    }
  }

  function parseIdentifier(source, index, line, column) {
    var startIndex = index;
    var buffer = '';

    // Must start with a letter or underscore
    var firstChar = source.charAt(index);
    if (!(isLetter(firstChar) || firstChar === '_')) return null;

    while (index < source.length) {
      var char = source.charAt(index);
      if (!(isLetter(char) || char === '_' || isDigit(char))) break;
      buffer += char;
      index++;
    }

    if (buffer.length > 0) {
      return {
        type: tokenTypes.IDENTIFIER, line: line,
        column: column + index - startIndex, index: index, value: buffer
      };
    } else {
      return null;
    }
  }

  function parseString(source, index, line, column) {
    var startIndex = index;
    var buffer = '';
    var state = stringStates._START_;

    while (index < source.length) {
      var char = source.charAt(index);

      switch (state) {
        case stringStates._START_:
          if (char === '"') {
            state = stringStates.START_QUOTE_OR_CHAR;
            index++;
          } else {
            return null;
          }
          break;

        case stringStates.START_QUOTE_OR_CHAR:
          if (char === '\\') {
            state = stringStates.ESCAPE;
            buffer += char;
            index++;
          } else if (char === '"') {
            index++;
            return {
              type: tokenTypes.STRING,
              value: buffer,
              line: line,
              index: index,
              column: column + index - startIndex
            };
          } else {
            buffer += char;
            index++;
          }
          break;

        case stringStates.ESCAPE:
          if (char in escapes) {
            buffer += char;
            index++;
            if (char === 'u') {
              for (var i = 0; i < 4; i++) {
                var curChar = source.charAt(index);
                if (curChar && isHex(curChar)) {
                  buffer += curChar;
                  index++;
                } else {
                  return null;
                }
              }
            }
            state = stringStates.START_QUOTE_OR_CHAR;
          } else {
            return null;
          }
          break;
      }
    }
  }

  function parseNumber(source, index, line, column) {
    var startIndex = index;
    var passedValueIndex = index;
    var state = numberStates._START_;

    iterator: while (index < source.length) {
      var char = source.charAt(index);

      switch (state) {
        case numberStates._START_:
          if (char === '-') {
            state = numberStates.MINUS;
          } else if (char === '0') {
            passedValueIndex = index + 1;
            state = numberStates.ZERO;
          } else if (isDigit1to9(char)) {
            passedValueIndex = index + 1;
            state = numberStates.DIGIT;
          } else {
            return null;
          }
          break;

        case numberStates.MINUS:
          if (char === '0') {
            passedValueIndex = index + 1;
            state = numberStates.ZERO;
          } else if (isDigit1to9(char)) {
            passedValueIndex = index + 1;
            state = numberStates.DIGIT;
          } else {
            return null;
          }
          break;

        case numberStates.ZERO:
          if (char === '.') {
            state = numberStates.POINT;
          } else if (isExp(char)) {
            state = numberStates.EXP;
          } else {
            break iterator;
          }
          break;

        case numberStates.DIGIT:
          if (isDigit(char)) {
            passedValueIndex = index + 1;
          } else if (char === '.') {
            state = numberStates.POINT;
          } else if (isExp(char)) {
            state = numberStates.EXP;
          } else {
            break iterator;
          }
          break;

        case numberStates.POINT:
          if (isDigit(char)) {
            passedValueIndex = index + 1;
            state = numberStates.DIGIT_FRACTION;
          } else {
            break iterator;
          }
          break;

        case numberStates.DIGIT_FRACTION:
          if (isDigit(char)) {
            passedValueIndex = index + 1;
          } else if (isExp(char)) {
            state = numberStates.EXP;
          } else {
            break iterator;
          }
          break;

        case numberStates.EXP:
          if (char === '+' || char === '-') {
            state = numberStates.EXP_DIGIT_OR_SIGN;
          } else if (isDigit(char)) {
            passedValueIndex = index + 1;
            state = numberStates.EXP_DIGIT_OR_SIGN;
          } else {
            break iterator;
          }
          break;

        case numberStates.EXP_DIGIT_OR_SIGN:
          if (isDigit(char)) {
            passedValueIndex = index + 1;
          } else {
            break iterator;
          }
          break;
      }

      index++;
    }

    if (passedValueIndex > 0) {
      return {
        type: tokenTypes.NUMBER,
        value: source.substring(startIndex, passedValueIndex),
        line: line,
        index: passedValueIndex,
        column: column + passedValueIndex - startIndex
      };
    } else {
      return null;
    }
  }

  var defaultSettings$1 = {
    verbose: true
  };

  function tokenize(source, settings) {
    settings = _extends({}, defaultSettings$1, settings);
    var line = 1;
    var column = 1;
    var index = 0;
    var tokens = [];

    while (index < source.length) {
      var whitespace = parseWhitespace(source, index, line, column);

      if (whitespace) {
        index = whitespace.index;
        line = whitespace.line;
        column = whitespace.column;
        continue;
      }

      var matched = parseComment(source, index, line, column) || parseChar(source, index, line, column) || parseKeyword(source, index, line, column) || parseIdentifier(source, index, line, column) || parseString(source, index, line, column) || parseNumber(source, index, line, column);

      if (matched) {
        var token = { type: matched.type, value: matched.value };

        if (settings.verbose) {
          token.position = new Position(line, column, index, matched.line, matched.column, matched.index);
        }

        tokens.push(token);
        index = matched.index;
        line = matched.line;
        column = matched.column;
      } else {
        error(tokenizeErrorTypes.cannotTokenizeSymbol(source.charAt(index), line, column), source, line, column);
      }
    }

    return tokens;
  }

  function findLastTokenIndexIn(tokenList, tokenTypes) {
    var rindex = tokenList.length - 1;
    var rtoken_type = void 0;
    while (rindex >= 0) {
      rtoken_type = tokenList[rindex].type;
      if (tokenTypes.indexOf(rtoken_type) >= 0) {
        return rindex;
      }
      rindex--;
    }
    return -1;
  }

  // Only called when the junker settings is set to true. It balances the
  // arrays/objects so there is no extra tokens left in the list.
  function balancer(tokenList, settings) {
    var token = null;
    var index = 0;
    var max_index = tokenList.length;
    var newTokenList = [];
    var state = { brace: 0, bracket: 0 };

    // Find the last real token we care about.
    var last_balanced_token = findLastTokenIndexIn(tokenList, [tokenTypes.LEFT_BRACE, tokenTypes.RIGHT_BRACE, tokenTypes.LEFT_BRACKET, tokenTypes.RIGHT_BRACKET]);

    // Recover from extra closing braces/brackets
    while (index <= last_balanced_token) {
      token = tokenList[index];
      switch (token.type) {
        case tokenTypes.LEFT_BRACE:
          state.brace++;
          newTokenList.push(token);
          break;
        case tokenTypes.RIGHT_BRACE:
          if (state.brace === 0) {
            // nothing to close
          } else {
            state.brace--;
            newTokenList.push(token);
          }
          break;
        case tokenTypes.LEFT_BRACKET:
          state.bracket++;
          newTokenList.push(token);
          break;
        case tokenTypes.RIGHT_BRACKET:
          if (state.bracket === 0) {
            // nothing to close
          } else {
            state.bracket--;
            newTokenList.push(token);
          }
          break;
        default:
          newTokenList.push(token);
          index++;
          continue;
      }

      index++;
    }

    while (index < max_index) {
      newTokenList.push(tokenList[index]);
      index++;
    }

    // Recover from missing closing braces/brackets, at the end only
    if (state.brace > 0 || state.bracket > 0) {

      if (state.brace > 0) {
        var last_brace_index = findLastTokenIndexIn(tokenList, [tokenTypes.RIGHT_BRACE]);
        var using_right_brace = null;
        if (last_brace_index < 0) {
          // no last brace, so we'll need to create a new one
          var last_opening_brace_index = findLastTokenIndexIn(tokenList, [tokenTypes.LEFT_BRACE]);
          using_right_brace = _extends({}, tokenList[last_opening_brace_index]);
          using_right_brace.type = tokenTypes.RIGHT_BRACE;
        } else {
          using_right_brace = tokenList[last_brace_index];
        }

        while (state.brace > 0) {
          if (last_brace_index < 0) {
            newTokenList.push(using_right_brace);
          } else {
            newTokenList.splice(last_brace_index + 1, 0, using_right_brace);
          }
          state.brace--;
        }
      }

      if (state.bracket > 0) {
        var last_bracket_index = findLastTokenIndexIn(tokenList, [tokenTypes.RIGHT_BRACKET]);
        var using_right_bracket = null;
        if (last_bracket_index < 0) {
          // no last brace, so we'll need to create a new one
          var last_opening_bracket_index = findLastTokenIndexIn(tokenList, [tokenTypes.LEFT_BRACKET]);
          using_right_bracket = _extends({}, tokenList[last_opening_bracket_index]);
          using_right_bracket.type = tokenTypes.RIGHT_BRACKET;
        } else {
          using_right_bracket = tokenList[last_bracket_index];
        }

        while (state.bracket > 0) {
          if (last_bracket_index < 0) {
            newTokenList.push(using_right_bracket);
          } else {
            newTokenList.splice(last_bracket_index + 1, 0, using_right_bracket);
          }
          state.bracket--;
        }
      }
    }

    // console.log('[JUNKER] :=',
    //            util.inspect(newTokenList, {colors : true, depth : 2}));

    return newTokenList;
  }

  var TOKEN_TERMINALS = [tokenTypes.STRING, tokenTypes.NUMBER, tokenTypes.TRUE, tokenTypes.FALSE, tokenTypes.NULL];

  // Returns true if two consecutive terminals are found in the JSON
  function is_double_value_pattern(tokenList, index) {
    if (index >= tokenList.length - 1) return false;
    var currentToken = tokenList[index];
    var nextToken = tokenList[index + 1];
    return TOKEN_TERMINALS.indexOf(currentToken.type) >= 0 && TOKEN_TERMINALS.indexOf(nextToken.type) >= 0;
  }

  var RIGHT_BRACE_BRACKETS = [tokenTypes.RIGHT_BRACKET, tokenTypes.RIGHT_BRACE];
  var LEFT_BRACE_BRACKETS = [tokenTypes.LEFT_BRACKET, tokenTypes.LEFT_BRACE];

  function is_confused_terminators(tokenList, index) {
    if (index >= tokenList.length - 1) return false;
    var currentToken = tokenList[index];
    var nextToken = tokenList[index + 1];

    return RIGHT_BRACE_BRACKETS.indexOf(currentToken.type) >= 0 && LEFT_BRACE_BRACKETS.indexOf(nextToken.type) >= 0;
  }

  function is_terminator_and_value(tokenList, index) {
    if (index >= tokenList.length - 1) return false;
    var currentToken = tokenList[index];
    var nextToken = tokenList[index + 1];

    return RIGHT_BRACE_BRACKETS.indexOf(currentToken.type) >= 0 && TOKEN_TERMINALS.indexOf(nextToken.type) >= 0;
  }

  function comma_injection(tokenList, settings) {
    var newTokenList = [];
    var token = null;
    var index = 0;
    var max_index = tokenList.length;

    // The first phase find all the potential error locations in term of indexes
    // where a missing separator (colon/comma) is missing. We know that each
    // terminal has to be separated. In addition to reporting these locations,
    // we'll also look at the cases where we have two different brace/bracket
    // directions (e.g., [...right-X, left-X...])
    // We then report for cases like this:
    //     }[, ]{
    while (index < max_index) {
      newTokenList.push(tokenList[index]);

      if (index <= max_index - 2 && (is_double_value_pattern(tokenList, index) || is_confused_terminators(tokenList, index) || is_terminator_and_value(tokenList, index))) {
        var comma_token = _extends({}, tokenList[index]);
        comma_token.type = tokenTypes.COMMA;
        newTokenList.push(comma_token);
      }
      index++;
    }

    // console.log('[JUNKER] :=',
    //            util.inspect(newTokenList, {colors : true, depth : 2}));
    return newTokenList;
  }

  // Quote identifiers taht seem to be used as keys
  function quote_keys(tokenList, settings) {
    var newTokenList = [];
    var token = null;
    var index = 0;
    var max_index = tokenList.length;

    while (index < max_index) {
      token = tokenList[index];
      if (token.type === tokenTypes.IDENTIFIER) {
        var string_token = _extends({}, token);
        string_token.type = tokenTypes.STRING;
        newTokenList.push(string_token);
      } else {
        newTokenList.push(tokenList[index]);
      }
      index++;
    }
    return newTokenList;
  }

  // The list of junker processes that are available
  var JUNKER_PROCESSES = [
  // The balance must be the first process
  balancer,
  // Enforce quotes around keys in the JSON
  quote_keys,
  // The comma injection should happen after everything
  comma_injection];

  // Running all the junker processes. These are responsible for achieving one
  // specific thing.
  function junker(tokenList, settings) {
    if (settings.junker === false) return tokenList;
    var resultTokens = tokenList;
    for (var i = 0; i < JUNKER_PROCESSES.length; i++) {
      var processor = JUNKER_PROCESSES[i];
      try {
        var tmpResultTokens = processor(resultTokens, settings);
        resultTokens = tmpResultTokens;
      } catch (e) {
        console.error(e);
        continue;
      }
    }
    return resultTokens;
  }

  // import util from 'util';

  var objectStates = {
    _START_: 0,
    OPEN_OBJECT: 1,
    KEY: 2,
    COLON: 3,
    VALUE: 4,
    COMMA: 5
  };

  var arrayStates = {
    _START_: 0,
    OPEN_ARRAY: 1,
    VALUE: 2,
    COMMA: 3
  };

  var defaultSettings = {
    verbose: true,
    junker: false
  };

  function parseObject(source, tokenList, index, settings) {
    var startToken = void 0;
    var property = void 0;
    var object = new NodeFactory.fromType(nodeTypes.OBJECT);

    var state = objectStates._START_;
    var token = void 0;

    while (index < tokenList.length) {
      token = tokenList[index];

      if (token.type === tokenTypes.COMMENT) {
        var comment = new NodeFactory.fromType(nodeTypes.COMMENT, token.value);
        if (settings.verbose) {
          comment.position = token.position;
        }
        object.comments.push(comment);
        index++;
        continue;
      }

      switch (state) {
        case objectStates._START_:
          if (token.type === tokenTypes.LEFT_BRACE) {
            startToken = token;
            state = objectStates.OPEN_OBJECT;
            index++;
          } else {
            return null;
          }
          break;

        case objectStates.OPEN_OBJECT:
          if (token.type === tokenTypes.STRING) {
            property = new NodeFactory.fromType(nodeTypes.PROPERTY);
            property.key = new NodeFactory.fromType(nodeTypes.KEY, token.value);

            if (settings.verbose) {
              property.key.position = token.position;
            }
            state = objectStates.KEY;
            index++;
          } else if (token.type === tokenTypes.RIGHT_BRACE) {
            if (settings.verbose) {
              object.position = new Position(startToken.position.start.line, startToken.position.start.column, startToken.position.start.char, token.position.end.line, token.position.end.column, token.position.end.char);
            }
            index++;
            return { value: object, index: index };
          } else {
            error(parseErrorTypes.unexpectedToken(source.substring(token.position.start.char, token.position.end.char), token.position.start.line, token.position.start.column), source, token.position.start.line, token.position.start.column);
          }
          break;

        case objectStates.KEY:
          if (token.type === tokenTypes.COLON) {
            state = objectStates.COLON;
            index++;
          } else {
            error(parseErrorTypes.unexpectedToken(source.substring(token.position.start.char, token.position.end.char), token.position.start.line, token.position.start.column), source, token.position.start.line, token.position.start.column);
          }
          break;

        case objectStates.COLON:
          var value = parseValue(source, tokenList, index, settings);
          index = value.index;
          property.value = value.value;

          object.properties.push(property);
          state = objectStates.VALUE;
          break;

        case objectStates.VALUE:
          if (token.type === tokenTypes.RIGHT_BRACE) {
            if (settings.verbose) {
              object.position = new Position(startToken.position.start.line, startToken.position.start.column, startToken.position.start.char, token.position.end.line, token.position.end.column, token.position.end.char);
            }
            index++;
            return { value: object, index: index };
          } else if (token.type === tokenTypes.COMMA) {
            state = objectStates.COMMA;
            index++;
          } else {
            error(parseErrorTypes.unexpectedToken(source.substring(token.position.start.char, token.position.end.char), token.position.start.line, token.position.start.column), source, token.position.start.line, token.position.start.column);
          }
          break;

        case objectStates.COMMA:
          if (token.type === tokenTypes.STRING) {
            property = new NodeFactory.fromType(nodeTypes.PROPERTY);
            property.key = new NodeFactory.fromType(nodeTypes.KEY, token.value);

            if (settings.verbose) {
              property.key.position = token.position;
            }
            state = objectStates.KEY;
            index++;
          } else if (token.type === tokenTypes.COMMA || token.type === tokenTypes.RIGHT_BRACE) {
            // Allow trailing commas
            state = objectStates.VALUE;
            // index++;
            continue;
          } else {
            error(parseErrorTypes.unexpectedToken(source.substring(token.position.start.char, token.position.end.char), token.position.start.line, token.position.start.column), source, token.position.start.line, token.position.start.column);
          }
          break;
      }
    }

    error(parseErrorTypes.unexpectedEnd());
  }

  function parseArray(source, tokenList, index, settings) {
    var startToken = void 0;
    var array = new NodeFactory.fromType(nodeTypes.ARRAY);
    var state = arrayStates._START_;
    var token = void 0;

    while (index < tokenList.length) {
      token = tokenList[index];
      if (token.type === tokenTypes.COMMENT) {
        var comment = new NodeFactory.fromType(nodeTypes.COMMENT, token.value);
        if (settings.verbose) {
          comment.position = token.position;
        }
        array.comments.push(comment);
        index++;
        continue;
      }

      switch (state) {
        case arrayStates._START_:
          if (token.type === tokenTypes.LEFT_BRACKET) {
            startToken = token;
            state = arrayStates.OPEN_ARRAY;
            index++;
          } else {
            return null;
          }
          break;

        case arrayStates.OPEN_ARRAY:
          if (token.type === tokenTypes.RIGHT_BRACKET) {
            if (settings.verbose) {
              array.position = new Position(startToken.position.start.line, startToken.position.start.column, startToken.position.start.char, token.position.end.line, token.position.end.column, token.position.end.char);
            }
            index++;
            return { value: array, index: index };
          } else {
            var _value2 = parseValue(source, tokenList, index, settings);
            index = _value2.index;
            array.items.push(_value2.value);
            state = arrayStates.VALUE;
          }
          break;

        case arrayStates.VALUE:
          if (token.type === tokenTypes.RIGHT_BRACKET) {
            if (settings.verbose) {
              array.position = new Position(startToken.position.start.line, startToken.position.start.column, startToken.position.start.char, token.position.end.line, token.position.end.column, token.position.end.char);
            }
            index++;
            return { value: array, index: index };
          } else if (token.type === tokenTypes.COMMA) {
            state = arrayStates.COMMA;
            index++;
          } else {
            error(parseErrorTypes.unexpectedToken(source.substring(token.position.start.char, token.position.end.char), token.position.start.line, token.position.start.column), source, token.position.start.line, token.position.start.column);
          }
          break;

        case arrayStates.COMMA:
          // Allow for trailing commas and too many commas
          if (token.type === tokenTypes.COMMA || token.type === tokenTypes.RIGHT_BRACKET) {
            state = arrayStates.VALUE;
            continue;
          }
          var value = parseValue(source, tokenList, index, settings);
          index = value.index;
          array.items.push(value.value);
          state = arrayStates.VALUE;
          break;
      }
    }

    error(parseErrorTypes.unexpectedEnd());
  }

  function parseValue(source, tokenList, index, settings) {
    // value: object | array | STRING | NUMBER | TRUE | FALSE | NULL | COMMENT
    var token = tokenList[index];
    var tokenType = void 0;

    switch (token.type) {
      case tokenTypes.STRING:
        tokenType = 'string';
        break;
      case tokenTypes.NUMBER:
        tokenType = 'number';
        break;
      case tokenTypes.TRUE:
        tokenType = 'true';
        break;
      case tokenTypes.FALSE:
        tokenType = 'false';
        break;
      case tokenTypes.NULL:
        tokenType = 'null';
        break;
      case tokenTypes.COMMENT:
        tokenType = 'comment';
        break;
      default:
        break;
    }

    if (tokenType) {
      index++;
      var value = new NodeFactory.fromType(tokenType, token.value);
      if (settings.verbose) {
        value.position = token.position;
      }
      return { value: value, index: index };
    } else {
      var objectOrValue = parseObject(source, tokenList, index, settings) || parseArray(source, tokenList, index, settings);

      if (objectOrValue) {
        return objectOrValue;
      } else {
        error(parseErrorTypes.unexpectedToken(source.substring(token.position.start.char, token.position.end.char), token.position.start.line, token.position.start.column), source, token.position.start.line, token.position.start.column);
      }
    }
  }

  function parseDocument(source, tokenList, index, settings) {
    // value: value | COMMENT*
    var token = tokenList[index];
    var tokenType = token.type;

    var doc = new NodeFactory.fromType(nodeTypes.DOCUMENT);

    while (tokenType === tokenTypes.COMMENT) {
      var comment = new NodeFactory.fromType(nodeTypes.COMMENT, token.value);
      if (settings.verbose) {
        comment.position = token.position;
      }
      doc.comments.push(comment);
      index++;
      token = tokenList[index];
      tokenType = token.type;
    }

    doc.child = parseValue(source, tokenList, index, settings);

    if (doc.child.index !== tokenList.length) {
      index = doc.child.index;

      while (index < tokenList.length && tokenList[index].type === tokenTypes.COMMENT) {
        token = tokenList[index];
        tokenType = token.type;
        doc.child.index = index;

        var _comment = new NodeFactory.fromType(nodeTypes.COMMENT, token.value);
        if (settings.verbose) {
          _comment.position = token.position;
        }
        doc.comments.push(_comment);
        index++;
      }
      doc.child.index = index;
    }

    var final_index = doc.child.index;
    if (!(doc.child instanceof JsonNode) && doc.child.value) {
      doc.child = doc.child.value;
    }
    return { value: doc, index: final_index };
  }

  function parse(source, settings) {
    settings = _extends({}, defaultSettings, settings);

    var tokenList = tokenize(source);

    if (tokenList.length === 0) {
      error(parseErrorTypes.unexpectedEnd());
    }

    if (settings.junker === true) {
      tokenList = junker(tokenList, settings);
    }

    var value = parseDocument(source, tokenList, 0, settings);

    if (value.index === tokenList.length || settings.junker === true) {
      return value.value;
    } else {
      var token = tokenList[value.index];
      error(parseErrorTypes.unexpectedToken(source.substring(token.position.start.char, token.position.end.char), token.position.start.line, token.position.start.column), source, token.position.start.line, token.position.start.column);
    }
  }

  // Do not export this function as it provides the main traversal of the AST
  function traverseAST(visitor, node) {
    switch (node.type) {
      case nodeTypes.DOCUMENT:
        {
          visitor.document(node);
          if (node.comments) {
            node.comments.forEach(function (commentNode) {
              visitor.comment(commentNode);
            });
          }
          if (node.child) {
            node.child.accept(visitor);
          }
          break;
        }
      case nodeTypes.OBJECT:
        {
          visitor.object(node);
          if (node.comments) {
            node.comments.forEach(function (commentNode) {
              visitor.comment(commentNode);
            });
          }
          if (node.properties) {
            node.properties.forEach(function (propNode) {
              propNode.accept(visitor);
            });
          }
          break;
        }
      case nodeTypes.PROPERTY:
        {
          visitor.property(node);
          node.key.accept(visitor);
          node.value.accept(visitor);
          break;
        }
      case nodeTypes.KEY:
        {
          visitor.key(node);
          break;
        }
      case nodeTypes.ARRAY:
        {
          visitor.array(node);
          if (visitor.stop) break;
          if (node.comments) {
            node.comments.forEach(function (commentNode) {
              visitor.comment(commentNode);
            });
          }
          if (node.items) {
            node.items.forEach(function (itemNode) {
              itemNode.accept(visitor);
            });
          }
          break;
        }
      case nodeTypes.STRING:
        {
          visitor.value(node);
          if (!visitor.stop) visitor.string(node);
          break;
        }
      case nodeTypes.NUMBER:
        {
          visitor.value(node);
          if (!visitor.stop) visitor.number(node);
          break;
        }
      case nodeTypes.TRUE:
        {
          visitor.value(node);
          if (!visitor.stop) visitor.boolean(node);
          break;
        }
      case nodeTypes.FALSE:
        {
          visitor.value(node);
          if (!visitor.stop) visitor.boolean(node);
          break;
        }
      case nodeTypes.NULL:
        {
          visitor.value(node);
          if (!visitor.stop) visitor.nil(node);
          break;
        }
      default:
        break;
    }
  }

  var Visitor = function () {
    function Visitor() {
      _classCallCheck(this, Visitor);

      this._stop = false;
    }

    _createClass(Visitor, [{
      key: 'document',
      value: function document(docNode) {
        //
      }
    }, {
      key: 'object',
      value: function object(objectNode) {
        //
      }
    }, {
      key: 'property',
      value: function property(propertyNode) {
        //
      }
    }, {
      key: 'key',
      value: function key(keyNode) {
        //
      }
    }, {
      key: 'array',
      value: function array(arrayNode) {
        //
      }
    }, {
      key: 'value',
      value: function value(valueNode) {
        //
      }
    }, {
      key: 'comment',
      value: function comment(commentNode) {
        //
      }
    }, {
      key: 'string',
      value: function string(stringNode) {
        //
      }
    }, {
      key: 'number',
      value: function number(numberNode) {
        //
      }
    }, {
      key: 'boolean',
      value: function boolean(booleanNode) {
        // encapsulates true | false
      }
    }, {
      key: 'nil',
      value: function nil(nullNode) {
        // null
      }
    }, {
      key: 'visit',
      value: function visit(node) {
        // call to "private" function
        if (this.stop) return;
        traverseAST(this, node);
      }
    }, {
      key: 'stop',
      set: function set(_stop) {
        this._stop = !!_stop;
      },
      get: function get() {
        return this._stop;
      }
    }]);

    return Visitor;
  }();

  ;

  module.exports.nodeTypes = nodeTypes;
  module.exports.parse = parse;
  module.exports.Visitor = Visitor;
  module.exports.AST = { JsonArray: JsonArray, JsonComment: JsonComment, JsonDocument: JsonDocument, JsonFalse: JsonFalse,
    JsonKey: JsonKey, JsonNode: JsonNode, JsonNull: JsonNull, JsonNumber: JsonNumber,
    JsonObject: JsonObject, JsonProperty: JsonProperty, JsonString: JsonString, JsonTrue: JsonTrue,
    JsonValue: JsonValue };
});