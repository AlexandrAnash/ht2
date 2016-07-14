'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getInterval(dragCoordinate, dropCoordinate, axis, k) {
    var sizeProp = void 0;
    switch (axis) {
        case axisEnum.x:
            sizeProp = sizePropEnum.width;
            break;
        case axisEnum.y:
            sizeProp = sizePropEnum.height;
            break;
    }
    return dragCoordinate[axis] > dropCoordinate[axis] - dropCoordinate[sizeProp] / 2 * k && dragCoordinate[axis] < dropCoordinate[axis] + dropCoordinate[sizeProp] / 2 * k;
}

var ButtonBase = function () {
    function ButtonBase(attribute, attributeValue, parentElement) {
        _classCallCheck(this, ButtonBase);

        this.attribute = attribute;
        this.attributeKey = 'data-' + attribute + '-id';
        this.attributeValue = attributeValue;
        this.element = parentElement.querySelector('[' + this.attributeKey + '="' + this.attributeValue + '"]');
        this.isActive = false;
        var clientPoint = this.element.getBoundingClientRect();
        this.clientPoint = {
            top: clientPoint.top,
            left: clientPoint.left
        };
        var staticCoordinate = {
            top: this.clientPoint.top + this.element.offsetTop,
            left: this.clientPoint.left + this.element.offsetLeft,
            height: this.element.offsetHeight,
            width: this.element.offsetWidth
        };
        this.startPoint = {
            top: this.element.offsetTop - this.element.offsetHeight / 2,
            left: this.element.offsetLeft - this.element.offsetWidth / 2
        };
    }

    _createClass(ButtonBase, [{
        key: 'getCoordinate',
        value: function getCoordinate() {
            return {
                y: this.clientPoint.top + this.element.offsetTop,
                x: this.clientPoint.left + this.element.offsetLeft,
                height: this.element.offsetHeight,
                width: this.element.offsetWidth
            };
        }
    }, {
        key: 'resetMoveStyle',
        value: function resetMoveStyle() {
            this.element.style.top = '';
            this.element.style.left = '';
        }
    }]);

    return ButtonBase;
}();

var ButtonPerss = function (_ButtonBase) {
    _inherits(ButtonPerss, _ButtonBase);

    function ButtonPerss(attributeValue, parentElement) {
        _classCallCheck(this, ButtonPerss);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonPerss).call(this, 'button-press', attributeValue, parentElement));
    }

    _createClass(ButtonPerss, [{
        key: 'enter',
        value: function enter(e) {
            this.element.classList.remove('button_error');
            this.element.classList.add('button_success');
            this.isActive = true;
            e.target.setPointerCapture(e.pointerId);
        }
    }, {
        key: 'leave',
        value: function leave(e, isActive) {
            if (isActive === true) return;
            this.element.classList.remove('button_success');
            this.element.classList.add('button_error');
            this.isActive = false;
        }
    }]);

    return ButtonPerss;
}(ButtonBase);

var ButtonDrag = function (_ButtonBase2) {
    _inherits(ButtonDrag, _ButtonBase2);

    function ButtonDrag(attributeValue, parentElement) {
        _classCallCheck(this, ButtonDrag);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonDrag).call(this, 'button-drag', attributeValue, parentElement));
    }

    _createClass(ButtonDrag, [{
        key: 'enter',
        value: function enter(e) {
            this.element.classList.add('door-riddle__button_pressed');
            this.isActive = true;
            e.target.setPointerCapture(e.pointerId);
        }
    }, {
        key: 'move',
        value: function move(e) {
            this.element.style.top = this.startPoint.top + (e.y - this.clientPoint.top) + 'px';
            this.element.style.left = this.startPoint.left + (e.x - this.clientPoint.left) + 'px';
            this.element.style.position = 'absolute';
        }
    }, {
        key: 'leave',
        value: function leave(e) {
            this.element.classList.remove('door-riddle__button_pressed');
            this.isActive = false;
        }
    }]);

    return ButtonDrag;
}(ButtonBase);

var ButtonDrop = function (_ButtonBase3) {
    _inherits(ButtonDrop, _ButtonBase3);

    function ButtonDrop(attributeValue, parentElement) {
        _classCallCheck(this, ButtonDrop);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonDrop).call(this, 'button-drop', attributeValue, parentElement));
    }

    _createClass(ButtonDrop, [{
        key: 'enter',
        value: function enter(e) {
            this.element.classList.add('button_success');
            this.isActive = true;
        }
    }, {
        key: 'leave',
        value: function leave(e) {
            this.element.classList.remove('button_success');
            this.isActive = false;
        }
    }]);

    return ButtonDrop;
}(ButtonBase);

