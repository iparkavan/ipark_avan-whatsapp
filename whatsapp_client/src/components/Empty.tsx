import Image from "next/image";
import React from "react";

function Empty() {
  return (
    <div className="flex flex-col w-full h-full border-l border-gray-2 00 items-center justify-center">
      <Image src={"/laptop-pic.png"} alt="whatsapp" height={300} width={300} />
    </div>
  );
}

export default Empty;
