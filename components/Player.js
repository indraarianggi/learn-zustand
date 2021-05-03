import styled, { css } from "styled-components";
import tw from "twin.macro";
import { Plus, Minus } from "@styled-icons/boxicons-regular";
import { Star } from "@styled-icons/boxicons-solid/Star";

import { Vip } from "@styled-icons/remix-line/Vip";

import { usePlayerStore } from "../stores/usePlayerStore";
import { useVipStore } from "../stores/useVipStore";

const PlayerDiv = styled.div`
    ${tw`
    flex flex-row p-2 pb-6 justify-between border-b items-center mt-12 last:border-none
`}
    button {
        ${tw`border border-gray-400 px-1 rounded-lg hover:bg-gray-100 active:bg-gray-300`}
    }
    h1 {
        ${tw`capitalize mx-auto`}
    }
`;
const StyledStar = styled(Star)`
    ${tw`text-gray-400 w-4 lg:w-8 lg:h-8`}
    ${(props) => {
        if (props.hasHighScore) {
            return tw`text-green-400 `;
        }
    }}
`;
const StyledVip = styled(Vip)`
    ${tw`w-4 lg:w-6 lg:h-6 text-gray-400 hidden`}
    ${(props) => {
        if (props.isVip) {
            return tw`inline`;
        }
    }}
`;
export default function Player({ player }) {
    // Accessing state and action from player store
    const changePlayerScore = usePlayerStore(
        (state) => state.changePlayerScore
    );
    const highScore = usePlayerStore((state) => state.highScore);

    // Accessing state and action from vip store
    const vips = useVipStore((state) => state.vips);

    return (
        <PlayerDiv>
            <div>
                <StyledStar
                    hasHighScore={player.score === highScore && highScore > 0}
                ></StyledStar>
            </div>

            <h1 css={tw`text-xs lg:text-lg`}>
                {" "}
                <span>
                    <StyledVip
                        isVip={vips.includes(player.id) || player.id === "2"}
                    ></StyledVip>
                </span>{" "}
                {player.name}
            </h1>
            <div css={tw`flex items-center`}>
                <button
                    onClick={() => {
                        changePlayerScore(player.id, "up");
                    }}
                >
                    <Plus css={tw`w-2 lg:w-4 lg:h-4 text-gray-600`}></Plus>
                </button>
                <span css={tw`align-middle text-xs lg:text-lg w-12`}>
                    {player.score}
                </span>
                <button
                    onClick={() => {
                        changePlayerScore(player.id, "down");
                    }}
                >
                    <Minus css={tw`w-2 lg:w-4 lg:h-4 text-gray-600`}></Minus>
                </button>
            </div>
        </PlayerDiv>
    );
}