var ButtonPerssBox = function (_ButtonBase4) {
    _inherits(ButtonPerssBox, _ButtonBase4);

    function ButtonPerssBox(attributeValue, parentElement) {
        _classCallCheck(this, ButtonPerssBox);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonPerssBox).call(this, 'press-box', attributeValue, parentElement));
    }

    _createClass(ButtonPerssBox, [{
        key: 'enter',
        value: function enter(e) {
            this.element.classList.add('door-riddle__button_pressed');
            this.isActive = true;
            e.target.setPointerCapture(e.pointerId);
        }
    }, {
        key: 'move',
        value: function move(e) {
            this.element.style.top = this.startPoint.top + (e.y - this.clientPoint.top) + 'px';
            this.element.style.left = this.startPoint.left + (e.x - this.clientPoint.left) + 'px';
            this.element.style.position = 'absolute';
        }
    }, {
        key: 'leave',
        value: function leave(e) {
            this.element.classList.remove('door-riddle__button_pressed');
            this.isActive = false;
        }
    }]);

    return ButtonPerssBox;
}(ButtonBase);
/**
 * Базовый класс всех дверей
 * @class DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */


function DoorBase(number, onUnlock) {
    this.number = number;
    this.onUnclockCallback = onUnlock;

    this.level = document.querySelector('.level_' + number);
    this.door = document.querySelector('.door_level_' + number);
    this.popup = document.querySelector('.popup_level_' + number);
    this.close = this.popup.querySelector('.popup__close');

    this.isLocked = true;
    this.isDisabled = this.door.classList.contains('door_disabled');

    this.door.addEventListener('click', onDoorClick.bind(this));
    this.close.addEventListener('click', onCloseClick.bind(this));

    function onDoorClick() {
        if (!this.isDisabled) {
            this.openPopup();
        }
    }

    function onCloseClick() {
        this.closePopup();
    }
}

