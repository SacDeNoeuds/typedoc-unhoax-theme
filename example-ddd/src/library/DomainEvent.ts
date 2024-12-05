/**
 * @module Library/DomainEvent
 */
export type DomainEvent<Name extends string, Data> = {
  eventName: Name
  data: Data
}
