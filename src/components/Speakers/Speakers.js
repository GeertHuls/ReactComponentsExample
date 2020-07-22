import React, { useState, useEffect, useReducer } from 'react';
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

    try {
      await axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, toggledSpeakerRec);
      dispatch({
        speakers: [
          ...speakers.slice(0, speakerIndex),
          toggledSpeakerRec,
          ...speakers.slice(speakerIndex + 1)
        ],
        type: 'GET_ALL_SUCCESS',
      });
    } catch (e) {
      dispatch({
        status: REQUEST_STATUS.ERROR,
        type: 'UPDATE_STATUS',
      });
      setError(e);
    }
  }

  const [searchQuery, setSearchQuery] = useState('');

  const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'GET_ALL_SUCCESS':
        return {
          ...state,
          status: REQUEST_STATUS.SUCCESS,
          speakers: action.speakers,
        };
      case 'UPDATE_STATUS':
        return {
          ...state,
          status: action.status,
        };
    }
  };

  const [{ speakers, status }, dispatch] = useReducer(reducer, {
    status: REQUEST_STATUS.LOADING,
    speakers: [],
  });

  const [error, setError] = useState({});

  // the useEffect callback function is called when the 
  // component is ready to be interacted with. This is similar
  // to componentDidMount if we were using React classes.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/speakers');
        dispatch({
          speakers: response.data,
          type: 'GET_ALL_SUCCESS',
        });
      } catch (e) {
        dispatch({
          status: REQUEST_STATUS.ERROR,
          type: 'UPDATE_STATUS',
        });
        setError(e);
      }
    }
    fetchData();
  }, [] /* This is the react hook dependeny array. This is a list of objects, state and
    props, that when changed, cause a rerender of the page. For now this will be left empty,
    which means that the function passed in as our first parameter will be executed once
    when is done loading. */);

  const success = status === REQUEST_STATUS.SUCCESS;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const hasErrored = status === REQUEST_STATUS.ERROR;

  return (
    <div>
      <SpeakerSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isLoading && <div>Loading...</div>}
      {hasErrored && (
        <div>
          Loading error... Is the json-server running? (try "npm run
          json-server" at terminal prompt)
          <br />
          <b>ERROR: {error.message}</b>
        </div>
      )}
      {success && (
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
      )}
    </div>
  );
};
export default Speakers;
