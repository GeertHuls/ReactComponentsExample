import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';
import SpeakerSearchBar from '../components/SpeakerSearchBar/SpeakerSearchBar';
import Speakers from '../components/Speakers/Speakers';
import Footer from '../components/Footer/Footer';
import SpeakerContext from '../components/Speakers/SpeakerContext';

export default function Page() {
  const speakers = [
    { imageSrc: 'speaker-component-1124', name: 'Douglas Crockford' },
    { imageSrc: 'speaker-component-1530', name: 'Tamara Baker' },
    { imageSrc: 'speaker-component-10803', name: 'Eugene Chuvyrov' },
];

  return (
    <div>
      <Header />
      <Menu />
      <SpeakerContext.Provider value={speakers}>
        <SpeakerSearchBar />
        <Speakers />
      </SpeakerContext.Provider>
      <Footer />
    </div>
  );
}