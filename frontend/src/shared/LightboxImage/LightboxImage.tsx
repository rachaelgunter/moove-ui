/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CSSProperties } from '@material-ui/styles';
import React, { FC, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

interface LightboxImageProps {
  imgUrl: string;
  imgStyles: CSSProperties;
}

const LightboxImage: FC<LightboxImageProps> = ({
  imgUrl,
  imgStyles,
}: LightboxImageProps) => {
  const [isLightboxOpened, setIsLightBoxOpened] = useState(false);

  const openLightbox = () => {
    setIsLightBoxOpened(true);
  };

  const closeLightbox = () => {
    setIsLightBoxOpened(false);
  };

  return (
    <>
      <img onClick={openLightbox} style={imgStyles} src={imgUrl} alt={imgUrl} />
      {isLightboxOpened && (
        <Lightbox
          reactModalStyle={{
            overlay: {
              zIndex: 99999,
            },
          }}
          mainSrc={imgUrl}
          onCloseRequest={closeLightbox}
        />
      )}
    </>
  );
};

export default LightboxImage;
