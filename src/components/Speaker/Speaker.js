import React from 'react';

import SpeakerImage from '../SpeakerImage/SpeakerImage';
import SpeakerFavoriteButton from '../SpeakerFavoriteButton/SpeakerFavoriteButton';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const SpeakerComponent = ({ id, bio, firstName, lastName, isFavorite, put }) => (
  <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
    <div className="grid grid-cols-4 mb-6">
      <div className="font-bold text-lg col-span-3">{`${firstName} ${lastName}`}</div>
      <div className="flex justify-end">
        <SpeakerFavoriteButton isFavorite={isFavorite}
            onFavoriteToggle={() => {
              put({
                id,
                firstName,
                lastName,
                bio,
                isFavorite: !isFavorite
              });
            }} />
      </div>
    </div>
    <div className="mb-6">
      <SpeakerImage id={id} />
    </div>
    <div>{bio.substr(0, 70) + '...'}</div>
  </div>
);

// React.memo returns a cached version in case the output hasn't changed.
const Speaker = React.memo((props) => {
  return (
    <ErrorBoundary>
      <SpeakerComponent {...props} />
    </ErrorBoundary>
  );
});

export default Speaker;