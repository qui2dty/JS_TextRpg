import chalk from "chalk";
import readlineSync from "readline-sync";

class Player {
  constructor(name) {
    this.name = name;
    this.hp = 100;
    this.MnDamage = 50;
    this.str = 5;
    this.int = 5;
    this.dex = 5;
    this.luk = 5;
    this.gold = 0;
    this.exp = 0;
    this.level = 1;
    this.maxExp = 10;
    this.isDef = false;
  }

  statReroll() {
    //1. 스탯을 전부 더해 올스탯변수에 저장. 2. 1부터 올스탯 사이의 랜덤숫자 뽑기. 뽑힌숫자만큼 올스탯에서 뺴주기. 3.스탯의 갯수만큼 돌려서 모든 스탯에 재분배.
    //????? 이거 이러면 처음에 돌리는 스탯이 무조건 센거아냐????? Tip word - 균등분배

    let allStat = this.str + this.int + this.dex + this.luk;
    let statArr = [, , , ,];

    for (let i = 0; i < statArr.length; i++) {
      if (i == statArr.length - 1) {
        statArr[i] = allStat;
      } else {
        statArr[i] = Math.round(
          Math.random() * (allStat - statArr.length - 1) + 1
        );
        allStat -= statArr[i];
      }
    }
    console.log(
      `스탯 분배 결과 | Str:${(this.str = statArr[0])} Int:${(this.int =
        statArr[1])} Dex:${(this.dex = statArr[2])} Luk:${(this.luk =
        statArr[3])}`
    );
  }

  LvUP() {
    this.level += 1;
    this.maxExp += 10;
    this.exp = 0;
    this.str += 1;
    this.int += 1;
    this.dex += 1;
    this.luk += 1;
    console.log(`레벨업! 모든 스탯 +1!`);
  }

  attack(monster) {
    monster.hp -= this.MnDamage;
  }

  run() {
    if (50 < Math.floor(Math.random() * 100 + 1)) {
      return true;
    } else {
      return false;
    }
  }

  Defence() {
    this.isDef = true;
  }
}

class Monster {
  constructor(stagelv) {
    this.hp = 100 * stagelv;
    this.MnDamage = 10 * stagelv;
    this.isblocked = false;
  }

  patternSelect() {
    let result = Math.round(Math.random() * (2 - 1) + 1);
    return result;
  }

  attack(player) {
    this.isblocked = false;
    if (player.isDef == true) {
      this.isblocked = true;
      player.isDef = false;
    } else {
      player.hp -= this.MnDamage;
    }

    return this.isblocked;
  }

  smash(player) {
    this.isblocked = false;
    if (player.isDef == true) {
      player.hp -= this.MnDamage * 2;
      this.isblocked = true;
      player.isDef = false;
    } else {
      player.hp -= Math.floor(this.MnDamage * 0.5);
    }

    return this.isblocked;
  }
}

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

const RoleDice = function () {
  let result = Math.round(Math.random() * (6 - 1) + 1);
  return result;
};

let EncounterQuests = function (player, stage) {
  let ranNum = Math.round(Math.random() * (3 - 1) + 1);

  switch (ranNum) {
    case 1:
      console.clear();
      console.log(`
==================================================================
                  `);

      console.log(chalk.bold(`Encounter Quest_[힘의 차이가 느껴지십니까?]`));
      console.log(
        `
플레이어의 기합으로 몬스터를 밀어낸다.
                  
[ 확률 계산식 : 기초확률 + 플레이어의 Str값: ${player.str} + 주사위 값. ]
` +
          chalk.green(`[ 플레이어 현재 체력: ${player.hp} ] `) +
          chalk.yellow(`[ 현재 스테이지: ${stage} ]`)
      );

      console.log(`
==================================================================`);
      console.log(`1.주사위를 던진다. 2.전투 돌입.
        `);
      break;

    case 2:
      console.clear();
      console.log(`
==================================================================
                  `);

      console.log(chalk.bold(`Encounter Quest_[좋은 방법이 없을까?]`));
      console.log(
        `
불필요한 전투를 피하기 위해 머리를 굴려보자!
                  
[ 확률 계산식 : 기초확률 + 플레이어의 Int값: ${player.int} + 주사위 값. ]
` +
          chalk.green(`[ 플레이어 현재 체력: ${player.hp} ] `) +
          chalk.yellow(`[ 현재 스테이지: ${stage} ]`)
      );

      console.log(`
==================================================================`);
      console.log(`1.주사위를 던진다. 2.전투 돌입.
        `);
      break;
    case 3:
      console.clear();
      console.log(`
==================================================================
                  `);

      console.log(chalk.bold(`Encounter Quest_[...가능?]`));
      console.log(
        `
고도로 발달한 다리는.. 뭐 그렇다는거지.
                  
[ 확률 계산식 : 기초확률 + 플레이어의 Dex값: ${player.dex} + 주사위 값. ]
` +
          chalk.green(`[ 플레이어 현재 체력: ${player.hp} ] `) +
          chalk.yellow(`[ 현재 스테이지: ${stage} ]`)
      );

      console.log(`
==================================================================`);
      console.log(`1.주사위를 던진다. 2.전투 돌입.
        `);
      break;

    default:
      break;
  }
  return ranNum;
};

