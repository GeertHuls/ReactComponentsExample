import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Speaker from '../Speaker/Speaker';
import SpeakerSearchBar from '../SpeakerSearchBar/SpeakerSearchBar';

const Speakers = () => {

  function toggleSpeakerFavorite(speakerRec) {
    return {
      ...speakerRec,
      isFavorite: !speakerRec.isFavorite
    };
  }

  async function onFavoriteToggleHandler(speakerRec) {
    const toggledSpeakerRec = toggleSpeakerFavorite(speakerRec);
    const speakerIndex = speakers.map(s => s.id).indexOf(speakerRec.id);

    await axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, toggledSpeakerRec);
    setSpeakers(
      [
        ...speakers.slice(0, speakerIndex),
        toggledSpeakerRec,
        ...speakers.slice(speakerIndex + 1)
      ]);
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [speakers, setSpeakers] = useState([]);

  // the useEffect callback function is called when the 
  // component is ready to be interacted with. This is similar
  // to componentDidMount if we were using React classes.
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4000/speakers');
      setSpeakers(response.data);
    }
    fetchData();
  }, [] /* This is the react hook dependeny array. This is a list of objects, state and
    props, that when changed, cause a rerender of the page. For now this will be left empty,
    which means that the function passed in as our first parameter will be executed once
    when is done loading. */);

  return (
    <div>
      <SpeakerSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
        {speakers
          .filter((rec) => {
            const targetString = `${rec.firstName} ${rec.lastName}`.toLowerCase();
            return searchQuery.length === 0
              ? true
              : targetString.includes(searchQuery.toLowerCase());
          })
          .map((speaker) => (
              <Speaker key={speaker.id} {...speaker}
                onFavoriteToggle={() => onFavoriteToggleHandler(speaker)} />
          ))}
      </div>
    </div>
  );
};
export default Speakers;
