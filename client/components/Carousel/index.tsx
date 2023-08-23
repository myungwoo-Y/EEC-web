import React from 'react';
import 'flickity/css/flickity.css';
import Flickity, { FlickityOptions } from 'react-flickity-component';
import Image from 'next/image';
import { CarouselImages } from '@/model/carousel';

export default function Carousel() {
  const flickityOptions: FlickityOptions = {
    initialIndex: 0,
    autoPlay: true,
    lazyLoad: true,
  };

  return (
    <div className="w-full aspect-video mt-10 lg:mt-0 lg:w-[600px] lg:h-[300px] self-center">
      <Flickity
        className={'carousel'}
        options={flickityOptions}
        disableImagesLoaded={true}
        static={true}
        elementType="div"
      >
        {CarouselImages.map((src, idx) => (
          <Image
            src={src}
            width={600}
            height={300}
            alt="carousel content"
            key={idx}
            className="relative aspect-video lg:h-[300px]"
          />
        ))}
      </Flickity>
    </div>
  );
}
