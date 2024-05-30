import { useState } from "react";
import { Modal } from "antd";

function ModalInfor({ open, icon, title, Children, handleCancel, wrapClassName,maskStyle }) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      width={466}
      centered
      className="custom-modal modalDailyTurn"
      closable={false}
      footer={[]}
      wrapClassName={wrapClassName}
      maskStyle={maskStyle}
    >
      <div className="text-white p-[32px]">
        {/* Tile */}
        <div className="flex items-center gap-[6px]">
          {icon}
          <p className="text-[24px] font-[500]">{title}</p>
        </div>
        {/* End title */}

        {/* Body */}
        <div className="my-[40px]">{Children}</div>
        {/* End body */}

        {/* Footer */}
        <button onClick={handleCancel} className="btn-secondary w-full">
          Cancel
        </button>
        {/* End Footer */}
      </div>
    </Modal>
  );
}

export default ModalInfor;
