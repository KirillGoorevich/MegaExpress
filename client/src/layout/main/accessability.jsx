import { Accessibility } from 'accessibility/dist/accessibility';

var options = {
    icon: {
        position: {
            buttom: { size: 2, units: 'vh' },
            right: { size: 2, units: '%' },
            type: 'absolute'
        }
    }
  }

const AccessibilityContainer = window.addEventListener('load', function() { new Accessibility(options); }, false);

export default AccessibilityContainer;