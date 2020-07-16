import React from 'react';
const Speakers = ({speakers}) => {
    return (
    <div>
      {speakers.map(({ imageSrc, name }) => {
        return (
          <img src={`/images/${imageSrc}.png`} alt={name} key={imageSrc}></img>
        );
      })}
    </div>
  );
};

const EnhancedSpeakerComponent = withData(Speakers);

function withData(Component) {
    const speakers = [
        { imageSrc: 'speaker-component-1124', name: 'Douglas Crockford' },
        { imageSrc: 'speaker-component-1530', name: 'Tamara Baker' },
        { imageSrc: 'speaker-component-10803', name: 'Eugene Chuvyrov' },
      ];
    return function() {
        return <Component speakers={speakers}></Component>;
    }
}

export default EnhancedSpeakerComponent;
