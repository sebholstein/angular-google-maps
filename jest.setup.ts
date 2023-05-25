import 'jest-preset-angular/setup-jest';

(window as any).google = {
  maps: {
    Animation: { BOUNCE: 1, DROP: 2 },
    GeocoderStatus: {
      OK: 'OK',
      UNKNOWN_ERROR: 'UNKNOWN_ERROR',
      OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
      REQUEST_DENIED: 'REQUEST_DENIED',
      INVALID_REQUEST: 'INVALID_REQUEST',
      ZERO_RESULTS: 'ZERO_RESULTS',
      ERROR: 'ERROR',
    },
    MapTypeId: {
      ROADMAP: 'roadmap',
      SATELLITE: 'satellite',
      HYBRID: 'hybrid',
      TERRAIN: 'terrain',
    },
    StrokePosition: { CENTER: 0, INSIDE: 1, OUTSIDE: 2 },
    SymbolPath: {
      BACKWARD_CLOSED_ARROW: 3,
      BACKWARD_OPEN_ARROW: 4,
      CIRCLE: 0,
      FORWARD_CLOSED_ARROW: 1,
      FORWARD_OPEN_ARROW: 2,
    },
  },
};
