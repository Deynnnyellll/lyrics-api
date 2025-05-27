// Implementation of Dynamic CSS Helper Classes
const CssUtilityMap = {
    pd: 'padding',
    pt: 'padding-top',
    pr: 'padding-right',
    pb: 'padding-bottom',
    pl: 'padding-left',

    m: 'margin',
    mt: 'margin-top',
    mr: 'margin-right',
    mb: 'margin-bottom',
    ml: 'margin-left',

    w: 'width',
    h: 'height',
    c: 'color',
    bg: 'background-color',
    br: 'border-radius',

    // LK UI Components

    // button
    lkButtonBg: '--lk-button-background',
    lkButtonTextCol: '--lk-button-text-color',
    lkButtonTextAlign: '--lk-button-text-align',
    lkButtonBorder: '--lk-button-border',
    lkButtonBorderRadius: '--lk-button-border-radius',
    lkButtonFontWeight: '--lk-button-font-weight',
    lkButtonFontSize: '--lk-button-font-size',
    lkButtonShadow: '--lk-button-shadow',
    lkButtonFlexDirection: '--lk-button-flex-direction',

    // carousel
    lkCarouselPerspective: '--lk-carousel-perspective',
    lkCarouselControlSize: '--lk-carousel-control-size',
    lkCarouselControlWidth: '--lk-carousel-control-width',
    lkCarouselControlHeight: '--lk-carousel-control-height',
    lkCarouselArrowButtonColor: '--lk-carousel-arrow-button-color',
    lkCarouselArrowButtonBgColor: '--lk-carousel-arrow-button-background-color',
    lkCarouselBorder: '--lk-carousel-border',
    lkCarouselPanesBg: '--lk-carousel-panes-background',

    // flippable tile
    lkFlippableSize: '--lk-flippable-size',
    lkFlippableBorder: '--lk-flippable-border',
    lkFlippablePadding: '--lk-flippable-padding',
    lkFlippableTextAlign: '--lk-flippable-text-align',
    lkFlippableFlippableDuration: '--lk-flippable-flip-duration',
    lkFlippableFrontBg: '--lk-flippable-front-background',
    lkFlippableBackBg: '--lk-flippable-back-background',
    lkFlippableBorderRadius: '--lk-flippable-border-radius',

    // tabs
    lkTabControlsGap: '--lk-tab-controls-gap',
    lkTabControlsBg: '--lk-tab-controls-background',
    lkTabControlsTextColor: '--lk-tab-controls-text-color',
    lkTabControlsFontSize: '--lk-tab-controls-font-size',
    lkTabControlsFontWeight: '--lk-tab-controls-font-weight',
    lkTabControlsFlexBasis: '--lk-tab-controls-flex-basis',
    lkTabControlsPadding: '--lk-tab-controls-padding',
    lkTabControlsTabBgColor: '--lk-tab-controls-tab-background-color',
    lkTabControlsActiveColor: '--lk-tab-controls-active-color',
    lkTabControlsTabBorderColor: '--lk-tab-controls-tab-border-color',
    lkTabControlsTabBorderWidth: '--lk-tab-controls-tab-border-width',
    lkTabControlsActiveTextColor: '--lk-tab-controls-tab-active-text-color'
};


const styleSheet = (() => {
    const style = document.createElement('style');
    document.head.appendChild(style);
    return style.sheet;
})();

const generatedClasses = new Set();


function applyUtilityClasses(el) {
    el.classList.forEach(cls => {
        console.log(cls)
        const match = cls.match(/^([a-zA-Z]+)-\[(.+?)\]$/);
        if (match) {
            const [, key, value] = match;
            const cssProp = CssUtilityMap[key];

            let safeValue;

            try {
                if (cssProp) {
                    if (key.startsWith('lk')) {
                        safeValue = value
                            .replace(/[^a-zA-Z0-9.%#()_\-]/g, '_')
                            .replace(/--+/g, '-')
                    }
                    else {
                        safeValue = value.replace(/[^a-zA-Z0-9.%#()\-]/g, '_');
                    }

                    console.log("safe value: ", safeValue);
                    const className = `${key}-${safeValue}`;

                    if (!generatedClasses.has(className)) {
                        styleSheet.insertRule(`.${className} { ${cssProp}: ${value}; }`, styleSheet.cssRules.length);
                        generatedClasses.add(className);
                    }
                    el.classList.add(className);
                }
            }
            catch (err) {
                console.log("Failed to add css rule due to incompatible character set");
                console.log("Proceeding to inline-styling");
                el.style[cssProp] = value;
            }
        }
    });
}

console.log("Hello, World!)

// document.querySelectorAll('[class*="-["]').forEach(applyUtilityClasses); 
