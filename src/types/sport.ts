export enum Sport {
  TRAMPOLINE = 'Trampoline',
  TUMBLING = 'Tumbling',
  TEAMGYM = 'TeamGym',
  DOUBLEMINI = 'DoubleMini',
  UNDEFINED = 'undefined',
}

export function getSport(sport: string): Sport {
  switch (sport) {
    case 'TRA':
      return Sport.TRAMPOLINE;
    default:
      return Sport.UNDEFINED;
  }
}
