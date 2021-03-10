import {useEffect, useRef, useState} from 'react';
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
  const slider = useRef<HTMLIonSlidesElement>(null)

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
    slider.current?.slideNext();
    console.log('nextSlide');
  }

  return (
    <IonApp>
      <IonContent>
        <IonSlides pager={true} options={slideOpts} ref={slider} >
          <IonSlide>
            <img src="/assets/slide1.png" />
            <div className="slide-block">
              <IonText color="dark">
                <h2>Мини-приложения в Aitu</h2>
              </IonText>
              <IonText> <sub>Расскажем, что это и как использовать aitu.apps для своего бизнеса</sub></IonText>
            </div>
            <div className="slide-button">
              <IonButton expand="full" onClick={handleButtonClick}>Я готов!</IonButton>
            </div>
          </IonSlide>
          <IonSlide>
            <img src="/assets/slide2.png" />
            <div className="slide-block">
              <IonText color="dark">
                <h2>+800.000 пользователей Aitu</h2>
              </IonText>
              <IonText> <sub>Могут увидеть ваше мини-приложение и стать его пользователями</sub></IonText>
            </div>
            <div className="slide-button">
              <IonButton expand="full" onClick={handleButtonClick}>Интересно</IonButton>
            </div>
          </IonSlide>
          <IonSlide>
            <img src="/assets/slide3.png" />
            <div className="slide-block">
              <IonText color="dark">
                <h2>Всегда под рукой </h2>
              </IonText>
              <IonText> <sub>Каталог с мини-приложениями находится на центральной вкладке. Пользователи легко его найдут</sub></IonText>
            </div>
            <div className="slide-button">
              <IonButton expand="full" onClick={handleButtonClick}>Что ещё?</IonButton>
            </div>
          </IonSlide>
          <IonSlide>
            <img src="/assets/slide4.png" />
            <div className="slide-block">
              <IonText color="dark">
                <h2>Баннер с ваши предложением</h2>
              </IonText>
              <IonText> <sub>Уникальная скидка, спецпредложение или акция. Донесите ценное предложение до всех пользователей Aitu</sub></IonText>
            </div>
            <div className="slide-button">
              <IonButton expand="full" onClick={handleButtonClick}>Далее</IonButton>
            </div>
          </IonSlide>
          <IonSlide>
            <img src="/assets/slide5.png" />
            <div className="slide-block">
              <IonText color="dark">
                <h2>Коммуникация с пользователями</h2>
              </IonText>
              <IonText><sub>Отправляйте пуш-уведомления своим пользователям</sub></IonText>
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
