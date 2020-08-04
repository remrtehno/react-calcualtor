import React, {useEffect, useState} from "react";
import { ProGallery } from 'pro-gallery';
import Section from "../../../common/ui/section/section";
import Container from "../../../common/ui/container/Container";
import s from "./GalleryScreen.module.scss";
import 'pro-gallery/dist/statics/main.css';
import bg from "../../../../assets/works-bg.jpg";
import {get} from "../../../../api";
import HOST_URL, {GALLERY_URL} from "../../../../constants/constants";

let items1 = [
  {
    "itemId": "541",
    "mediaUrl": "https://sibiria-design.ru/wp-content/cache/thumb/5c/6ed28edcf94515c_418x418.png",
    "metaData": {
      "type": "image",
      "width": "600",
      "height": "600",
      "title": "Квартира 40 м2",
      "description": "\nг. Сургут, ул. Ленина, 36\n",
      "focalPoint": [
        0,
        0
      ],
      "link": {
        "url": "https://sibiria-design.ru/wp-content/uploads/2020/03/5.png",
        "target": ""
      }
    }
  },
  {
    "itemId": "540",
    "mediaUrl": "https://sibiria-design.ru/wp-content/cache/thumb/18/b3a810979baf918_418x418.jpg",
    "metaData": {
      "type": "image",
      "width": "600",
      "height": "600",
      "title": "Квартира, 120 м2",
      "description": "\nг. Сургут, ул. Пушкина, 16\n",
      "focalPoint": [
        0,
        0
      ],
      "link": {
        "url": "https://sibiria-design.ru/wp-content/uploads/2020/03/АС2-Детская-финал4.jpg",
        "target": ""
      }
    }
  },
  {
    "itemId": "539",
    "mediaUrl": "https://sibiria-design.ru/wp-content/cache/thumb/b8/04306f7d747eab8_418x418.jpg",
    "metaData": {
      "type": "image",
      "width": "600",
      "height": "600",
      "title": "Санузел, 8 м2",
      "description": "\nг. Сургут, ул. Энергетиков, 1\n",
      "focalPoint": [
        0,
        0
      ],
      "link": {
        "url": "https://sibiria-design.ru/wp-content/uploads/2020/03/АС-санузел-м3.jpg",
        "target": ""
      }
    }
  },
  {
    "itemId": "359",
    "mediaUrl": "https://sibiria-design.ru/wp-content/cache/thumb/b0/b431bb6827d4cb0_418x418.png",
    "metaData": {
      "type": "image",
      "width": "600",
      "height": "600",
      "title": "Квартира, 42 м2",
      "description": "\nг. Сургут, ул. Профсоюзов, 34\n",
      "focalPoint": [
        0,
        0
      ],
      "link": {
        "url": "https://sibiria-design.ru/wp-content/uploads/2020/03/3-3.png",
        "target": ""
      }
    }
  },
  {
    "itemId": "358",
    "mediaUrl": "https://sibiria-design.ru/wp-content/cache/thumb/1f/44e276f5baec51f_418x418.png",
    "metaData": {
      "type": "image",
      "width": "600",
      "height": "600",
      "title": "Спальня, 22 м2",
      "description": "\nг. Сургут, ул. С. Билецкого, 5\n",
      "focalPoint": [
        0,
        0
      ],
      "link": {
        "url": "https://sibiria-design.ru/wp-content/uploads/2020/03/1-4.png",
        "target": ""
      }
    }
  },
  {
    "itemId": "357",
    "mediaUrl": "https://sibiria-design.ru/wp-content/cache/thumb/ec/10fa5165dbb9fec_418x418.png",
    "metaData": {
      "type": "image",
      "width": "600",
      "height": "600",
      "title": "Квартира, 43 м2",
      "description": "\nг. Сургут, ул. Лермонтова, 11\n",
      "focalPoint": [
        0,
        0
      ],
      "link": {
        "url": "https://sibiria-design.ru/wp-content/uploads/2020/03/8.png",
        "target": ""
      }
    }
  },
  {
    "itemId": "356",
    "mediaUrl": "https://sibiria-design.ru/wp-content/cache/thumb/54/11fed271250d154_418x418.jpg",
    "metaData": {
      "type": "image",
      "width": "600",
      "height": "600",
      "title": "КВАРТИРА, 40 М2",
      "description": "\nг. Сургут, ул. Просвещения, 17\n",
      "focalPoint": [
        0,
        0
      ],
      "link": {
        "url": "https://sibiria-design.ru/wp-content/uploads/2020/03/5.jpg",
        "target": ""
      }
    }
  },
  {
    "itemId": "355",
    "mediaUrl": "https://sibiria-design.ru/wp-content/cache/thumb/95/04c335e55ba3995_418x418.png",
    "metaData": {
      "type": "image",
      "width": "600",
      "height": "600",
      "title": "Квартира, 45 м2",
      "description": "\nг. Сургут, ул. Югорская, 17\n",
      "focalPoint": [
        0,
        0
      ],
      "link": {
        "url": "https://sibiria-design.ru/wp-content/uploads/2020/03/4-6.png",
        "target": ""
      }
    }
  }
];

const options = {
  imageMargin: 15,
  collageDensity: 0.8,
  cubeRatio: 1,
  gallerySize: 50,
  groupSize: 3,
  groupTypes: '1,2h,2v,3t,3b,3l,3r',
  allowTitle: true,
  allowSocial: true,
  loveButton: false,
  enableInfiniteScroll: true,
  loadMoreAmount: 'all',
  hoveringBehaviour: 'NO_CHANGE',
  itemClick: 'expand',
  arrowsSize: 23,
  galleryHorizontalAlign: 'center',
  galleryVerticalAlign: 'center',
  calculateTextBoxWidthMode: 'PERCENT',
  textBoxWidthPercent: 50,
  textBoxWidth: 200,
  overlayAnimation: 'NO_EFFECT',
  imageHoverAnimation: 'NO_EFFECT',
  imageLoadingMode: 'BLUR',
  scrollAnimation: 'NO_EFFECT',
  imageQuality: 90,
  allowDescription: true,
};


const GalleryScreen = () => {
    const [container, setContainer] = useState(null);
    const [state, setState] = useState([]);

    useEffect(() => {
      const parent = document.getElementById('galleryRoot');
      setContainer({
        width: parent.offsetWidth,
        height: parent.offsetHeight
      });

      get(GALLERY_URL).then(res => {
        if (res) {
          setState(res);
        }
      });

    }, []);


  let items = state.map( ({id, title, featured_image, genre}) => {
    return {
        "itemId": (id).toString(),
        "mediaUrl": featured_image,
        "metaData": {
          "type": "image",
          "width": "600",
          "height": "600",
          "title": title.rendered,
          "description": genre,
          "focalPoint": [
            0,
            0
          ],
          "link": {
            "url": featured_image,
            "target": ""
          }
        }
      };
    });


    return(
      <Section id="gallery" style={{ backgroundImage: `url(${bg})` }} className={s.GalleryScreen}>
        <Container>
          <h2 className={'section-title'}>{state[0] ? state[0].galleryTitle : ""}</h2>
          <div className={'section-subtitle'}>{state[0] ? state[0].gallerySubTitle : ""}</div>
          <div id="galleryRoot">
            <ProGallery
              items={items}
              options={options}
              container={container}
              scrollingElement={() => window}
            />
          </div>
        </Container>
      </Section>
    );
};

export default GalleryScreen;
