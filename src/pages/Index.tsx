import { useEffect, useRef } from "react";
import GameBoard from "@/components/game/GameBoard";
import ScoreBoard from "@/components/game/ScoreBoard";
import GameStatus from "@/components/game/GameStatus";
import GameControls from "@/components/game/GameControls";
import { useTicTacToe } from "@/hooks/useTicTacToe";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const Index = () => {
  const {
    board,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    scores,
    handleCellClick,
    startNewGame,
    resetScores,
    gameOver,
  } = useTicTacToe();

  const { playPlaceSound, playWinSound, playDrawSound } = useSoundEffects();
  const prevBoardRef = useRef(board);
  const prevWinnerRef = useRef(winner);
  const prevDrawRef = useRef(isDraw);

  useEffect(() => {
    const prevBoard = prevBoardRef.current;
    const newMoveIndex = board.findIndex((cell, i) => cell !== null && prevBoard[i] === null);
    
    if (newMoveIndex !== -1 && board[newMoveIndex]) {
      playPlaceSound(board[newMoveIndex] as "X" | "O");
    }
    prevBoardRef.current = board;
  }, [board, playPlaceSound]);

  useEffect(() => {
    if (winner && !prevWinnerRef.current) {
      playWinSound();
    }
    prevWinnerRef.current = winner;
  }, [winner, playWinSound]);

  useEffect(() => {
    if (isDraw && !prevDrawRef.current) {
      playDrawSound();
    }
    prevDrawRef.current = isDraw;
  }, [isDraw, playDrawSound]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-playerX/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-playerO/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6 sm:gap-8">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-wider">
            TIC TAC TOE
          </h1>
          <p className="text-muted-foreground font-body mt-2">
            Challenge a friend
          </p>
        </header>

        <ScoreBoard scores={scores} currentPlayer={currentPlayer} />

        <GameStatus
          winner={winner}
          isDraw={isDraw}
          currentPlayer={currentPlayer}
        />

        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          winningLine={winningLine}
          winner={winner}
          disabled={gameOver}
        />

        <GameControls
          onNewGame={startNewGame}
          onResetScores={resetScores}
          gameOver={gameOver}
        />

        <footer class="mt-8 text-center animate-fade-in">
          <p class="text-sm text-muted-foreground mb-4">Developed with ❤️ by Sivashankar</p>
          <div class="flex gap-4 justify-center">
            <a 
              href="https://github.com/SivashankarVP" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a 
              href="https://linkedin.com/in/sivashankarvp" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
 
 