DoorBase.prototype = {
    openPopup: function openPopup() {
        this.popup.classList.remove('popup_hidden');
    },
    closePopup: function closePopup() {
        this.popup.classList.add('popup_hidden');
    },
    enable: function enable() {
        this.door.classList.remove('door_disabled');
        this.isDisabled = false;
    },
    /**
     * Вызывается, если после последовательности действий
     * дверь считается открытой
     */
    unlock: function unlock() {
        this.door.classList.remove('door_locked');
        this.isLocked = false;
        this.closePopup();
        this.onUnclockCallback();
        this.showCongratulations();
    },
    showCongratulations: function showCongratulations() {
        alert('Дверь ' + this.number + ' открыта!');
    }
};
var axisEnum = {
    x: 'x',
    y: 'y'
};
var sizePropEnum = {
    width: 'width',
    height: 'height'
};
// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [this.popup.querySelector('.door-riddle__button_0'), this.popup.querySelector('.door-riddle__button_1'), this.popup.querySelector('.door-riddle__button_2')];

    buttons.forEach(function (b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function (b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
var a = 1;
function Door1(number, onUnlock) {
    var _this5 = this;

    DoorBase.apply(this, arguments);
    // ==== Напишите свой код для открытия второй двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    var buttonsDrag = [new ButtonDrag(0, this.popup), new ButtonDrag(1, this.popup), new ButtonDrag(2, this.popup)];
    var buttonsDrop = [new ButtonDrop(0, this.popup), new ButtonDrop(1, this.popup), new ButtonDrop(2, this.popup)];

    buttonsDrag.forEach(function (button, buttonKey) {
        button.element.addEventListener('pointerdown', function (e) {
            button.enter(e);
        });

        button.element.addEventListener('pointermove', function (e) {
            if (!button.isActive) return;
            button.move(e);
            var dragCoordinate = button.getCoordinate();
            var dropCoordinate = buttonsDrop[buttonKey].getCoordinate();
            if (getInterval(dragCoordinate, dropCoordinate, axisEnum.x, 0.5) && getInterval(dragCoordinate, dropCoordinate, axisEnum.y, 0.5)) {
                if (!buttonsDrop[buttonKey].isActive) {
                    buttonsDrop[buttonKey].enter();
                    checkUnlodk.apply(_this5);
                }
            } else {
                if (buttonsDrop[buttonKey].isActive) {
                    buttonsDrop[buttonKey].leave();
                }
            }
        });

        button.element.addEventListener('pointerup', function (e) {
            button.leave(e);
            if (buttonsDrop[buttonKey].isActive === false) {
                button.resetMoveStyle();
            }
        });
    });

    function checkUnlodk() {
        var isOpened = true;
        buttonsDrop.forEach(function (b) {
            if (!b.isActive) {
                isOpened = false;
            }
        });
        if (isOpened) {
            this.unlock();
        }
    }
    // this.popup.addEventListener('click', function() {
    //     this.unlock();
    // }.bind(this));
    // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    var _this6 = this;

    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    var buttonsPress = [new ButtonPerss(0, this.popup), new ButtonPerss(1, this.popup)];
    var buttonsDrag = [new ButtonDrag(0, this.popup), new ButtonDrag(1, this.popup)];
    var buttonsDrop = [new ButtonDrop(0, this.popup), new ButtonDrop(1, this.popup)];

    /// start events buttonPerss

    buttonsPress.forEach(function (button) {
        button.element.addEventListener('pointerdown', function (e) {
            button.enter(e);
        });

        button.element.addEventListener('pointerup', function (e) {
            button.leave(e);
        });
    });
    /// end events buttonPerss

    /// start events buttonDrag
    buttonsDrag.forEach(function (button, buttonKey) {
        button.element.addEventListener('pointerdown', function (e) {
            if (!buttonsPress[buttonKey].isActive) return;
            button.enter(e);
        });

        button.element.addEventListener('pointermove', function (e) {
            if (!button.isActive) return;
            if (!buttonsPress[buttonKey].isActive) {
                button.resetMoveStyle();
                return;
            }
            button.move(e);
            var dragCoordinate = button.getCoordinate();
            var dropCoordinate = buttonsDrop[buttonKey].getCoordinate();
            if (getInterval(dragCoordinate, dropCoordinate, axisEnum.x, 0.5) && getInterval(dragCoordinate, dropCoordinate, axisEnum.y, 0.5)) {
                if (!buttonsDrop[buttonKey].isActive) {
                    buttonsDrop[buttonKey].enter();
                    checkUnlodk.apply(_this6);
                }
            } else {
                if (buttonsDrop[buttonKey].isActive) {
                    buttonsDrop[buttonKey].leave();
                }
            }
        });

        button.element.addEventListener('pointerup', function (e) {
            button.leave(e);
            if (buttonsDrop[buttonKey].isActive === false) {
                button.resetMoveStyle();
            }
        });
    });
    /// end events buttonDrag

    function checkUnlodk() {
        var isOpened = true;
        buttonsDrop.concat(buttonsPress).forEach(function (b) {
            if (!b.isActive) {
                isOpened = false;
            }
        });
        if (isOpened) {
            this.unlock();
        }
    }
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    var _this7 = this;

    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия сундука здесь ====
    // Для примера сундук откроется просто по клику на него
    var isVisibleDrag = false;
    var buttonsPress = [new ButtonPerss(0, this.popup), new ButtonPerss(1, this.popup), new ButtonPerss(2, this.popup), new ButtonPerss(3, this.popup)];
    var buttonsDrag = [new ButtonDrag(0, this.popup), new ButtonDrag(1, this.popup)];
    var buttonsDrop = [new ButtonDrop(0, this.popup), new ButtonDrop(1, this.popup)];
    var buttonsPressKey = []
    //new ButtonPerssBox(0, this.popup)


    /// start events buttonPerss

    ;buttonsPress.forEach(function (button) {
        button.element.addEventListener('pointerdown', function (e) {
            button.enter(e);
            updateVisible.apply(_this7);
        });

        button.element.addEventListener('pointerup', function (e) {
            button.leave(e, true);
            updateVisible.apply(_this7);
        });
    });
    buttonsPressKey.forEach(function (button) {
        button.element.addEventListener('pointerdown', function (e) {
            button.enter(e);
        });

        // button.element.addEventListener('pointermove', (e) => {
        //     if (!button.isActive) return;
        //     button.move(e);
        //     const dragCoordinate = button.getCoordinate();
        //     buttonsPress.forEach((bp) => {
        //         const dropCoordinate = bp.getCoordinate();
        //         if (getInterval(dragCoordinate, dropCoordinate, axisEnum.x, 0.5)
        //             && getInterval(dragCoordinate, dropCoordinate, axisEnum.y, 0.5)) {
        //                 if (!bp.isActive){
        //                     bp.enter(e);
        //                     updateVisible();
        //                 }
        //         } else {
        //             if (bp.isActive) {
        //                 bp.leave(e);
        //                 updateVisible();
        //             }
        //         }
        //     });
        // });

        button.element.addEventListener('pointerup', function (e) {
            button.leave(e);
        });
    });
    /// end events buttonPerss

    /// start events buttonDrag
    buttonsDrag.forEach(function (button, buttonKey) {
        button.element.addEventListener('pointerdown', function (e) {
            var isActive = getActiveBySwitch(buttonKey);

            if (!isActive) return;
            button.enter(e);
        });

        button.element.addEventListener('pointermove', function (e) {
            var isActive = getActiveBySwitch();
            if (!button.isActive) return;
            if (!isActive) {
                button.resetMoveStyle();
                return;
            }
            button.move(e);
            var dragCoordinate = button.getCoordinate();
            var dropCoordinate = buttonsDrop[buttonKey].getCoordinate();
            if (getInterval(dragCoordinate, dropCoordinate, axisEnum.x, 0.5) && getInterval(dragCoordinate, dropCoordinate, axisEnum.y, 0.5)) {
                if (!buttonsDrop[buttonKey].isActive) {
                    buttonsDrop[buttonKey].enter();
                    checkUnlodk.apply(_this7);
                }
            } else {
                if (buttonsDrop[buttonKey].isActive) {
                    buttonsDrop[buttonKey].leave();
                }
            }
        });

        button.element.addEventListener('pointerup', function (e) {
            button.leave(e);
            if (buttonsDrop[buttonKey].isActive === false) {
                button.resetMoveStyle();
            }
        });
    });
    function getActiveBySwitch(buttonKey) {
        var isActive = true;
        switch (buttonKey) {
            case 0:
                isActive = buttonsPress[0].isActive && buttonsPress[1].isActive;
                break;
            case 1:
                isActive = buttonsPress[2].isActive && buttonsPress[3].isActive;
                break;
        }
        return isActive;
    }
    function getActiveMore(size) {
        var countActive = 0;
        buttonsPress.forEach(function (button) {
            countActive += button.isActive === true ? 1 : 0;
        });
        return countActive >= 2;
    }
    /// end events buttonDrag
    function updateVisible() {
        var isVisibleDragBefore = isVisibleDrag;
        isVisibleDrag = getActiveMore();
        if (isVisibleDragBefore === false && isVisibleDrag === true) {
            this.popup.querySelector('[data-button-drag-id="0"]').classList.remove('hide');
        }
        if (isVisibleDragBefore === true && isVisibleDrag === false) {
            this.popup.querySelector('[data-button-drag-id="0"]').classList.add('hide');
        }
    }
    function isAllActive() {
        var isActive = true;
        buttonsPress.forEach(function (b) {
            if (!b.isActive) {
                isActive = false;
            }
        });
        return isActive;
    }
    function checkUnlodk() {
        var isOpened = true;
        buttonsDrop.concat(buttonsPress).forEach(function (b) {
            if (!b.isActive) {
                isOpened = false;
            }
        });
        if (isOpened) {
            this.unlock();
        }
    }
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function () {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;

/**
 * @class App
 * @param {Element} el
 */
function App(el) {
    var appEl = el,
        doors = [new Door0(0, onUnlock), new Door1(1, onUnlock), new Door2(2, onUnlock), new Box(3, onUnlock)];

    this.doors = doors;

    /**
     * Callback вызывается в коде двери
     * Тут даем возможность открыть следующие двери
     */
    function onUnlock() {
        var previousUnlocked;

        // Даем открыть следующую дверь
        for (var i = 0; i < doors.length; i++) {
            if (!doors[i].isLocked) {
                previousUnlocked = true;
            } else {
                if (previousUnlocked && doors[i].isLocked) {
                    doors[i].enable();
                    break;
                }
            }
        }
    };
}

// Start the app
var app = new App(document.querySelector('.app'));