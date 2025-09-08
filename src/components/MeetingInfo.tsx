import React, { useState, useEffect } from "react";
import { useTranslation } from "../locales";

interface MeetingInfoProps {
  meetingInfo: {
    clubName: string;
    time: string;
    timezone: string;
    meetingInfo: string;
    meetLink: string;
  };
  sessionDate?: string; // ISO date string like "2025-09-08"
  className?: string;
}

const MeetingInfo: React.FC<MeetingInfoProps> = ({
  meetingInfo,
  sessionDate,
  className = "",
}) => {
  const { t } = useTranslation();
  const [relativeTime, setRelativeTime] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!sessionDate) return;

    // Parse the start time from the time string (e.g., "20:00 – 21:00")
    const timeMatch = meetingInfo.time.match(/^(\d{2}):(\d{2})/);
    if (!timeMatch) return;

    const [, hours, minutes] = timeMatch;

    // Create the target date/time string in ISO format with timezone
    const targetDateTimeString = `${sessionDate}T${hours}:${minutes}:00+03:30`;
    const targetDateTime = new Date(targetDateTimeString);

    // Create RelativeTimeFormat formatter (defaulting to 'fa' for Persian)
    const rtf = new Intl.RelativeTimeFormat("fa", {
      numeric: "always",
      style: "long",
    });

    const updateRelativeTime = () => {
      const now = Date.now();
      const difference = targetDateTime.getTime() - now;

      if (difference <= 0) {
        setIsExpired(true);
        setRelativeTime(null);
        return;
      }

      setIsExpired(false);

      // Calculate the most appropriate unit
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let formattedTime = "";
      if (days > 0) {
        formattedTime = rtf.format(days, "day");
      } else if (hours > 0) {
        // When less than a day, show both hours and minutes
        const remainingMinutes = minutes % 60;
        const hoursText = rtf.format(hours, "hour");
        if (remainingMinutes > 0) {
          const minutesText = rtf.format(remainingMinutes, "minute");
          formattedTime = `${hoursText} و ${minutesText}`;
        } else {
          formattedTime = hoursText;
        }
      } else if (minutes > 0) {
        formattedTime = rtf.format(minutes, "minute");
      } else if (seconds > 0) {
        formattedTime = rtf.format(seconds, "second");
      }

      // Persian hack: replace "بعد" with "دیگر" for more natural language
      const naturalPersianTime = formattedTime.replace(/بعد/g, "") + "دیگر";
      setRelativeTime(naturalPersianTime);
    };

    // Update immediately
    updateRelativeTime();

    // Update every second
    const interval = setInterval(updateRelativeTime, 1000);

    return () => clearInterval(interval);
  }, [sessionDate, meetingInfo.time]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="text-sm space-y-2">
        <div className="flex items-center gap-2">🕐 {meetingInfo.time}</div>
        <div className="flex items-center gap-2">
          🌍 {t("common.timezone")}: {meetingInfo.timezone}
        </div>
        {sessionDate && (relativeTime || isExpired) && (
          <div className="flex flex-row justify-between items-start gap-2 rounded-lg border border-dark-paper/30 p-4">
            {isExpired ? (
              <div className="flex items-center gap-2">
                ⏰{" "}
                <span className="font-medium">
                  {t("session.sessionStarted")}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                ⏰ <span className="font-medium">{relativeTime}</span>
              </div>
            )}
            <a
              href={meetingInfo.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link break-all ml-2"
            >
              <span className="text-xs opacity-70"> ↗ </span>{" "}
              {meetingInfo.meetLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingInfo;
