import chalk from "chalk";
import figlet from "figlet";
import readlineSync from "readline-sync";

class Player {
  constructor(name) {
    this.name = name;
    this.hp = 500;
    this.MnDamage = 50;
    this.str = 5;
    this.int = 5;
    this.dex = 5;
    this.luk = 5;
    this.gold = 30;
    this.exp = 0;
    this.level = 1;
    this.maxExp = 10;
    this.isDef = false;
  }

  statReroll() {
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
  } // 플레이어 스탯 리롤 함수

  LvUP() {
    this.level += 1;
    this.maxExp += 10;
    this.exp = 0;
    this.str += 1;
    this.int += 1;
    this.dex += 1;
    this.luk += 1;
    console.log(`레벨업! 모든 스탯 +1!`);
  } // 플레이어 레벨업 함수
  attack(monster) {
    monster.hp -= this.MnDamage;
  } // 플레이어 공격 함수

  run() {
    if (50 < Math.floor(Math.random() * 100 + 1)) {
      return true;
    } else {
      return false;
    }
  } // 플레이어 도주 함수

  defence() {
    this.isDef = true;
  } // 플레이어 방어 함수
  counter() {}
}
//플레이어 클래스

class Monster {
  constructor(stagelv) {
    this.name = "noNamed";
    this.hp = 100 * stagelv;
    this.MnDamage = 10 * stagelv;
    this.isblocked = false;
  }

  patternSelect() {
    let result = Math.round(Math.random() * (2 - 1) + 1);
    return result;
  } // 몬스터 패턴 정하기 함수

  attack(player) {
    this.isblocked = false;
    if (player.isDef == true) {
      this.isblocked = true;
      player.isDef = false;
    } else {
      player.hp -= this.MnDamage;
    }

    return this.isblocked;
  } // 몬스터 공격 함수

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
  } // 몬스터 강공격 패턴 함수
}
//몬스터 클래스

class Boss extends Monster {
  constructor(hp, MnDamage, isblocked) {
    super(hp, MnDamage, isblocked); //순서가 중요하다! super가 우선 넘어와서 상속해주고 나머지를 추가!
    this.name = "오거 백인대장";
    this.isCharged = false;
  }

  patternSelect() {
    let result = Math.round(Math.random() * (3 - 1) + 1);
    return result;
  }

  homeRun(player) {
    if (this.isCharged != true) {
      this.isCharged = true;
    } else if (this.isCharged == true && player.isDef == true) {
      this.hp -= this.MnDamage;
      return false;
    } else if (this.isCharged == true && player.isDef != true) {
      player.hp -= this.MnDamage * 4;
      return true;
    }
  }

  berserk() {}
}
//보스 몬스터 클래스 : 몬스터 클래스 상속

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
} // 시간 지연

const RoleDice = function () {
  let result = Math.round(Math.random() * (6 - 1) + 1);
  return result;
}; // 주사위 굴리기

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
}; // 몬스터 조우 퀘스트 목록

const EncounterScene = async (player, stage) => {
  let logs = [];

  console.log(chalk.yellow("Next Stage!"));
  await sleep(0.5);
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
        `예상 확률 : ${20 + player.str + diceResult}%(+${diceResult}).`
      );

      await sleep(1);
      let Add = 20 + player.str + diceResult;

      if (Add < Math.round(Math.random() * (100 - 1) + 1)) {
        console.log(`-성공: 아아. 이것이 "패기" 라는것이다.`);
        return (result = true);
      } else {
        console.log(`-실패: 제가 좀 경솔 했던것 같습니다.`);
        return (result = false);
      }
    } else if (selectedQuest == 2) {
      console.log(
        `예상 확률 : ${20 + player.int + diceResult}%(+${diceResult}).`
      );

      await sleep(1);
      let Add = 20 + player.int + diceResult;

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
        `예상 확률 : ${20 + player.dex + diceResult}%(+${diceResult}).`
      );

      await sleep(1);
      let Add = 20 + player.dex + diceResult;

      if (Add < Math.round(Math.random() * (100 - 1) + 1)) {
        console.log(`-성공: 아무도 날 막을순 없으셈ㅋㅋ`);
        return (result = true);
      } else {
        console.log(`-실패: 인생 쉽지 않네`);
        return (result = false);
      }
    }
  } else {
    console.log(chalk.red("ERROR : 무슨 선택이지?"));
    return false;
  }
}; // 몬스터 조우 씬

