import { useState } from "react";
import { SlackSelector } from "@charkour/react-reactions";
import { AnimatePresence, motion } from "framer-motion";

const EmojiPicker = ({
  onEmojiSelect,
}: {
  onEmojiSelect: (emoji: string) => void;
}) => {
  const [showPicker, setShowPicker] = useState(false);

  // background-position:0 -386px;background-size:auto;width:16px;height:16px;background-repeat:no-repeat;display:inline-block

  return (
    <div className="relative">
      <span
        className="mr-2 hover:bg-gray-200 rounded-full cursor-pointer p-2 flex items-center justify-center"
        onClick={() => setShowPicker(!showPicker)}
      >
        <i
          style={{
            backgroundImage:
              "url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/mUiFX7bN0Dk.png)",
            backgroundPosition: "0 -386px",
            backgroundSize: "auto",
            width: "16px",
            height: "16px",
            backgroundRepeat: "no-repeat",
            display: "inline-block",
          }}
        ></i>
      </span>
      <AnimatePresence>
        {showPicker && (
          <motion.div
            className="absolute top-10 left-0 right-12 z-20 shadow-lg w-full"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
          >
            <SlackSelector onSelect={(emoji) => onEmojiSelect(emoji)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmojiPicker;
