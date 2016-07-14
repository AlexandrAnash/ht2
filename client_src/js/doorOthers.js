const axisEnum = {
    x: 'x',
    y: 'y'
}
const sizePropEnum = {
    width: 'width',
    height: 'height'
}
// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
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
        buttons.forEach(function(b) {
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
    DoorBase.apply(this, arguments);
    // ==== Напишите свой код для открытия второй двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    let buttonsDrag = [new ButtonDrag(0, this.popup), new ButtonDrag(1, this.popup), new ButtonDrag(2, this.popup)];
    let buttonsDrop = [new ButtonDrop(0, this.popup), new ButtonDrop(1, this.popup), new ButtonDrop(2, this.popup)];
    
    buttonsDrag.forEach((button, buttonKey) => {
        button.element.addEventListener('pointerdown', (e) => {
            button.enter(e)
        });
        
        button.element.addEventListener('pointermove', (e) => {
            if (!button.isActive) return; 
            button.move(e)
            const dragCoordinate = button.getCoordinate()
            const dropCoordinate = buttonsDrop[buttonKey].getCoordinate();
            if (getInterval(dragCoordinate, dropCoordinate, axisEnum.x, 0.5) 
                && getInterval(dragCoordinate, dropCoordinate, axisEnum.y, 0.5)) {
                     if (!buttonsDrop[buttonKey].isActive){
                        buttonsDrop[buttonKey].enter();
                        checkUnlodk.apply(this);
                     }
            } else {
                if (buttonsDrop[buttonKey].isActive) {
                    buttonsDrop[buttonKey].leave();
                }
            }
        });
        
        button.element.addEventListener('pointerup', (e) => {
            button.leave(e)
            if (buttonsDrop[buttonKey].isActive === false) {
                button.resetMoveStyle();
            } 
        });
    });
    
    function checkUnlodk() {
        var isOpened = true;
        buttonsDrop.forEach(function(b) {
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
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    let buttonsPress = [new ButtonPerss(0, this.popup), new ButtonPerss(1, this.popup)];
    let buttonsDrag = [new ButtonDrag(0, this.popup), new ButtonDrag(1, this.popup)];
    let buttonsDrop = [new ButtonDrop(0, this.popup), new ButtonDrop(1, this.popup)];

    /// start events buttonPerss
    
    buttonsPress.forEach((button) => {
        button.element.addEventListener('pointerdown', (e) => {
            button.enter(e)
        });
        
        button.element.addEventListener('pointerup', (e) => {
            button.leave(e)
        });
    })
    /// end events buttonPerss 
    
    /// start events buttonDrag
    buttonsDrag.forEach((button, buttonKey) => {
        button.element.addEventListener('pointerdown', (e) => {
            if (!buttonsPress[buttonKey].isActive) return;
            button.enter(e)
        });
        
        button.element.addEventListener('pointermove', (e) => {
            if (!button.isActive) return; 
            if (!buttonsPress[buttonKey].isActive) {
                button.resetMoveStyle();
                return;
            }
            button.move(e)
            const dragCoordinate = button.getCoordinate()
            const dropCoordinate = buttonsDrop[buttonKey].getCoordinate();
            if (getInterval(dragCoordinate, dropCoordinate, axisEnum.x, 0.5) 
                && getInterval(dragCoordinate, dropCoordinate, axisEnum.y, 0.5)) {
                     if (!buttonsDrop[buttonKey].isActive){
                        buttonsDrop[buttonKey].enter();
                        checkUnlodk.apply(this);
                     }
            } else {
                if (buttonsDrop[buttonKey].isActive) {
                    buttonsDrop[buttonKey].leave();
                }
            }
        });
        
        button.element.addEventListener('pointerup', (e) => {
            button.leave(e)
            if (buttonsDrop[buttonKey].isActive === false) {
                button.resetMoveStyle();
            } 
        });
    });
    /// end events buttonDrag 
    
    function checkUnlodk() {
        var isOpened = true;
        buttonsDrop.concat(buttonsPress).forEach(function(b) {
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
    DoorBase.apply(this, arguments);
    
    // ==== Напишите свой код для открытия сундука здесь ====
    // Для примера сундук откроется просто по клику на него
    let isVisibleDrag = false;
    let buttonsPress = [
        new ButtonPerss(0, this.popup),
        new ButtonPerss(1, this.popup),
        new ButtonPerss(2, this.popup),
        new ButtonPerss(3, this.popup),
    ];
    let buttonsDrag = [
        new ButtonDrag(0, this.popup), 
        new ButtonDrag(1, this.popup)
    ];
    let buttonsDrop = [
        new ButtonDrop(0, this.popup), 
        new ButtonDrop(1, this.popup)
    ];
    let buttonsPressKey = [
        new ButtonPerssBox(0, this.popup)
    ]

    /// start events buttonPerss
    
    buttonsPress.forEach((button) => {
        button.element.addEventListener('pointerdown', (e) => {
            button.enter(e);
            updateVisible();
        });
        
        button.element.addEventListener('pointerup', (e) => {
            button.leave(e)
            updateVisible();
        });
    })
    buttonsPressKey.forEach((button) => {
        button.element.addEventListener('pointerdown', (e) => {
            button.enter(e);
        });
        
        button.element.addEventListener('pointermove', (e) => {
            if (!button.isActive) return; 
            button.move(e);
            const dragCoordinate = button.getCoordinate();
            buttonsPress.forEach((bp) => {
                const dropCoordinate = bp.getCoordinate();
                if (getInterval(dragCoordinate, dropCoordinate, axisEnum.x, 1) 
                    && getInterval(dragCoordinate, dropCoordinate, axisEnum.y, 1)) {
                        if (!bp.isActive){
                            bp.enter();
                            updateVisible();
                        }
                } else {
                    if (bp.isActive) {
                        bp.leave();
                        updateVisible();
                    }
                }
            });
        });

        button.element.addEventListener('pointerup', (e) => {
            button.leave(e);
        });
    })
    /// end events buttonPerss 
    
    function updateVisible() {
        countActive = 0;
        buttonsPress.forEach((button) => {
            countActive += button.isActive === true ? 1 : 0;
        })
        isVisibleDrag = countActive >= 2;
    }

    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
