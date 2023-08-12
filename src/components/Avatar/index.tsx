import { useState } from "react";
import { useUser } from "../../hooks/user";
import { AvatarProps } from "./types";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Avatar = ({ src, className, name, withName, link }: AvatarProps) => {
  const user = useUser();
  const [isLoaded, setLoaded] = useState(false);

  const AvatarComponent = () => (
    <div className="flex items-center">
      {!isLoaded && (
        <Skeleton style={{ borderRadius: "100%" }} height={30} width={30} />
      )}
      <img
        style={{ display: !isLoaded ? "none" : "block" }}
        src={src}
        alt={user?.fullName}
        className={className}
        onLoad={() => setLoaded(true)}
      />
      {!isLoaded && withName && (
        <Skeleton style={{ marginLeft: "20px" }} height={30} width={100} />
      )}
      {isLoaded && withName && (
        <p className="ml-2 text-fb font-semibold">{name}</p>
      )}
    </div>
  );

  return link !== undefined ? (
    <Link to={link}>
      <AvatarComponent />
    </Link>
  ) : (
    <AvatarComponent />
  );
};

export default Avatar;
