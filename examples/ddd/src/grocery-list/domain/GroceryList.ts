import { AccountId } from '@/auth'
import { Branded } from '@/library/branded'

/** @category Entity */
export type GroceryListId = Branded<string, 'GroceryListId'>

/** @category Entity */
export interface GroceryList {
  kind: 'GroceryList'
  id: GroceryListId
  name: GroceryListName
  participants: Set<Participant>
  items: Map<ItemName, ItemQuantity>
}

/** @category Entity */
export type GroceryListName = Branded<string, 'GroceryListName'>

/** @category Entity */
export type Participant = Branded<AccountId, 'Participant'>

/** @category Entity */
export type ItemName = Branded<string, 'ItemName'>

/** @category Entity */
export type ItemQuantity = Branded<number, 'ItemQuantity'>
