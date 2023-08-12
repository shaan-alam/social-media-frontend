import { useState } from "react";
import Button from "../Button";
import Moment from "react-moment";
import Skeleton from "react-loading-skeleton";
import EditUserDetailsModal from "../Modal/EditUserDetailsModal";
import { AnimatePresence } from "framer-motion";
import Icon from "../Icon";
import { icons } from "../../utils/icons";
import { IntroCardType } from "./types";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/user";

const IntroCard: IntroCardType = ({
  details,
  followers,
  following,
  createdAt,
}) => {
  const { id }: { id: string } = useParams();
  const currentUser = useUser();
  const [userDetailsModal, setUserDetailsModal] = useState(false);

  return (
    <div className="intro-cardm bg-white p-5 rounded-lg shadow-md mb-4 stikcy top-4">
      <h1 className="font-bold text-3xl mb-5">Intro</h1>
      {typeof followers === "number" && followers > 0 && (
        <div className="flex items-center mb-4">
          <Icon src={icons.followers} />
          <p className="ml-2">
            Followed by <b>{followers} People</b>
          </p>
        </div>
      )}
      {!details && <Skeleton count={5} height={30} />}
      {typeof following === "number" && following > 0 && (
        <div className="flex items-center mb-4">
          <Icon src={icons.followings} />
          <p className="ml-2">
            Following <b>{following} People</b>
          </p>
        </div>
      )}
      {details?.lives_in_city && (
        <div className="flex items-center mb-4">
          <Icon src={icons.lives_in_city} />
          <p className="ml-2">
            Lives in <b>{details.lives_in_city}</b>
          </p>
        </div>
      )}
      {details?.from_city && (
        <div className="flex items-center mb-4">
          <Icon src={icons.from_city} />
          <p className="ml-2">
            From <b>{details.from_city}</b>
          </p>
        </div>
      )}
      {details?.works.length !== 0 && (
        <div className="flex items-center mb-4">
          <Icon src={icons.works} />
          <p className="ml-2">
            Works at <b>{details?.works[0]}</b>
          </p>
        </div>
      )}
      {details?.education.length !== 0 && (
        <div className="flex items-center mb-4">
          <Icon src={icons.works} />
          <p className="ml-2">
            Went to <b>{details?.education[0]}</b>
          </p>
        </div>
      )}
      <div className="flex items-center mb-4">
        <Icon src={icons.createdAt} />
        <p className="ml-2">
          Joined&nbsp;
          <Moment format="MMM YYYY">{new Date(createdAt!)}</Moment>
        </p>
      </div>
      {currentUser._id === id && (
        <Button
          variant="secondary"
          text="Edit Intro"
          className="font-bold p-2"
          onClick={() => setUserDetailsModal(true)}
        />
      )}
      <AnimatePresence>
        {userDetailsModal && (
          <EditUserDetailsModal
            isOpen={userDetailsModal}
            setOpen={setUserDetailsModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroCard;
