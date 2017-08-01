import React from 'react';
import { connect } from 'react-redux';

/* you should not read the location state directly from the redux store.
this is because react router operates asynchronously and your component
tree may not yet be updated in sync with your redux state.
you should rely on the props passed by react router, as they are only
updated after it has processed all asynchronous code. */
const mapstatetoprops = (state, ownprops) => ({
  routing: ownprops.params.id,
});

const notfound = (routing) => (
  <div>Page not found for location {routing.location.pathname}!</div>
);

const notfoundcontainer = connect(
  mapstatetoprops
)(notfound);

export default notfoundcontainer;