let BossEncount = async () => {
  console.clear();
  for (let j = 0; j < 11; j++) {
    for (let i = 0; i < 10; i++) {
      if (j % 2 == 0) {
        if (i % 2 == 0) {
          process.stdout.write(chalk.bgRed.bold(`WARNING`));
        } else {
          process.stdout.write(chalk.red(`WARNING`));
        }
        await sleep(0.01);
      } else {
        if (i % 2 == 0) {
          process.stdout.write(chalk.red(`WARNING`));
        } else {
          process.stdout.write(chalk.bgRed.bold(`WARNING`));
        }
        await sleep(0.01);
      }
    }
    console.log();
  } //인카운트 경고

  console.clear();
  console.log(
    chalk.bgRed.black.bold(`
|WARNING|WARNING|WARNING|WARNING|WARNING|WARNING|WARNING|WARNING|WARNING|WARNING|`)
  );
  console.log(
    chalk.red.bold(`                      
    
                        Encounter BOSS_[오거 백인대장]`)
  );
  console.log(
    chalk.gray(
      `
  
                 누구나 그럴싸한 계획을 가지고 있다. 쳐맞기 전까지는.

  `
    )
  );

  console.log(
    chalk.bgRed.black.bold(`
|WARNING|WARNING|WARNING|WARNING|WARNING|WARNING|WARNING|WARNING|WARNING|WARNING|`)
  );
  console.log(`                                
                                    전투 돌입.
          `);

  const choice = readlineSync.question("엔터를 눌러 진입하세요.");
}; //보스 몬스터 인카운트 씬

function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
      chalk.blueBright(
        `| 플레이어 정보 name: ${player.name} Lv: ${player.level} Hp: ${player.hp} Damage: ${player.MnDamage} 
Stat: [ Str:${player.str} Int:${player.int} Dex:${player.dex} Luk:${player.luk} ] Gold : ${player.gold}g Exp/MaxExp :${player.exp}/${player.maxExp} `
      ) +
      chalk.redBright(
        `| 몬스터 정보 name: ${monster.name} Hp: ${monster.hp} Damage: ${monster.MnDamage} |`
      )
  );
  console.log(chalk.magentaBright(`=====================\n`));
} // 배틀 상태창 디스플레이

const battle = async (stage, player, monster) => {
  let logs = [];

  while (player.hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(chalk.green(`\n1. 공격한다 2. 도망친다. 3. 방어 4. 연속공격`));
    const choice = readlineSync.question("당신의 선택은? ");

    // 플레이어의 선택에 따라 다음 행동 처리
    switch (choice) {
      case "1":
        logs.push(chalk.green(`${choice}를 선택하셨습니다.`));
        logs.push(chalk.white(`플레이어의 공격! ${player.MnDamage}의 데미지!`));
        player.attack(monster);
        break;
      // 1. 공격구현

      case "2":
        logs.push(chalk.green(`${choice}를 선택하셨습니다.`));

        if (stage == 10) {
          console.log(chalk.redBright("도망칠 수 없다!"));
          await sleep(0.5);
          break;
        } else if (player.run() == true) {
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
        player.defence();
        await sleep(0.5);

        break;
      // 3. 방어 구현

      case "4":
        logs.push(chalk.green(`${choice}를 선택하셨습니다.`));

        console.log(`연속공격을 시도합니다.
  [ 확률 계산식 : 기초확률 + 플레이어의 Luk값: ${player.luk}. ]`);
        let Luckibiki = 20 + player.luk;
        await sleep(0.1);
        if (Luckibiki < Math.round(Math.random() * (100 - 1) + 1)) {
          logs.push(chalk.yellow.bold(`공격 성공!!`));
          logs.push(
            chalk.white(`플레이어의 공격! ${player.MnDamage}의 데미지!`)
          );
          player.attack(monster);
          logs.push(
            chalk.white(`플레이어의 공격! ${player.MnDamage}의 데미지!`)
          );
          player.attack(monster);
          await sleep(0.5);
        } else {
          logs.push(chalk.white(`공격이 빗나갔다!!`));
        }
        break;

      default:
        break;

      //4. 연속 공격 구현
    }

    //몬스터 반응 구간.

    let SelectedPattern = 0;
    if (monster.isCharged == true) {
      SelectedPattern = 3;
    } else {
      SelectedPattern = monster.patternSelect();
    }

    switch (SelectedPattern) {
      case 1:
        if (monster.attack(player) == true) {
          logs.push(chalk.white(`방어에 막혔습니다!`));
        } else {
          logs.push(
            chalk.white(`몬스터의 공격! ${monster.MnDamage}의 데미지!`)
          );
        }
        break;
      //몬스터 일반 공격 구현.

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
              `몬스터의 스매시 실패! ${Math.floor(
                monster.MnDamage * 0.5
              )}의 데미지!`
            )
          );
        }

        break;
      //몬스터 스매시 공격 구현.

      case 3:
        let HomeRunChecker = monster.homeRun(player);
        if (HomeRunChecker == true) {
          logs.push(
            chalk.bgRed.bold(
              `버티기 힘든 한방!!!!!!!!!!!!!!!! ${
                monster.MnDamage * 4
              }의 데미지! `
            )
          );
          monster.isCharged = false;
        } else if (HomeRunChecker == false) {
          logs.push(
            chalk.white(
              `몬스터의 공격 실패! 넘치는 힘을 주체 못하고 넘어져버렸다! ${monster.MnDamage}의 데미지!`
            )
          );
          monster.isCharged = false;
          player.isDef = false;
        } else {
          logs.push(chalk.red(`강력한 공격을 위해 준비에 들어간것 같다!`));
          player.isDef = false;
        }

        break;
      //보스 몬스터 홈런 공격 구현.
      default:
        break;
    }
    logs.push(
      chalk.red(`|플레이어 체력 : ${player.hp}| 몬스터 체력 : ${monster.hp}|
      `)
    );
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
    await sleep(1);
  } // 스테이지 클리어 보상 구현
}; // 메인 배틀씬

