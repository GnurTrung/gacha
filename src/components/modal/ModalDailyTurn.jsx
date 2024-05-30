import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import IconTick from "../../assets/icon/IconTick";
import { getData } from "../../utils/storage";

function ModalDailyTurn({ open }) {
  const [isOpen, setIsOpen] = useState(open);
  const handleCancel = () => {
    const mask = document.querySelector(".ant-modal-mask");
    if (mask) document.querySelector(".ant-modal-mask").style.display = "none";
    document.querySelector(".sl-wrapper-modal-turn").style.display = "none";
  };
  const [data, setData] = useState([]);
  const getClaimedTurn = (task) => {
    return task?.claimed || 0;
  };
  const getTotalTurn = (task) => {
    return task?.total || 0;
  };
  const getAvailableTurn = (task) => {
    return getTotalTurn(task) - getClaimedTurn(task);
  };
  const getAvailableAllTurns = () => {
    return (
      getAvailableTurn(data?.mintNFT) +
      getAvailableTurn(data?.trading) +
      getAvailableTurn(data?.lending) +
      getAvailableTurn(data?.completeAll) +
      getAvailableTurn(data?.completeQuest)
    );
  };
  useEffect(() => {
    // if (getData("openTurn")) {
    const dataRank = getData("dataTurn");
    // setData(JSON.parse(dataRank));
    // }
  }, [localStorage.getItem("openTurn")]);

  const DailyTask = [
    {
      id: 1,
      name: "Mint NFT",
      totalTask: `${getTotalTurn(data?.mintNFT)}/2`,
      turn: "",
      completed: getTotalTurn(data?.mintNFT) >= 2,
      canClaim:
        getAvailableTurn(data?.mintNFT) > 0 &&
        getClaimedTurn(data?.mintNFT) < 2,
    },
    {
      id: 2,
      name: "Complete Quests",
      totalTask: `${getTotalTurn(data?.completeQuest)}/10`,
      turn: "",
      completed: getTotalTurn(data?.completeQuest) >= 10,
      canClaim:
        getAvailableTurn(data?.completeQuest) > 0 &&
        getClaimedTurn(data?.completeQuest) < 10,
    },
    {
      id: 3,
      name: "NFT Marketplace Trading (10 txs/turn)",
      totalTask: `${getTotalTurn(data?.trading)}/2`,
      turn: "",
      completed: getTotalTurn(data?.trading) >= 2,
      canClaim:
        getAvailableTurn(data?.trading) > 0 &&
        getClaimedTurn(data?.trading) < 2,
    },
    {
      id: 4,
      name: "NFT Marketplace Lending (10 txs/turn)",
      totalTask: `${getTotalTurn(data?.lending)}/6`,
      turn: "",
      completed: getTotalTurn(data?.lending) >= 6,
      canClaim:
        getAvailableTurn(data?.lending) > 0 &&
        getClaimedTurn(data?.lending) < 6,
    },
    {
      id: 5,
      name: "Complete All Activities",
      totalTask: `${getTotalTurn(data?.completeAll)}/1`,
      turn: "2",
      completed: getTotalTurn(data?.completeAll) >= 1,
      canClaim:
        getAvailableTurn(data?.completeAll) > 0 &&
        getClaimedTurn(data?.completeAll) < 1,
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      width={655}
      centered
      className="custom-modal modalDailyTurn daily-turn-modal"
      closable={false}
      footer={[]}
      wrapClassName="sl-wrapper-modal-turn"
      maskStyle={{ display: "none" }}
    >
      <div className="p-[32px] text-white flex flex-col gap-[16px]">
        <h2 className="text-[24px] font-[500] ">Daily Turns</h2>
        <ul className="rounded-[8px] border border-solid border-[#1D2535] p-[24px] flex flex-col gap-[16px]">
          {DailyTask.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div className="flex gap-[8px]">
                <p className="text-[16px] font-[500]">{item.name}</p>
                <IconTick
                  className={`transition-all opacity-100 ${
                    !item.completed && "!opacity-0"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center gap-[9px]">
                <p className="text-[16px] font-[400]">{item.totalTask}</p>
                <Button disabled={!item.canClaim} className={`btn-primary`}>
                  Reiceve {item.turn} Turn
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between rounded-[8px] bg-[#131924] px-[24px] py-[23px] w-full text-[16px] font-[500]">
          <p>Total Turns</p>
          <p className="text-[#00C089]">{`${getAvailableAllTurns()} turns`}</p>
        </div>
        {/* Footer */}
        <div className="flex gap-[0.8rem] justify-center">
          <button onClick={handleCancel} className="btn-secondary w-full">
            Cancel
          </button>
          <Button
            disabled={getAvailableAllTurns() == 0}
            className="btn-primary w-full"
          >
            Receive All
          </Button>
        </div>
        {/* End Footer */}
      </div>
    </Modal>
  );
}

export default ModalDailyTurn;
