
class ButtonBase {
    constructor(attribute, attributeValue, parentElement) {
        this.attribute = attribute;
        this.attributeKey = `data-${attribute}-id`;
        this.attributeValue = attributeValue;
        this.element = parentElement.querySelector(`[${this.attributeKey}="${this.attributeValue}"]`)
        this.isActive = false;
        var clientPoint = this.element.getBoundingClientRect();
        this.clientPoint = {
            top: clientPoint.top,
            left: clientPoint.left,
        }
        var staticCoordinate = {
            top: this.clientPoint.top + this.element.offsetTop,
            left: this.clientPoint.left + this.element.offsetLeft,
            height: this.element.offsetHeight,
            width: this.element.offsetWidth
        }
        this.startPoint = {
            top: this.element.offsetTop - this.element.offsetHeight/2,
            left: this.element.offsetLeft - this.element.offsetWidth/2
        }
    }
    getCoordinate() {
            return {
                y: this.clientPoint.top + this.element.offsetTop,
                x: this.clientPoint.left + this.element.offsetLeft,
                height: this.element.offsetHeight,
                width: this.element.offsetWidth
            }
        }
    resetMoveStyle() {
        this.element.style.top = '';
        this.element.style.left = '';
    }
    
}


class ButtonPerss extends ButtonBase{
    constructor(attributeValue, parentElement) {
        super('button-press', attributeValue, parentElement);
    }
    enter(e) {
        this.element.classList.remove(`button_error`);
        this.element.classList.add(`button_success`);
        this.isActive = true;
        e.target.setPointerCapture(e.pointerId);
    }
    leave(e, isActive) {
        if (isActive === true) return;
        this.element.classList.remove(`button_success`);
        this.element.classList.add(`button_error`);
        this.isActive = false;
    }
}

 class ButtonDrag extends ButtonBase{
    constructor(attributeValue, parentElement) {
        super('button-drag', attributeValue, parentElement);
    }
    enter(e) {
        this.element.classList.add(`door-riddle__button_pressed`);
        this.isActive = true;
        e.target.setPointerCapture(e.pointerId);
    }
    move(e) {
        this.element.style.top = this.startPoint.top + (e.y - this.clientPoint.top) + 'px';
        this.element.style.left = this.startPoint.left + (e.x - this.clientPoint.left) + 'px';
        this.element.style.position = 'absolute';
    }
    leave(e) {
        this.element.classList.remove(`door-riddle__button_pressed`);
        this.isActive = false;
    }
}

 class ButtonDrop extends ButtonBase{
    constructor(attributeValue, parentElement) {
        super('button-drop', attributeValue, parentElement);
    }
    
    enter(e) {
        this.element.classList.add(`button_success`);
        this.isActive = true;
    }
    leave(e) {
        this.element.classList.remove(`button_success`);
        this.isActive = false;
    }
}
class ButtonPerssBox extends ButtonBase{
    constructor(attributeValue, parentElement) {
        super('press-box', attributeValue, parentElement);
    }
    
    enter(e) {
        this.element.classList.add(`door-riddle__button_pressed`);
        this.isActive = true;
        e.target.setPointerCapture(e.pointerId);
    }
    
    move(e) {
        this.element.style.top = this.startPoint.top + (e.y - this.clientPoint.top) + 'px';
        this.element.style.left = this.startPoint.left + (e.x - this.clientPoint.left) + 'px';
        this.element.style.position = 'absolute';
    }

    leave(e) {
        this.element.classList.remove(`door-riddle__button_pressed`);
        this.isActive = false;
    }
}