const Shop = async (player) => {
  console.clear();
  let logs = [];
  logs.push(
    chalk.green(`==========================================================
        `)
  );
  logs.push(chalk.green.bold(`떠돌이상인.`));
  logs.push(
    chalk.green(`어떻게 한번 골라 보시겠수?
    `)
  );
  logs.push(`플레이어 소지금 : ` + chalk.yellowBright(`${player.gold}`));
  logs.push(
    `1.회복약 : 체력회복 + 100.` +
      chalk.yellow(`-30g `) +
      `2. 녹슨검 : 공격력 +50.` +
      chalk.yellow(`-50g `) +
      `3.그냥간다.`
  );

  logs.push(
    chalk.green(`==========================================================
            `)
  );

  //   logs.forEach((log) => console.log(log));
  //   const choice = readlineSync.question("당신의 선택은? ");
  logs.forEach((log) => console.log(log));
  while (1) {
    const choice = readlineSync.question("당신의 선택은? ");

    switch (choice) {
      case "1":
        if (player.gold >= 30) {
          player.hp += 100;
          player.gold -= 30;
          console.log(
            chalk.blueBright(`플레이어의 체력이 100 회복되었다! `) +
              chalk.yellow(`현재 소지금: ${player.gold}`)
          );
        } else {
          console.log(chalk.gray(`골드가 부족합니다!`));
        }
        break;
      case "2":
        if (player.gold >= 50) {
          player.MnDamage += 50;
          player.gold -= 50;
          console.log(
            chalk.blueBright(`플레이어의 공격력 50 증가! `) +
              chalk.yellow(`현재 소지금: ${player.gold}`)
          );
        } else {
          console.log(chalk.gray(`골드가 부족합니다!`));
        }
        break;
      case "3":
        console.log(chalk.blue(`가볼까나..`));
        await sleep(0.5);
        return true;
        break;
      default:
        console.log(chalk.red(`올바른 번호를 입력해주세요`));
        break;
    }
  }
}; // 상점 씬

