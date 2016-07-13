
class ButtonBase {
    constructor(attribute, attributeValue) {
        this.attribute = attribute;
        this.attributeKey = `data-${attribute}-id`;
        this.attributeValue = attributeValue;
    }
    enter(e) {
        console.log('enter = ', `enter_hidden_${this.attributeKey}_${this.attributeValue}`)
        e.target.classList.add(`enter_hidden_${this.attributeKey}_${this.attributeValue}`);
    }
}

class ButtonPerss extends ButtonBase{
    constructor(attributeValue) {
        super('button-press', attributeValue);
    }
}

 class ButtonDrag extends ButtonBase{
    constructor(attributeValue) {
        super('button-drag', attributeValue);
    }
}

 class ButtonDrop extends ButtonBase{
    constructor(attributeValue) {
        super('button-drop', attributeValue);
    }
}
