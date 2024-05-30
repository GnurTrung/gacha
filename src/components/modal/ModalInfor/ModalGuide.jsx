import { useState } from "react";
import ModalInfor from ".";
import IconInfor from "../../../assets/icon/IconInfor";

function ModalGuideChildren() {
  const guideItem = [
    {
      id: 1,
      img: "/images/slot-game/guide/logo_inventory.png",
      x3: "Jackpot",
      x2: "---",
    },
    {
      id: 2,
      img: "/images/slot-game/guide/water_melon.png",
      x3: "200",
      x2: "20",
    },
    {
      id: 3,
      img: "/images/slot-game/guide/orange_.png",
      x3: "100",
      x2: "15",
    },
    {
      id: 4,
      img: "/images/slot-game/guide/plum.png",
      x3: "75",
      x2: "10",
    },
    {
      id: 5,
      img: "/images/slot-game/guide/kiwi.png",
      x3: "35",
      x2: "5",
    },
    {
      id: 6,
      img: "/images/slot-game/guide/cherry.png",
      x3: "25",
      x2: "2",
    },
  ];
  return (
    <div>
      <div>
        <div className="px-[53px] flex justify-between text-[12px] font-[500] text-[#94A7C6] mb-[8px]">
          <p></p>
          <p>x3</p>
          <p>x2</p>
        </div>
        <ul className="p-[8px] rounded-[8px] border border-solid border-[#1D2535] mb-[24px]">
          {guideItem.map((item) => (
            <li
              key={item.id}
              className="px-[45px] py-[16px] flex justify-between text-[16px] font-[500]"
            >
              <img src={item.img} alt="err" className="w-[24px]" />
              <p>{item.x3}</p>
              <p>{item.x2}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-[16px] font-[400] text-[#94A7C6]">
        <span className="text-[#00C089]">Wild </span>symbol replaces all
        symbols. Winning combinations must be consecutive, from left to right.
      </div>
    </div>
  );
}
const handleCancel = () => {
  const mask = document.querySelector(".ant-modal-mask")
  if (mask) document.querySelector(".ant-modal-mask").style.display = "none";
  document.querySelector(".sl-wrapper-modal-info").style.display = "none";
};
function ModalGuide({ open }) {
  return (
    <ModalInfor
      open={open}
      title="Guide"
      icon={<IconInfor />}
      Children={<ModalGuideChildren />}
      wrapClassName="sl-wrapper-modal-info"
      maskStyle={{display: "none"}}
      handleCancel={handleCancel}
    />
  );
}

export default ModalGuide;
