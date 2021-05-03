import create from "zustand";
import { devtools } from "zustand/middleware";

const url =
    "https://my-json-server.typicode.com/gmahima/NextWithZustand/players";

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

// handle asynchronous function
const handleLoadPlayers = async (set, get) => {
    fetch(url)
        .then((res) => res.json())
        .then((players) => {
            players.map((p) => (p.score = 0));
            set({ players: players });
        })
        .catch((error) => {
            console.log(error);
        });
};

const storePlayer = async (player) => {
    await fetch(url, {
        method: "POST",
        body: JSON.stringify(player),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
    })
        .then(
            (res) => {
                if (res.ok) {
                    return res;
                } else {
                    let err = res.json();
                    err.res = res;
                    throw err;
                }
            },
            (error) => {
                console.log("error: ", error);
                let errmes = new Error(error.message);
                throw errmes;
            }
        )
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((error) => {
            console.log(error);
        });
};

const handleAddPlayer = async (name, set, get) => {
    let players = [...get().players];
    let newPlayer = {};
    newPlayer.name = name;
    newPlayer.id = (players.length + 1).toString();

    await storePlayer(newPlayer)
        .then(() => {
            newPlayer.score = 0;
            players.push(newPlayer);
            set({ players: players });
        })
        .catch((e) => console.log(e));
};

// Create a store
export const usePlayerStore = create(
    devtools((set, get) => ({
        players: initialPlayers,
        // handling asynchronous action
        loadPlayers: async () => {
            await handleLoadPlayers(set, get);
        },
        highScore: 0,
        setHighScore: (score) => set({ highScore: score }),
        changePlayerScore: (id, dir) => {
            handleChangePlayerScore(id, dir, set, get);
        },
        addPlayer: (name) => {
            handleAddPlayer(name, set, get);
        },
        deleteEverything: () => set({}, true), // true replaces state model instead of merging it
    }))
);
