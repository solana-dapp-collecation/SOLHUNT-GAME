
use anchor_lang::prelude::*;
use anchor_spl::token::{self, TokenAccount, Transfer};
use std::convert::Into;

#[program]
pub mod main_program {
    use super::*;

    pub fn interaction(ctx: Context<Interaction>, interaction_fee: u64) -> ProgramResult {
        let cpi_accounts = Transfer {
            from: ctx.accounts.from.to_account_info().clone(),
            to: ctx.accounts.to.to_account_info().clone(),
            authority: ctx.accounts.owner.clone(),
        };
        let cpi_program = ctx.accounts.token_program.clone();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, interaction_fee)?;
       
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Interaction<'info> {
    #[account(mut, has_one = owner)]
    from: CpiAccount<'info, TokenAccount>,
    #[account(mut, "from.mint == to.mint")]
    to: CpiAccount<'info, TokenAccount>,
    #[account(signer)]
    owner: AccountInfo<'info>,
    token_program: AccountInfo<'info>,
}

#[error]
pub enum ErrorCode {
    #[msg("The derived interaction signer does not match that which was given.")]
    InvalidInteractionSigner,
}