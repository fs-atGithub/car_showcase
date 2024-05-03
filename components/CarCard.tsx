'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CarProps } from '@/types';
import { CarDetails, CustomButton } from '@/components';
import { calculateCarRent, generateCarImageUrl } from '@/utils';

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  //Konstante

  const { city_mpg, drive, make, model, transmission, year } = car;
  const carRent = calculateCarRent(city_mpg, year);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start  text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end  text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="car"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-contain"
        />
      </div>
      <div className="relative flex mt-2 w-full">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center gap-2">
            <Image
              src="/steering-wheel.svg"
              alt="steering-wheel"
              height={20}
              width={20}
            />
            <p className="text-[14px]">
              {transmission === 'a' ? 'automatic' : 'manual'}
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex mt-2 w-full">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center gap-2">
            <Image src="/tire.svg" alt="tire" height={20} width={20} />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
        </div>
      </div>
      <div className="relative flex mt-2 w-full">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center gap-2">
            <Image src="/gas.svg" alt="fuel" height={20} width={20} />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="View more"
            containerStyles="w-full py-[16px] bg-primary-blue rounded-full"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
