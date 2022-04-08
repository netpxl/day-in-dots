import { ActivityInterface } from './activity.interface';

export interface ActivityDtoInterface {
  activities: ActivityInterface[],
  currentlySelected?: ActivityInterface
}
