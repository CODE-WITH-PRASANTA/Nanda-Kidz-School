
import React, { useEffect, useState } from "react";
import "./Loader.css";

const LETTERS = ["N", "A", "N", "D", "A"];

const Loader = ({ duration = 3000, onFinish }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const leaveTimer = setTimeout(
      () => setIsLeaving(true),
      Math.max(0, duration - 350)
    );

    const doneTimer = setTimeout(() => {
      setIsDone(true);

      if (typeof onFinish === "function") {
        onFinish();
      }
    }, duration);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [duration, onFinish]);

  if (isDone) return null;

  return (
    <div
      className={`Loader ${isLeaving ? "Loader--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Nanda Kidz The Little Kingdom A Play School"
    >
      <span className="Loader__cloud Loader__cloud--one" />
      <span className="Loader__cloud Loader__cloud--two" />
      <span className="Loader__sun" />

      <div className="Loader__content">
        {/* Animated school name */}
        <div className="Loader__blocks" aria-hidden="true">
          {LETTERS.map((letter, index) => (
            <span
              key={index}
              className={`Loader__block Loader__block--${index + 1}`}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* School branding */}
        <h1 className="Loader__title">NANDA KIDZ</h1>

        <p className="Loader__tagline">
          THE LITTLE KINGDOM
        </p>

        <p className="Loader__school-type">
          A PLAY SCHOOL
        </p>

        <div className="Loader__divider">
          <span />
          <span />
          <span />
        </div>

        <p className="Loader__text">
          Getting your little world ready...
        </p>

        {/* Loading progress */}
        <div className="Loader__progress">
          <span
            className="Loader__progressBar"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
