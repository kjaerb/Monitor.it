export enum Discipline {
  TRAMPOLINE = "Trampoline",
  TUMBLING = "Tumbling",
  TEAMGYM = "TeamGym",
  DOUBLEMINI = "DoubleMini",
  UNDEFINED = "undefined",
}

export function getSport(sport: string): Discipline {
  switch (sport) {
    case "TRA":
      return Discipline.TRAMPOLINE;
    default:
      return Discipline.UNDEFINED;
  }
}
