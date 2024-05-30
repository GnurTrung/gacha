import { useState } from "react";
import { Modal } from "antd";

function ModalWin({ open }) {
  const [isOpen, setIsOpen] = useState(open);

  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      width={795}
      centered
      className="custom-modal modalWin"
      closable={false}
      footer={[]}
      wrapClassName="sl-wrapper-modal-win"
      maskStyle={{display: "none"}}
    >
      <div className="p-[32px]">
        <div className="flex flex-col items-center filterGradient">
          <h2 className="text-[24px] font-[500] text-[#94A7C6]">
            You have won
          </h2>
          <img src="/images/slot-game/jackpot_text.png" alt="err" />

          <div className="flex items-center">
            <img
              className="w-[5rem]"
              src="/images/slot-game/diamond_point.png"
              alt="err"
            />
            <p className="font-[700] text-[48px] text-white" id='slotgame-jp-win'></p>
          </div>
        </div>
        {/* Footer */}
        <div className="flex gap-[0.8rem] justify-center mt-[40px]">
          <button
            onClick={handleCancel}
            className="btn-secondary w-[266px]"
          >
            Cancel
          </button>
        </div>
        {/* End Footer */}
      </div>
    </Modal>
  );
}

export default ModalWin;
