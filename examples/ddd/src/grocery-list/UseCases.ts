import { GroceryList, GroceryListId, GroceryListName, ItemName, ItemQuantity, Participant } from './domain/GroceryList'

/**
 * @category Use Case
 */
export type CreateGroceryList = (name: GroceryListName, participant: Participant) => Promise<GroceryList>

/**
 * @category Use Case
 */
export type ArchiveGroceryList = (id: GroceryListId) => Promise<void>

/**
 * @category Use Case
 */
export type ChangeGroceryListName = (id: GroceryListId, name: GroceryListName) => Promise<GroceryList>

/**
 * @category Use Case
 */
export type AddGroceryListItem = (
  id: GroceryListId,
  item: { name: ItemName; quantity: ItemQuantity },
) => Promise<GroceryList>

/**
 * @category Use Case
 */
export type ChangeItemQuantity = (id: GroceryListId, itemName: ItemName, quantity: ItemQuantity) => Promise<GroceryList>

/**
 * @category Use Case
 */
export type AddParticipant = (id: GroceryListId, participant: Participant) => Promise<GroceryList>

/**
 * @category Use Case
 */
export type RemoveParticipant = (id: GroceryListId, participant: Participant) => Promise<GroceryList>
