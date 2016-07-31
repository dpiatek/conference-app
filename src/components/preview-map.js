/* global google:true */

import React, { PropTypes } from 'react';
import { findDOMNode } from "react-dom";
import s from './preview-map.css';

class PreviewMap extends React.Component {
  constructor(props) {
    super();
    this.state = {
      location: props.location.name
    };
  }

  static defaultProps = {
    location: {
      name: "",
      latLng: {}
    }
  }

  static propTypes = {
    location: PropTypes.object,
    name: PropTypes.string,
    callback: PropTypes.func.isRequired
  }

  componentDidMount() {
    const node = findDOMNode(this);

    const inputNode = node.firstChild;
    const mapNode = node.lastChild;

    const latLng = this.props.location.latLng || { lat: 51.5078821, lng: -0.0899208 };

    const map = new google.maps.Map(mapNode, {
      center: latLng,
      zoom: 13,
      mapTypeId: 'roadmap'
    });

    const searchBox = new google.maps.places.SearchBox(inputNode);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) return;

      markers.forEach((marker) => marker.setMap(null));
      markers = [];

      const bounds = new google.maps.LatLngBounds();

      places.forEach(place => {
        if (!place.geometry) return;

        this.props.callback({
          name: place.formatted_address,
          latLng: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        });

        this.setState({ location: place.formatted_address });

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        markers.push(new google.maps.Marker({
          map, icon, title: place.name, position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });
  }


  handleChange(e) {
    this.setState({ location: e.target.value });
  }

  render() {
    const location = this.state.location;
    const handleChange = this.handleChange.bind(this);

    return (
      <div className={s.previewMap}>
        <input id="pac-input" className={s.controls} type="text" placeholder="Search Box" value={location} onChange={handleChange} />
        <div id="map"></div>
      </div>
    );
  }
}

export default PreviewMap;
