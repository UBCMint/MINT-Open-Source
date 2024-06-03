import { useState } from "react";
import { Button } from "./button";
import { DownloadIcon } from "lucide-react";

const RunnerClip = ({ title }: { title: string }) => {
  const [buttonState, setButtonState] = useState("Download");

  const handleClick = () => {
    if (buttonState === "Download") {
      setButtonState("Downloading");
    } else if (buttonState === "Downloading") {
      setButtonState("Use");
    }
  };

  return (
    <div className="flex items-center justify-between border rounded-lg w-[389px] h-[84px] py-[22px] px-[20px] text-[#3F3F4C]">
      <div className="text-xl font-medium leading-none">{title}</div>
      <Button
        onClick={handleClick}
        className={
          buttonState === "Download"
            ? "bg-[#9CC8C4] hover:bg-[#7daba7] text-[#3F3F4C] gap-[10px]"
            : buttonState === "Downloading"
            ? "bg-gradient-to-r from-[#9CC8C4] to-white text-[#3F3F4C]"
            : "bg-[#9CC8C4] hover:bg-[#7daba7] text-[#3F3F4C]"
        }
      >
        {buttonState}
        {buttonState === "Download" && (
          <DownloadIcon className="w-[20px] h-[20px]" />
        )}
      </Button>
    </div>
  );
};

export default RunnerClip;
