import Head from "next/head";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import Player from "../components/Player";
import AddPlayerForm from "../components/AddPlayer";

import shallow from "zustand/shallow";
import { usePlayerStore } from "../stores/usePlayerStore";

export default function Home() {
    // Extract multiple state slices into an object
    const { players, highScore } = usePlayerStore(
        (state) => ({ players: state.players, highScore: state.highScore }),
        shallow
    );

    return (
        <div
            css={tw`flex flex-col h-screen px-20 md:px-20 space-y-8 text-center justify-center`}
        >
            <div css={tw`flex flex-col`}>
                <h1 css={tw`text-black text-3xl md:text-6xl`}>Scoreboard</h1>
                <h2
                    css={tw`mt-2 sm:mt-8 py-1 px-2 md:py-2 md:px-8  self-center border-2 border-green-400 rounded-lg font-semibold`}
                >
                    High Score: {highScore}
                </h2>
            </div>
            <AddPlayerForm></AddPlayerForm>
            <div
                css={tw`bg-white border shadow-lg px-4 w-64 sm:w-2/3 md:px-32 md:w-2/3 md:h-64 overscroll-y-auto overflow-auto flex flex-col rounded-lg self-center`}
            >
                {players.map((p) => {
                    return <Player player={p} key={p.id} />;
                })}
            </div>
        </div>
    );
}
// wrong
// export default function Home() {

//   const players = useStore(state => state.players)
//   const incrementPlayerScore = () => {
//     return (
//       useStore(state => state.incrementPlayerScore) //cant call use store in an anonymous js function
// right way is to extract the function:
// inc = useStore(state => state.incrementPlayerScore)
// and call the function wherever you want: inc(id)
//     )
//   }
//   return (
//   <div>{players.map(p => {
//     return (
//       <div>
//         <span>{p.name} |</span>
//         <span> {p.score} | </span>
//         <button onClick={() => (useStore(state => state.incrementPlayerScore(p.id)))}> increment </button>
//       </div>
//     )
//   })}</div>
//   )

// }
//wrong
