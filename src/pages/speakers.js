import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';
import SpeakerSearchBar from '../components/SpeakerSearchBar/SpeakerSearchBar';
import Speakers from '../components/Speakers/Speakers';
import Footer from '../components/Footer/Footer';

export default function Page() {
  return (
    <div>
      <Header />
      <Menu />
      <SpeakerSearchBar />
      <Speakers />
      <Footer />
    </div>
  );
}