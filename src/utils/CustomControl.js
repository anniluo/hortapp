import { Control, DomUtil, DomEvent } from 'leaflet';
import React from 'react';

const CustomLeafletControl = () =>
  Control.extend({
    options: {
      className: 'location-button leaflet-top leaflet-right'
    },
    onAdd: () => {
      const button = <button className={this.className}>Add Resource</button>;
      DomEvent.on();
      DomEvent.disableClickPropagation(button);
      return button;
    },
    onRemove: () => {
      DomEvent.off();
    }
  });

export default CustomLeafletControl;
