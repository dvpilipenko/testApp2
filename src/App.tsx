import { useEffect, useRef, useState } from "react";
import aituBridge from "@btsd/aitu-bridge";
import {
  IonApp,
  IonSlides,
  IonSlide,
  IonContent,
  IonButton,
  IonText,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent
} from "@ionic/react";

import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

interface ISlideContentProps {
  title: string;
  onClick: () => void;
  description: string;
  buttonTitle: string;
  imgSrc: string;
}

const SlideContent: React.FC<ISlideContentProps> = ({
  onClick,
  title,
  description,
  buttonTitle,
  imgSrc,
}) => {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <img src={imgSrc}/>
          <IonCardTitle >{title}</IonCardTitle>
          <br/>
          <IonCardSubtitle>{description}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonButton onClick={onClick}>{buttonTitle}</IonButton>
        </IonCardContent>
      </IonCard>
    </>
  );
};

const App: React.FC = () => {
  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  const slider = useRef<HTMLIonSlidesElement>(null);

  async function getMe() {
    try {
      const data = await aituBridge.getMe();
      setName(data.name);
    } catch (e) {
      // handle error
      console.log(e);
    }
  }

  useEffect(() => {
    if (aituBridge.isSupported()) {
      getMe();
    }
  }, []);

  const [name, setName] = useState("<username>");

  const handleButtonClick = () => {
    slider.current?.slideNext();
    console.log(slider.current)
  };

  return (
    <IonApp>
      <IonContent>
        <IonSlides pager={true} options={slideOpts} ref={slider}>
          <IonSlide>
            <SlideContent
              title={`Привет, ${name},Не надо вводить адрес`}
              onClick={handleButtonClick}
              description={
                "Нужно всего лишь предоставить доступ к геолокации"
              }
              buttonTitle={"предоставить"}
              imgSrc={"/assets/locations.svg"}
            ></SlideContent>
          </IonSlide>
          <IonSlide>
            <SlideContent
                title={"Не надо регистрироваться"}
                onClick={handleButtonClick}
                description={
                  "Нужно всего лишь предоставить доступ к номеру"
                }
                buttonTitle={"предоставить"}
                imgSrc={"/assets/person.svg"}
            ></SlideContent>
          </IonSlide>
          <IonSlide>
            <SlideContent
                title={"Делитесь с друзьями"}
                onClick={handleButtonClick}
                description={
                  "Для тех кто любит делиться"
                }
                buttonTitle={"поделиться"}
                imgSrc={"/assets/share.svg"}
            ></SlideContent>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonApp>
  );
};

export default App;
