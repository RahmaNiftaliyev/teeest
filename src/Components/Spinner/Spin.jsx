import React from 'react'

function Spin() {
  return (
    <div className="w-60 h-60 rounded-full relative -scale-[0.2]">
      <div className="w-60 h-60 absolute text-center rotate-0">
        <div className="custom-spinner-dot w-10 h-10 bg-[#d9d9d9] rounded-full transition-all"></div>
      </div>
      <div className="w-60 h-60 absolute text-center rotate-[45deg]">
        <div className="custom-spinner-dot w-10 h-10 bg-[#d9d9d9] rounded-full transition-all"></div>
      </div>
      <div className="w-60 h-60 absolute text-center rotate-[90deg]">
        <div className="custom-spinner-dot w-10 h-10 bg-[#d9d9d9] rounded-full transition-all"></div>
      </div>
      <div className="w-60 h-60 absolute text-center rotate-[135deg]">
        <div className="custom-spinner-dot w-10 h-10 bg-[#d9d9d9] rounded-full transition-all"></div>
      </div>
      <div className="w-60 h-60 absolute text-center rotate-[180deg]">
        <div className="custom-spinner-dot w-10 h-10 bg-[#d9d9d9] rounded-full transition-all"></div>
      </div>
      <div className="w-60 h-60 absolute text-center rotate-[225deg]">
        <div className="custom-spinner-dot w-10 h-10 bg-[#d9d9d9] rounded-full transition-all"></div>
      </div>
      <div className="w-60 h-60 absolute text-center rotate-[270deg]">
        <div className="custom-spinner-dot w-10 h-10 bg-[#d9d9d9] rounded-full transition-all"></div>
      </div>
      <div className="w-60 h-60 absolute text-center rotate-[315deg]">
        <div className="custom-spinner-dot w-10 h-10 bg-[#d9d9d9] rounded-full transition-all"></div>
      </div>
    </div>
  )
}

export default Spin