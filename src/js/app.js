function addHTMLAttributes (htmlElement, attributes) {
  for (let attributeValue in attributes)
    htmlElement[attributeValue] = attributes[attributeValue];
  return htmlElement;
}


function addChildElements (htmlElement, children) {
  children.forEach (child => {
    // checks whether to append the child as a text or an element node
    typeof child === 'string'
      ? htmlElement.appendChild (document.createTextNode (child))
      : htmlElement.appendChild (child);
  });
  return htmlElement;
}

/**
 * createHTMLElement is a helper function for creating HTML elements
 * it takes the elementTagName of HTML element to be created as first
 * argument, the second argument is an object of attributes of the element
 * while the last argument can either be another HTML element to nest
 * within it or a text
 * @param {String} elementTagName
 * @param {String} Attributes
 * @param  {...any} children
 */
function createHTMLElement (
  elementTagName, attributes, ...children
  ) {
  let htmlElement = document.createElement (elementTagName);
      htmlElement = addHTMLAttributes (htmlElement, attributes);
      htmlElement = addChildElements (htmlElement, children);
  return htmlElement;
}


class FlipComponent {
  constructor (label) {
    this._top        = createHTMLElement ("b", {className: "card__top"}, "");
    this._bottom     = createHTMLElement ("b", {className: "card__bottom"}, "");
    this._backBottom = createHTMLElement ("b", {className: "card__bottom"}, "");
    this._back       = createHTMLElement (
                        "b"
                      , {className: "card__back"}
                      , this._backBottom );
                      
    this._flipCard   = createHTMLElement (
                        "b"
                      , {className: "flip__card card"}
                      , this._top
                      , this._bottom
                      , this._back );

    this._flipCardName = createHTMLElement ("div", {className:"flip__name"},label);

    this._flipComponent = createHTMLElement (
                          "div"
                        , {className: "flip flip-animate", id: `${label}`}
                        , createHTMLElement ("div", {className: "left flip__dot"})
                        , createHTMLElement ("div", {className: "right flip__dot"})
                        , this._flipCard
                        , this._flipCardName);
    this._value = 0;
  }

  get create () {
    return this._flipComponent;
  }

  /**
   * @param {Number} value
   */
  set update (value) {
    const paddedValue  = `${value}`.padStart (2, "0"),
          currentValue = `${this._value}`.padStart (2, "0");
  
    if (value !== this._value) {
      
      if (this._value >= 0) {
        this._back.setAttribute ('data-value', currentValue);
        this._bottom.setAttribute ('data-value', currentValue);
      }

      this._value         = value;
      this._top.innerText = paddedValue;
      this._backBottom.setAttribute ('data-value', paddedValue);
  
      this._flipComponent.classList.remove ('flip-animate');
      this._flipComponent.offsetWidth;
      this._flipComponent.classList.add ('flip-animate');
    }
  }
}


const countdown = document.querySelector (".main__countdown");

const dailyFlipCard = new FlipComponent ("Day");

countdown.append (dailyFlipCard.create);


