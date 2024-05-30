import { useEffect, useState } from "react";
import ModalInfor from ".";
import IconArrow from "../../../assets/icon/IconArrow";
import IconRanking from "../../../assets/icon/IconRanking";
import { formatWallet, getData } from "../../../utils/storage";

function ModalHistoryChildren() {
  const page = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  const [active, setActive] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (getData("openRank")) {
      const dataRank = getData("dataRank");
      // setData(JSON.parse(dataRank));
    }
  }, [localStorage.getItem("openRank")]);

  return (
    <div>
      <div className="flex text-[12px] font-[500] text-[#94A7C6] mb-[8px]">
        <p className="ml-[2rem]">No.</p>
        <p className="ml-[7rem]">SpinID</p>
        <p className="ml-[8rem]">Win</p>
      </div>
      <ul className="p-[8px] rounded-[8px] border border-solid border-[#1D2535] mb-[24px]">
        {!!data &&
          data.map((item, index) => (
            <li
              key={index}
              className="px-[27px] py-[16px] flex text-[16px] font-[500] hover:bg-[#131924] rounded-[8px] transition-all"
            >
              <p>{index + 1}</p>
              <p className=" text-[#00C089] ml-[7rem]">{formatWallet(item?.address)}</p>
              <p className="ml-[5rem]">{item?.point}</p>
            </li>
          ))}
      </ul>
      {/* <div className="flex justify-center">
        <IconArrow className="cursor-pointer" />
        <ul className="flex gap-[20px] text-[16px] font-[500] text-[#94A7C6] px-[20px]">
          {page.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer ${
                active == item.id && "text-[#00C089]"
              }`}
              onClick={() => {
                setActive(item.id);
              }}
            >
              {item.id}
            </li>
          ))}
        </ul>
        <IconArrow className="rotate-180 cursor-pointer" />
      </div> */}
    </div>
  );
}
const handleCancel = () => {
  const mask = document.querySelector(".ant-modal-mask");
  if (mask) document.querySelector(".ant-modal-mask").style.display = "none";
  document.querySelector(".sl-wrapper-modal-rank").style.display = "none";
};

function ModalHistory({ open }) {
  return (
    <ModalInfor
      open={open}
      title="Ranking"
      icon={<IconRanking />}
      Children={<ModalHistoryChildren />}
      wrapClassName="sl-wrapper-modal-rank"
      maskStyle={{ display: "none" }}
      handleCancel={handleCancel}
    />
  );
}

export default ModalHistory;
