import { BotDifficulty, Player } from '@/types/game'
import { RandomStrategy, MinimaxStrategy, BotStrategy } from './botStrategies'

export class BotEngine {
  private strategy: BotStrategy

  constructor(difficulty: BotDifficulty) {
    this.strategy = this.createStrategy(difficulty)
  }

  private createStrategy(difficulty: BotDifficulty): BotStrategy {
    switch (difficulty) {
      case BotDifficulty.EASY:
        return new RandomStrategy()
      case BotDifficulty.MEDIUM:
      case BotDifficulty.HARD:
        return new MinimaxStrategy(difficulty)
    }
  }

  calculateNextMove(
    board: (Player | null)[],
    boardSize: number,
    winCondition: number
  ): number {
    return this.strategy.getNextMove(board, boardSize, winCondition)
  }

  setDifficulty(difficulty: BotDifficulty) {
    this.strategy = this.createStrategy(difficulty)
  }
}
