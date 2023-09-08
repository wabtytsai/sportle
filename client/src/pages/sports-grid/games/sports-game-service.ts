import { BasketballGame } from "./basketball";
import { Game } from "./game";

export enum SportsType {
    NBA = "NBA",
}

export function getSportsGame(sportsType: SportsType): Game {
    switch (sportsType) {
        case (SportsType.NBA): {
            return new BasketballGame();
        }
    }
}