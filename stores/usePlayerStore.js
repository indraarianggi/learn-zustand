import create from "zustand";

const initialPlayers = [
    {
        id: "1",
        score: 0,
        name: "harry",
    },
    {
        id: "2",
        score: 0,
        name: "ron",
    },
];

const handleChangePlayerScore = (id, dir, set, get) => {
    // Get players state
    const players = get().players;

    const playersCopy = [...players];
    let player = playersCopy.find((p) => p.id === id);

    if (dir === "up") {
        player.score += 10;
        if (player.score > get().highScore) {
            set({ highScore: player.score });
        }
    } else {
        player.score -= 10;
    }

    // Set new value of players state
    set({ players: playersCopy });
};

// Create a store
export const usePlayerStore = create((set, get) => ({
    players: initialPlayers,
    highScore: 0,
    setHighScore: (score) => set({ highScore: score }),
    changePlayerScore: (id, dir) => {
        handleChangePlayerScore(id, dir, set, get);
    },
}));
