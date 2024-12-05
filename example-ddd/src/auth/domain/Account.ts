import { Branded } from '@/library/branded'

/** @category Entity */
export type AccountId = Branded<string, 'AccountId'>

/** @category Entity */
export interface Account {
  kind: 'Account'
  id: AccountId
  email: AccountEmail
}

/** @category Entity */
export type AccountEmail = Branded<string, 'AccountEmail'>

/** @category Error */
export class AccountExists {
  constructor(readonly idOrEmail: AccountId | AccountEmail) {}
}

/** @category Error */
export class AccountNotFound {
  constructor(readonly idOrEmail: AccountId | AccountEmail) {}
}
