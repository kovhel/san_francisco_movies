import React from 'react';
import * as R from 'ramda';
import * as L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import TipsList from './tipsList';
import FilmsList from './filmsList';
import FilmsSearch from './filmsSearch';
import MarkersLegend from './markersLegend';
import LoaderContainer from '../../loader/containers/loaderContainer';
import { mapAccessToken, mapDataUrl, mapSignature } from '../../../constants/accessAttributes';
import { markersIcons, pointerIcon } from '../../../constants/markersIcons';
import { CITY_NAME } from '../../../constants/titles';

class FilmsMap extends React.Component {
  constructor() {
    super();
    this.mapZoom = 12;

    const defaultMarkerOptions = {
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [12, -39],
    };
    this.saturationIcons = {};
    for (const key of Object.keys(markersIcons)) {
      this.saturationIcons[key] = L.icon({ iconUrl: markersIcons[key], ...defaultMarkerOptions });
    }
    this.latestIcon = L.icon({
      iconUrl: pointerIcon,
      iconSize: [25, 41],
      iconAnchor: [12, 26],
    });
  }

  componentDidMount() {
    this.props.getLocation(CITY_NAME, CITY_NAME);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter && nextProps.filter !== this.props.filter) {
      R.uniqWith(R.eqProps('title'))(this.props.films)
        .filter(film => film.title.toLowerCase().includes(nextProps.filter.toLowerCase()))
        .forEach(film => this.props.getFilmLocations(film.title));
    }
  }

  getMarkers() {
    return this.props.films
      .filter(film => this.props.locations[film.locations])
      .filter(film => film.title.toLowerCase().includes(this.props.filter.toLowerCase()))
      .map(film => ({ film, position: this.props.locations[film.locations] }));
  }

  getReducedNumberOfMarkers(eps) {
    const reducedMarkers = [];
    const markers = this.getMarkers();

    markers.forEach((marker) => {
      let pushed = false;
      reducedMarkers.forEach(reducedMarker => {
        if (Math.abs(reducedMarker.position[0] - marker.position[0]) < eps &&
            Math.abs(reducedMarker.position[1] - marker.position[1]) < eps) {
          reducedMarker.films.push(marker.film);
          pushed = true;
        }
      });
      if (!pushed) {
        reducedMarkers.push({ position: marker.position, films: [marker.film] });
      }
    });
    return reducedMarkers;
  }

  getSaturationIcon(numberOfFilmsPerMarker) {
    for (const key of Object.keys(this.saturationIcons)) {
      if (numberOfFilmsPerMarker < key) {
        return this.saturationIcons[key];
      }
    }
    return this.saturationIcons[34];
  }

  render() {
    const { locations } = this.props;
    const markers = this.getReducedNumberOfMarkers(0.007);

    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <FilmsSearch setSearchQuery={this.props.setSearchQuery} />
        <TipsList />
        <Map
          style={{ height: '100%' }}
          center={locations[CITY_NAME]}
          zoom={this.mapZoom}
          zoomControl={false}
          scrollWheelZoom={false}
        >
          <TileLayer attribution={mapSignature} url={mapDataUrl} id="mapbox.streets" accessToken={mapAccessToken} />
          {
            markers.map((markerData, i) => (
              <Marker
                key={i}
                position={markerData.position}
                icon={this.getSaturationIcon(R.uniqWith(R.eqProps('title'))(markerData.films).length)}
              >
                <Popup>
                  <div>
                    <FilmsList
                      list={R.uniqWith(R.eqProps('title'))(markerData.films)}
                    />
                  </div>
                </Popup>
              </Marker>
            ))
          }
          {
            locations.latest ?
              <Marker
                key="latest"
                position={locations.latest}
                icon={this.latestIcon}
              />
              : null
          }
        </Map>
        <LoaderContainer />
        <MarkersLegend />
      </div>
    );
  }
}

export default FilmsMap;
