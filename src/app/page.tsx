"use client";

import React, { useEffect, useState } from "react";

import ToggleButton from "@/components/toggle-button";

export default function Home() {
  // map of keys to sound files
  const keyToSound = {
    q: "/sounds/drum1.mp3",
    w: "/sounds/drum2.mp3",
    e: "/sounds/drum3.mp3",
    a: "/sounds/drum4.mp3",
    s: "/sounds/drum5.mp3",
    d: "/sounds/drum6.mp3",
    z: "/sounds/drum7.mp3",
    x: "/sounds/drum8.mp3",
    c: "/sounds/drum9.mp3",
  };

  // state to track if the power is on
  const [isPowerOn, setIsPowerOn] = useState(true);

  // state to track volume
  const [volume, setVolume] = useState(50);

  // function to play a sound
  const playSound = (key) => {
    const audio = new Audio(keyToSound[key]);
    audio.volume = volume / 100; // volume needs to be a value between 0.0 - 1.0
    audio.play();
  };

  // function to simulate a button click
  const simulateClick = (key) => {
    const button = document.getElementById(`btn-${key}`);
    if (button) button.click();
  };

  // function to handle button clicks
  const handleClick = (key) => {
    // only play sound if power is on
    if (isPowerOn) {
      playSound(key);
    }
  };

  // setting up the event listener
  useEffect(() => {
    const keydownHandler = ({ key }) => {
      if (
        ["q", "w", "e", "a", "s", "d", "z", "x", "c"].includes(
          key.toLowerCase()
        )
      ) {
        // only simulate click if power is on
        if (isPowerOn) {
          simulateClick(key);
        }
      }
    };

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [isPowerOn]); // re-run effect when isPowerOn changes

  // toggle power function
  const togglePower = () => {
    setIsPowerOn(!isPowerOn);
  };

  // handle volume change function
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center m-auto p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Drum Machine
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <span>Jeremy Dudet</span>
          </a>
        </div>
      </div>
      <div
        id="drum-panel"
        className="bg-slate-950 overflow-hidden rounded-lg min-w-fit max-w-xl flex flex-col w-full h-600px my-auto px-8 py-4"
      >
        <div
          id="inner-container"
          className="flex w-full flex-wrap justify-center items-center gap-8"
        >
          <div
            id="button-grid"
            className="grid grid-cols-3 gap-4 min-w-[250px] text-xl"
          >
            <button
              id="btn-q"
              className="w-[80px] border h-[80px] content-center rounded-md"
              onClick={() => handleClick("q")}
            >
              q
            </button>
            <button
              id="btn-w"
              className="w-[80px] border rounded-md h-[80px] content-center"
              onClick={() => handleClick("w")}
            >
              w
            </button>
            <button
              id="btn-e"
              className="w-[80px] border rounded-md h-[80px] content-center"
              onClick={() => handleClick("e")}
            >
              e
            </button>
            <button
              id="btn-a"
              className="w-[80px] border rounded-md h-[80px] content-center"
              onClick={() => handleClick("a")}
            >
              a
            </button>
            <button
              id="btn-s"
              className="w-[80px] border rounded-md h-[80px] content-center"
              onClick={() => handleClick("s")}
            >
              s
            </button>
            <button
              id="btn-d"
              className="w-[80px] border rounded-md h-[80px] content-center"
              onClick={() => handleClick("d")}
            >
              d
            </button>
            <button
              id="btn-z"
              className="w-[80px] border rounded-md h-[80px] content-center"
              onClick={() => handleClick("z")}
            >
              z
            </button>
            <button
              id="btn-x"
              className="w-[80px] border rounded-md h-[80px] content-center"
              onClick={() => handleClick("x")}
            >
              x
            </button>
            <button
              id="btn-c"
              className="w-[80px] border rounded-md h-[80px] content-center"
              onClick={() => handleClick("c")}
            >
              c
            </button>
          </div>

          <div
            id="settings-panel"
            className="flex flex-col items-center justify-center gap-4"
          >
            <div id="power-button" className="flex flex-col items-center">
              Power
              <ToggleButton onChange={togglePower} checked={isPowerOn} />
            </div>
            <div
              id="display-panel"
              className="flex justify-center items-center bg-slate-700 w-40 h-10"
            >
              <span>{`Volume: ${volume}`}</span>
            </div>
            <div id="slider">
              <input
                id="default-range"
                type="range"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            {/* <div id="Bank" className="flex flex-col items-center">
              Bank
              <ToggleButton onChange={togglePower} checked={isPowerOn} />
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
