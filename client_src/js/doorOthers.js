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
    let buttonsPerss = [new ButtonPerss(0, this.popup), new ButtonPerss(1, this.popup)];
    let buttonsDrag = [new ButtonDrag(0, this.popup), new ButtonDrag(1, this.popup)];
    let buttonsDrop = [new ButtonDrop(0, this.popup), new ButtonDrop(1, this.popup)];

    /// start events buttonPerss
    
    buttonsPerss.forEach((button) => {
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
            if (!buttonsPerss[buttonKey].isActive) return;
            button.enter(e)
        });
        
        button.element.addEventListener('pointermove', (e) => {
            if (!button.isActive) return; 
            if (!buttonsPerss[buttonKey].isActive) {
                button.resetMoveStyle();
                return;
            }
            button.move(e)
        });

        button.element.addEventListener('pointerup', (e) => {
            button.leave(e)
            if (buttonsDrop[buttonKey].isActive === false) {
                button.resetMoveStyle();
            } 
        });
    })
    /// end events buttonDrag 
    
    
    /// start events buttonDrop
    buttonsDrop.forEach((button, buttonKey) => {
        button.element.addEventListener('pointerenter', (e) => {
            if (!buttonsPerss[buttonKey].isActive || !buttonsDrag[buttonKey].isActive) return;
            button.enter(e)
        });

        button.element.addEventListener('pointerleave', (e) => {
            button.leave(e)
        });
    })
    /// end events buttonDrop 
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
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
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
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
