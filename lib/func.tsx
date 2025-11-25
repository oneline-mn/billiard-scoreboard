export function getWinRate(wins: number, totalMatch: number) {
  if (!totalMatch) return 0; 
  return (wins / totalMatch) * 100;
}
