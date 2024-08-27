export const RoleDice = function () {
  let result = Math.round(Math.random() * (6 - 1) + 1);
  return result;
}; // 주사위 굴리기
