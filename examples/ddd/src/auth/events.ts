import { DomainEvent } from '@/library/DomainEvent'
import { Account, AccountId } from './domain/Account'

/** @category Event */
export type AccountCreated = DomainEvent<'AccountCreated', Account>

/** @category Event */
export type AccountModified = DomainEvent<'AccountModified', { accountId: AccountId; changes: Partial<Account> }>

/** @category Event */
export type AccountArchived = DomainEvent<'AccountArchived', AccountId>
