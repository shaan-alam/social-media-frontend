import { Menu, Transition } from "@headlessui/react";
import {
  DotsHorizontalIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { CommentDropdownProps } from "./types";

const CommentDropdown = ({
  onEditBtnClick,
  onDelete,
  isCommentReply,
}: CommentDropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block z-10 w-0">
      <Menu.Button>
        <DotsHorizontalIcon className="comment-options-button outline-none ml-3 h-10 w-10 p-2 rounded-full hover:bg-gray-100 cursor-pointer text-gray-500" />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-50 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform  scale-100 opacity-100"
        leaveTo="transform scale-50 opacity-0"
      >
        <Menu.Items className="absolute z-10 transform bottom-1 translate-y-20 -translate-x-3/4 bg-white rounded-lg shadow-2xl p-1 w-60">
          <div className="border-b p-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`cursor-pointer flex justify-start items-center ${
                    active && "bg-gray-300 rounded-lg"
                  } p-1 ${
                    active ? "text-gray-700" : "text-gray-700 "
                  } hover:bg-gray-100 hover:text-gray-700`}
                  onClick={() => onEditBtnClick(true)}
                >
                  <PencilIcon className="h-5 w-5" />
                  &nbsp;Edit Comment {isCommentReply && "Reply"}
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`cursor-pointer flex justify-start items-center ${
                    active && "bg-gray-300 rounded-lg"
                  } p-1 ${
                    active ? "text-gray-700" : "text-gray-700 "
                  } hover:bg-gray-100 hover:text-gray-700`}
                  onClick={onDelete}
                >
                  <TrashIcon className="h-5 w-5" />
                  &nbsp; Delete Comment {isCommentReply && "Reply"}
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CommentDropdown;
