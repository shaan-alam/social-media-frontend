import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import Modal from "../../Modal";
import { reactions as originalReactions } from "../PostActions/reactions";
import Avatar from "../../Avatar";
import { PostStatsModalInterface } from "./types";

const PostStatsModal = ({
  isOpen,
  setOpen,
  counters,
}: PostStatsModalInterface) => {
  const [reactionHeadings, setReactionHeadings] = useState<Array<string>>();
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    setReactionHeadings(
      Array.from(new Set(counters.map((counter) => counter.emoji)))
    );
  }, []);

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} modalTitle="Reactions...">
      <Tab.Group>
        <Tab.List className="px-6 sm:px-12 py-4 border-b-2 overflow-x-auto flex">
          <Tab key="All" as="div" className="mr-6">
            {({ selected }) => (
              <button
                onClick={() => setSelectedTab("All")}
                className={`${
                  selected ? "bg-blue-100" : "bg-white text-gray-500"
                } font-semibold px-7 py-2 rounded-lg hover:bg-blue-100 transition-all`}
              >
                <p>All</p>
              </button>
            )}
          </Tab>
          {reactionHeadings?.map((reaction) => (
            <Tab key={reaction} className="mr-6">
              {({ selected }) => (
                <button
                  onClick={() => setSelectedTab(reaction)}
                  className={`${
                    selected ? "bg-blue-100" : "bg-white text-gray-500"
                  } font-semibold px-7 py-2 rounded-lg flex items-center justify-around hover:bg-blue-100 transition-all`}
                >
                  <img
                    src={originalReactions[reaction].icon}
                    className="h-7 w-7 rounded-full"
                  />
                  <p className="">&nbsp;{reaction}</p>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="h-72 overflow-y-auto">
          <Tab.Panel>
            {counters.map((counter) => (
              <div className="py-4 px-12 border-b-2">
                <Avatar
                  className="h-7 w-7 rounded-full"
                  src={counter.by.avatar}
                  name={counter.by.fullName}
                  withName
                />
              </div>
            ))}
          </Tab.Panel>
          {reactionHeadings?.map(() => (
            <Tab.Panel>
              {counters
                .filter((counter) => counter.emoji == selectedTab)
                .map((counter) => (
                  <div className="py-4 px-12 border-b-2">
                    <Avatar
                      className="h-7 w-7 rounded-full"
                      src={counter.by.avatar}
                      name={counter.by.fullName}
                      withName
                    />
                  </div>
                ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </Modal>
  );
};

export default PostStatsModal;
