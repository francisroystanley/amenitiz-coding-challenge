import { useEffect, useState } from "react";
import formatTimeSince from "../util/formatTimeSince";

type Props = {
  lastOnline: number;
};

const LastSeenClock = ({ lastOnline }: Props) => {
  const [timeElapsed, setTimeElapsed] = useState(Date.now() - lastOnline);
  const formattedTimeElapsed = formatTimeSince(timeElapsed);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeElapsed(Date.now() - lastOnline);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lastOnline]);

  return <div className="font-mono text-lg font-semibold text-gray-800">{formattedTimeElapsed}</div>;
};

export default LastSeenClock;
