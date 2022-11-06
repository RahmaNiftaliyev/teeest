import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const BranchCard = ({ customScaleValue, salonBranch}) => {
  const [scale, setScale] = useState('1')
  const { t } = useTranslation();
  useEffect(() => {
    let value = customScaleValue * 4.5 * 10
    let newVal = "0." + value;
    setScale(newVal);
    
  }, [customScaleValue, scale])
  return (
    <div style={{scale: scale }} className={`origin-bottom-left w-60 h-80 cursor-default rounded-[12px] bg-white flex flex-col justify-between overflow-hidden -mt-80`}>
        <div className='p-4 flex flex-col justify-center '>
            <img className='rounded-[12px]' src={'https://thassaneespa.com/wp-content/uploads/2020/10/atikah-akhtar-6xlyKFFvufg-unsplash.jpg'} alt="" />
            <h3 className=" font-medium leading-6 m-0 text-base mt-[10px] mb-1">
                {salonBranch?.name}
            </h3>
            <p className="font-light text-[13px] leading-5 text-[#8c8c8c] m-0 ">
                {salonBranch?.address}
            </p>
        </div>
        <Link to={`treatments/branch/${salonBranch?.id}`}>
          <button className='bg-[#7338ac] w-full py-[13px]  relative z-10 cursor-pointer font-normal text-sm text-white'>{t("book_now")}</button>
        </Link>
    </div>
  )
}

export default BranchCard