function GameOver() {
  console.clear();

  console.log(
    chalk.red(`
                   uuuuuuu
               uu$$$$$$$$$$$uu
            uu$$$$$$$$$$$$$$$$$uu
           u$$$$$$$$$$$$$$$$$$$$$u
          u$$$$$$$$$$$$$$$$$$$$$$$u
         u$$$$$$$$$$$$$$$$$$$$$$$$$u
         u$$$$$$$$$$$$$$$$$$$$$$$$$u
         u$$$$$$"   "$$$"   "$$$$$$u
         "$$$$"      u$u       $$$$"
          $$$u       u$u       u$$$
          $$$u      u$$$u      u$$$
           "$$$$uu$$$   $$$uu$$$$"
            "$$$$$$$"   "$$$$$$$"
              u$$$$$$$u$$$$$$$u
               u$"$"$"$"$"$"$u
    uuu        $$u$ $ $ $ $u$$       uuu
   u$$$$        $$$$$u$u$u$$$       u$$$$
    $$$$$uu      "$$$$$$$$$"     uu$$$$$$
  u$$$$$$$$$$$uu    """""    uuuu$$$$$$$$$$
  $$$$"""$$$$$$$$$$uuu   uu$$$$$$$$$"""$$$"
   """      ""$$$$$$$$$$$uu ""$"""
             uuuu ""$$$$$$$$$$uuu
    u$$$uuu$$$$$$$$$uu ""$$$$$$$$$$$uuu$$$
    $$$$$$$$$$""""           ""$$$$$$$$$$$"
     "$$$$$"                      ""$$$$""
       $$$"                         $$$$"`)
  );

  console.log(
    chalk.redBright.bold(
      figlet.textSync(`GAME OVER`, {
        font: "pagga",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
} // 게임 오버

function GameClear() {
  console.clear();

  console.log(
    chalk.yellowBright(`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⡀⠠⠀⢀⠠⠀⠀⠠⠀⢀⠠⠀⠀⠠⠀⢀⠠⠀⠀⠠⠀⢀⠠⠀⠀⠠⠀⠀⠄
  ⠀⠀⠀⠀⠀⠀⠀⠠⠀⢀⠀⠀⠀⠠⠀⢀⠀⠀⠀⠠⠀⢀⠀⠀⠀⠠⠀⠠⠀⢀
  ⠀⠈⠀⠈⠀⠐⠀⠀⠄⠀⠀⠀⠂⠀⡀⡀⠀⠀⠂⠀⡀⠀⢀⠀⠂⠀⡀⠀⡀⠀
  ⠂⠐⠈⠀⠀⠂⠀⠂⠀⢀⠈⠀⢠⠋⠁⢱⠀⢁⠔⠒⠒⡄⠀⠀⡀⠀⢀⠀⠀⠀
  ⠀⢀⠀⠠⠀⠠⠀⠠⠀⠀⢀⠀⢸⠀⠀⢸⢰⠁⠀⠀⢀⠇⠀⢀⠀⢀⠀⢀⠀⠁
  ⠈⠀⠀⠀⡀⠀⡀⢀⠀⠈⠀⠀⣸⠀⠀⢸⠃⠀⠀⢠⠃⠀⠀⠀⠀⠀⠀⠀⢀⠠
  ⠀⠀⡀⠂⠀⠀⠀⠀⠀⢠⠖⡏⠀⡣⠤⠚⠤⡀⠀⡇⠀⠀⠈⠀⠈⠀⠈⠀⠀⠀
  ⠐⠀⠀⠀⡀⠄⠁⠀⠁⢸⠀⢕⠊⠀⠀⠀⠀⠱⠈⡆⠀⠀⠂⠐⠀⠈⠀⠀⠂⠀
  ⠀⠠⠐⠀⠀⠀⠀⠠⠀⠀⡧⠬⠦⠐⠒⠫⠄⠀⢀⠇⠀⠀⠄⠀⠄⠐⠀⠁⠀⠈
  ⠠⠀⠀⠀⠠⠐⠀⠀⠄⠀⢣⣀⡀⠀⠀⠀⠀⣀⠎⠀⠀⡀⠄⠀⢀⠀⠀⠄⠐⠀
  ⠀⠠⠀⠁⠀⠀⢀⠠⠀⠀⠈⠢⢄⣈⡉⣉⡩⠃⠀⠀⢀⠀⠀⠀⡀⠀⠄⠀⢀⠠
  ⠀⠀⢀⠠⠐⠈⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠁⠀⠀⢀⠠⠀⠀
  ⠠⠈⠀⠀⠀⠀⠀⢀⠠⠈⠀⠀⠁⠀⠈⠀⠈⠀⠀⠄⠀⠈⠀⠠⠐⠀⠀⠀⠀⢀
  ⠀⠀⠀⡀⠠⠀⠂⠀⠀⠀⠀⠐⠈⠀⠈⠀⠐⠈⠀⠀⠀⠁⢀⠀⢀⠀⠄⠂⠈⠀
  ⠠⢀⠂⠄⠠⠠⠀⠀⠐⠀⠁⠀⢀⠠⠀⠂⠀⢀⠠⠀⠁⠀⢀⠀⠀⠀⠀⠀⠀⠄                                                                                                   
  `)
  );
  console.log(
    chalk.yellowBright.bold(
      figlet.textSync(`GAME CLEAR!`, {
        font: "pagga",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
} // 게임 클리어

export async function startGame() {
  console.clear();

  let input = readlineSync.question("이름을 입력해주세요: ");
  const player = new Player(input);
  console.log(
    chalk.bold(`
PlayerName: ${player.name}
    `)
  );
  player.statReroll();
  await sleep(1);
  let stage = 1;

  while (stage <= 10 && player.hp > 0) {
    let monster;
    if (stage == 10) {
      monster = new Boss(stage);
    } else {
      monster = new Monster(stage);
    }

    let Checker;

    if (stage == 5) {
      Checker = await Shop(player);
    } else if (stage == 10) {
      await BossEncount();
    } else {
      Checker = await EncounterScene(player, stage);
    }

    if (Checker == true) {
      stage++;
      continue;
    }
    await sleep(0.5);
    await battle(stage, player, monster);
    stage++;
  }
  if (player.hp <= 0) {
    GameOver();
    return;
  } else {
    GameClear();
    return;
  } //게임 오버, 클리어 씬 구현
} // 게임 스타트
