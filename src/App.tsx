import { useEffect, useState } from 'react';
import aituBridge from '@btsd/aitu-bridge';
import {
  IonApp,
  IonSlides,
  IonSlide,
  IonContent,
  IonButton,
  IonText,
} from '@ionic/react';

import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  }

  async function getMe() {
    try {
      const data = await aituBridge.getMe();
      setName(data.name);
    } catch (e) {
      // handle error
      console.log(e);
    }
  };

  useEffect(() => {
    if (aituBridge.isSupported()) {
      getMe();
    }
  }, []);

  const [name, setName] = useState('<username>');

  const handleButtonClick = () => {
    console.log('nextSlide');
  }

  return (
    <IonApp>
      <IonContent>
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide>
            <img src="/assets/slide1.png" />
            <div className="slide-block">
              <IonText color="primary">
                <h2>{`Привет, ${name}!`}</h2>
              </IonText>
              <p>С помощью этого мини-приложения, мы хотим показать тебе некоторые возможности платформы.</p>
            </div>
            <div className="slide-button">
              <IonButton expand="full" onClick={handleButtonClick}>Интересно</IonButton>
            </div>
          </IonSlide>
          <IonSlide>
            <img src="/assets/slide2.png" />
            <div className="slide-block">
              <IonText color="primary">
                <h2>Мини-приложения доступны всей аудитории Aitu</h2>
              </IonText>
              <p>А это +800 000 уникальных пользователей в месяц</p>
            </div>
            <div className="slide-button">
              <IonButton expand="full" onClick={handleButtonClick}>Зачем это бизнесу</IonButton>
            </div>
          </IonSlide>
          <IonSlide>
            <img src="/assets/slide3.png" />
            <div className="slide-block">
              <IonText color="primary">
                <h2>Легко найти</h2>
              </IonText>
              <p>Ваше приложение будет легко доступно всей аудитории Aitu. Каталог Aitu-приложений находится в центральной вкладке Aitu</p>
            </div>
            <div className="slide-button">
              <IonButton expand="full" onClick={handleButtonClick}>Далее</IonButton>
            </div>
          </IonSlide>
          <IonSlide>
            <img src="/assets/slide4.png" />
            <div className="slide-block">
              <IonText color="primary">
                <h2>Делитесь уникальными предложениями</h2>
              </IonText>
              <p>Донесите до всех пользователей Aitu о ваших интересных предложениях с помощью баннеров. При клике баннера откроется ваше мини-приложение</p>
            </div>
            <div className="slide-button">
              <IonButton expand="full" onClick={handleButtonClick}>Далее</IonButton>
            </div>
          </IonSlide>
          <IonSlide>
            <img src="/assets/slide5.png" />
            <div className="slide-block">
              <IonText color="primary">
                <h2>Коммуникация с пользователями</h2>
              </IonText>
              <p>Отправляйте пуш-уведомления своим пользователям</p>
            </div>
            <div className="slide-button">
              <IonButton expand="full" onClick={handleButtonClick}>Отправить пуш-уведомление</IonButton>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonApp>
  );
};

export default App;
