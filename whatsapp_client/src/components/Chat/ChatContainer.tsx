import React from "react";

function ChatContainer() {
  return (
    <div className="w-full h-[82vh] relative overflow-auto custom-scrollbar1">
      <div className="bg-chat-background bg-[#efeae2] bg-fixed w-full h-full">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
