
// outsource dependencies
import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

// local dependencies

export function NotFound () {
  return <div className="not-found">
    <div className="text-center" style={{ width: 440, maxWidth: '95%' }}>
      <h2> Page not found </h2>
      <Button tag={Link} to="/" color="primary" className="rounded-pill"> Go to homepage </Button>
    </div>
  </div>;
}

export function Maintenance () {
  return <div className="maintenance">
    <div className="text-center" style={{ width: 640, maxWidth: '95%' }}>
      <h2> SITE IS UNDER MAINTENANCE </h2>
      <h5> We&#39;ll back online shortly! </h5>
    </div>
  </div>;
}
