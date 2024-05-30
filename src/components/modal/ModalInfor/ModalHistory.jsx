import { useEffect, useState } from "react";
import ModalInfor from ".";
import IconArrow from "../../../assets/icon/IconArrow";
import IconHistory from "../../../assets/icon/IconHistory";
import { saveData, getData } from "../../../utils/storage";

const openHistory = getData("openHistory") || false;

function ModalHistoryChildren() {
  const page = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const [active, setActive] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (getData("openHistory")) {
      const dataHis = getData("dataHistory");
      // setData(JSON.parse(dataHis));
    }
  }, [localStorage.getItem("openHistory")]);

  return (
    <div>
      <div className="flex text-[12px] font-[500] text-[#94A7C6] mb-[8px]">
        <p className="ml-[2rem]">SpinID</p>
        <p className="ml-[6.5rem]">Win</p>
        <p className="ml-[7rem]">Times</p>
      </div>
      <ul className="p-[8px] rounded-[8px] border border-solid border-[#1D2535] mb-[24px]">
        {(!data || data.length == 0) && (
          <img src="/images/slot-game/not_found.png" alt="not found"></img>
        )}
        {!!data &&
          data.map((item) => (
            <li
              key={item.id}
              className="px-[27px] py-[16px] flex justify-between text-[16px] font-[500] hover:bg-[#131924] rounded-[8px] transition-all"
            >
              <p>{item?.spinID}</p>
              <p>{item?.spinData?.reward}</p>
              <p>{new Date(item?.timestamp).toLocaleDateString("en-US")}</p>
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
                saveData("pageHistory", item.id)
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
  document.querySelector(".sl-wrapper-modal-time").style.display = "none";
  saveData("openHistory", false);
};
function ModalHistory({ open }) {
  return (
    <ModalInfor
      open={open}
      title="History"
      icon={<IconHistory />}
      Children={<ModalHistoryChildren />}
      wrapClassName="sl-wrapper-modal-time"
      maskStyle={{ display: "none" }}
      handleCancel={handleCancel}
    />
  );
}

export default ModalHistory;
