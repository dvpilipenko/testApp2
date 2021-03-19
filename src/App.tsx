import { useEffect, useRef, useState } from "react";
import aituBridge from "@btsd/aitu-bridge";
import {
  IonApp,
  IonSlides,
  IonSlide,
  IonContent,
  IonButton,
  IonAlert,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
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
    <div className={"app-slide-content"}>
      <div className={"app-title"}>
        <IonCardTitle>Удобно для пользователя</IonCardTitle>
      </div>
      <IonCard>
        <IonCardHeader>
          <img src={imgSrc} />
          <IonCardTitle>{title}</IonCardTitle>
          <br />
          <IonCardSubtitle>{description}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonButton onClick={onClick}>{buttonTitle}</IonButton>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

const FirstSlideContent: React.FC<ISlideContentProps> = ({
  onClick,
  title,
  description,
  buttonTitle,
  imgSrc,
}) => {
  return (
    <>
      <img src={imgSrc} />
      <div className="slide-block">
        <IonText color="dark">
          <h2>{title}</h2>
        </IonText>
        <IonText>
          <sub>{description}</sub>
        </IonText>
      </div>
      <div className="slide-button">
        <IonButton expand="full" onClick={onClick}>
          {buttonTitle}
        </IonButton>
      </div>
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

  useEffect(() => {
    if (aituBridge.isSupported()) {
      getMe();
    }
  }, []);

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

  async function getGeo() {
    if (aituBridge.isSupported()) {
      try {
        const data = await aituBridge.getGeo();
        setGeoPosition(data);
        setShowPopupPosition(true);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function share() {
    if (aituBridge.isSupported()) {
      try {
        const data = await aituBridge.share("https://docs.aitu.io/");
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function getPhone() {
    if (aituBridge.isSupported()) {
      try {
        const data = await aituBridge.getPhone();
        setPhone(data.phone);
        setShowPopupPhone(true);
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {}, []);

  const [showPopupPosition, setShowPopupPosition] = useState(false);
  const [showPopupPhone, setShowPopupPhone] = useState(false);
  const [geoPosition, setGeoPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 0, longitude: 0 });
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("<username>");
  const handleButtonClick = () => {
    slider.current?.slideNext();
    console.log(slider.current);
  };

  return (
    <IonApp>
      <IonContent className={'content-container'}>
        <IonAlert
          isOpen={showPopupPosition}
          onDidDismiss={() => setShowPopupPosition(false)}
          header={"Ваше местоположение"}
          message={`Долгота: ${geoPosition.longitude}, Ширина: ${geoPosition.latitude}`}
          buttons={["Ясно"]}
        />
        <IonAlert
          isOpen={showPopupPhone}
          onDidDismiss={() => setShowPopupPhone(false)}
          header={"Ваш телефон"}
          message={phone}
          buttons={["Ясно"]}
        />
        <IonSlides
          pager={true}
          options={slideOpts}
          ref={slider}
        >
          <IonSlide>
            <FirstSlideContent
              title={`Привет, ${name}`}
              description={
                "Расскажем, что это и как использовать aitu.apps для своего бизнеса"
              }
              buttonTitle={"Я Готов!"}
              imgSrc={"/assets/slide1.png"}
              onClick={() => slider.current?.slideNext()}
            ></FirstSlideContent>
          </IonSlide>
          <IonSlide>
            <FirstSlideContent
                title={"+800.000 пользователей Aitu"}
                onClick={handleButtonClick}
                description={
                  "Могут увидеть ваше мини-приложение и стать его пользователями"
                }
                buttonTitle={"Интересно"}
                imgSrc={"/assets/slide2.png"}
            ></FirstSlideContent>
          </IonSlide>
          <IonSlide>
            <FirstSlideContent
                title={"Всегда под рукой "}
                onClick={handleButtonClick}
                description={
                  "Каталог с мини-приложениями находится на центральной вкладке. Пользователи легко его найдут"
                }
                buttonTitle={"Что ещё?"}
                imgSrc={"/assets/slide3.png"}
            ></FirstSlideContent>
          </IonSlide>
          <IonSlide>
            <FirstSlideContent
                title={"Баннер с ваши предложением"}
                onClick={handleButtonClick}
                description={
                  "         Уникальная скидка, спецпредложение или акция. Донесите ценное предложение до всех пользователей Aitu"
                }
                buttonTitle={"Далее"}
                imgSrc={"/assets/slide4.png"}
            ></FirstSlideContent>
          </IonSlide>
          <IonSlide>
            <SlideContent
              title={`Не надо вводить адрес`}
              onClick={getGeo}
              description={"Можно легко передать координаты"}
              buttonTitle={"Предоставить"}
              imgSrc={"/assets/locations.svg"}
            ></SlideContent>
          </IonSlide>
          <IonSlide>
            <SlideContent
              title={"Не надо регистрироваться"}
              onClick={getPhone}
              description={"Нужно всего лишь предоставить доступ к номеру"}
              buttonTitle={"Предоставить"}
              imgSrc={"/assets/person.svg"}
            ></SlideContent>
          </IonSlide>
          <IonSlide>
            <SlideContent
              title={"Делитесь с друзьями"}
              onClick={share}
              description={"Для тех кто любит делиться"}
              buttonTitle={"Поделиться"}
              imgSrc={"/assets/share.svg"}
            ></SlideContent>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonApp>
  );
};

export default App;
