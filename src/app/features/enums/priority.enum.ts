export enum PriorityEnum {
  low,
  medium,
  high
}

export const PriorityLabel: { [key in PriorityEnum]: string } = {
  [PriorityEnum.low]: 'Low',
  [PriorityEnum.medium]: 'Medium',
  [PriorityEnum.high]: 'High',
}
