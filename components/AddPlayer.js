import React, { useState } from "react";
import tw from "twin.macro";

import { usePlayerStore } from "../stores/usePlayerStore";

export default function AddPlayerForm() {
    // Accessing action
    const addPlayer = usePlayerStore((state) => state.addPlayer);

    const [val, setVal] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (val !== "") {
            // Add new player
            addPlayer(val);
            setVal("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            css={tw`flex space-x-2 self-center w-64 sm:w-2/3 justify-between md:justify-center`}
        >
            <input
                value={val}
                onChange={(e) => {
                    setVal(e.target.value);
                }}
                css={tw`md:p-2 rounded-lg bg-white outline-none border-2 border-green-400 focus:border-green-300`}
            ></input>
            <button
                type="submit"
                css={tw`border-2 border-green-400 bg-white text-green-500 rounded-lg p-1 md:p-2 active:border-green-300 text-xs sm:text-lg`}
            >
                add player
            </button>
        </form>
    );
}
