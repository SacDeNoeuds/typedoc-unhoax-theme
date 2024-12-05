import { Account, AccountEmail, AccountExists, AccountId, AccountNotFound } from './domain/Account'

/**
 * @category Use Case
 */
export type SignInOrUp = (email: AccountEmail) => Promise<Account>

/**
 * @category Use Case
 * @deprecated Use {@link SignInOrUp}
 */
export type SignIn = (email: AccountEmail) => Promise<Account | AccountNotFound>
/**
 * @category Use Case
 * @deprecated Use {@link SignInOrUp}
 */
export type SignUp = (email: AccountEmail) => Promise<Account | AccountExists>

/**
 * @category Use Case
 */
export type ArchiveAccount = (id: AccountId) => Promise<Account>

/**
 * @category Use Case
 */
export type ChangeAccountEmail = (id: AccountId, email: AccountEmail) => Promise<Account>