const EncounterScene = async (player, stage) => {
  let logs = [];

  console.log(chalk.yellow("Next Stage!"));
  await sleep(1);
  let result;
  let selectedQuest = EncounterQuests(player, stage);
  const choice = readlineSync.question("당신의 선택은? ");
  if (choice == "2") {
    console.log("전투 돌입!");
    return (result = false);
  } else if (choice == "1") {
    let diceResult = RoleDice();

    console.log(chalk.yellow(`주사위 결과: ${diceResult}!`));

    if (selectedQuest == 1) {
      console.log(
        `예상 확률 : ${30 + player.str + diceResult}%(+${diceResult}).`
      );

      await sleep(1);
      let Add = 30 + player.str + diceResult;

      if (Add < Math.round(Math.random() * (100 - 1) + 1)) {
        console.log(`-성공: 아아. 이것이 "패기" 라는것이다.`);
        return (result = true);
      } else {
        console.log(`-실패: 제가 좀 경솔 했던것 같습니다.`);
        return (result = false);
      }
    } else if (selectedQuest == 2) {
      console.log(
        `예상 확률 : ${30 + player.int + diceResult}%(+${diceResult}).`
      );

      await sleep(1);
      let Add = 30 + player.int + diceResult;

      if (Add < Math.round(Math.random() * (100 - 1) + 1)) {
        console.log(`-성공: 스마트하게 가자 스마트하게~`);
        return (result = true);
      } else {
        console.log(
          `-실패: 머리가 나쁘면 몸이 고생한다는 말은 말야. 
      몸이 좋으면 별 생각 없이 살아도 괜찮다는 말일지도 몰라.`
        );
        return (result = false);
      }
    } else if (selectedQuest == 3) {
      console.log(
        `예상 확률 : ${30 + player.dex + diceResult}%(+${diceResult}).`
      );

      await sleep(1);
      let Add = 30 + player.dex + diceResult;

      if (Add < Math.round(Math.random() * (100 - 1) + 1)) {
        console.log(`-성공: 아무도 날 막을순 없으셈ㅋㅋ`);
        return (result = true);
      } else {
        console.log(`-실패: 인생 쉽지 않네`);
        return (result = false);
      }
    }
  }
};

function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
      chalk.blueBright(
        `| 플레이어 정보 name: ${player.name} Lv: ${player.level} Hp: ${player.hp} Damage: ${player.MnDamage} 
Stat: [ Str:${player.str} Int:${player.int} Dex:${player.dex} Luk:${player.luk} ] Gold : ${player.gold}g Exp/MaxExp :${player.exp}/${player.maxExp} `
      ) +
      chalk.redBright(
        `| 몬스터 정보 Hp: ${monster.hp} Damage: ${monster.MnDamage} |`
      )
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

const battle = async (stage, player, monster) => {
  let logs = [];

  while (player.hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(`\n1. 공격한다 2. 도망친다. 3. 방어 4. PlayerSkill[구현중]`)
    );
    const choice = readlineSync.question("당신의 선택은? ");

    // 플레이어의 선택에 따라 다음 행동 처리
    switch (choice) {
      case "1":
        logs.push(chalk.green(`${choice}를 선택하셨습니다.`));
        // 1. 공격구현
        logs.push(chalk.white(`플레이어의 공격! ${player.MnDamage}의 데미지!`));
        player.attack(monster);
        break;

      case "2":
        logs.push(chalk.green(`${choice}를 선택하셨습니다.`));

        if (player.run() == true) {
          console.log("도망치는건 부끄럽지만 도움이 된다!");
          await sleep(1);
          return;
        } else {
          logs.push(chalk.white(`실패!`));
          break;
        }
      // 2. 도주구현

      case "3":
        logs.push(chalk.green(`${choice}를 선택하셨습니다.`));
        console.log(`방어를 시도합니다.`);
        player.Defence();
        await sleep(1);

        break;
      // 3. 방어 구현

      default:
        console.log(chalk.red("올바른 선택을 하세요."));
    }

    //몬스터 반응 구간.

    switch (monster.patternSelect()) {
      case 1:
        if (monster.attack(player) == true) {
          logs.push(chalk.white(`방어에 막혔습니다!`));
        } else {
          logs.push(
            chalk.white(`몬스터의 공격! ${monster.MnDamage}의 데미지!`)
          );
        }
        logs.push(
          chalk.red(`|플레이어 체력 : ${player.hp}| 몬스터 체력 : ${monster.hp}|
        `)
        );

        break;

      case 2:
        if (monster.smash(player) == true) {
          logs.push(
            chalk.redBright(
              `방어를 뚫고 스매시가 들어옵니다! ${
                monster.MnDamage * 2
              }의 데미지! `
            )
          );
        } else {
          logs.push(
            chalk.white(
              `스매시 실패! ${Math.floor(monster.MnDamage * 0.5)}의 데미지!`
            )
          );
        }
        logs.push(
          chalk.red(`|플레이어 체력 : ${player.hp}| 몬스터 체력 : ${monster.hp}|
      `)
        );

        break;

      default:
        break;
    }
  }

  if (monster.hp == 0) {
    player.hp += 50;
    player.gold += 10;
    player.exp += 10;
    console.log(
      `전투 승리!` +
        chalk.green(`player 체력회복! 현재 체력 : ${player.hp}`) +
        chalk.yellow(` 획득한 골드 : 10g 현재 골드: ${player.gold}g`)
    );
    if (player.exp >= player.maxExp) {
      player.LvUP();
    }
    await sleep(2);
  }
};

export async function startGame() {
  console.clear();

  let input = readlineSync.question("이름을 입력해주세요: ");
  const player = new Player(input);
  player.statReroll();
  await sleep(2);
  let stage = 1;

  while (stage <= 10 && player.hp > 0) {
    const monster = new Monster(stage);
    const Checker = await EncounterScene(player, stage);

    // 스테이지 클리어 및 게임 종료 조건
    //stage++; //이녀석이 체커보다 위에 있어야 스테이지가 넘어간다.

    if (Checker == true) {
      stage++;
      continue;
    }
    await sleep(2);
    await battle(stage, player, monster);
    stage++;
  }
}
