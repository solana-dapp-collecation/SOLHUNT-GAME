use anchor_lang::prelude::*;
use anchor_spl::token::{self, SetAuthority, TokenAccount, Transfer};
use spl_token::instruction::AuthorityType;

#[program]
pub mod main_program_final {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = 0;
        Ok(())
    }

    pub fn initialize_admin_account(
        ctx: Context<InitializeAdminAccount>,
        total_amount: u64
    ) -> ProgramResult {
        ctx.accounts.escrow_account.admin_key = *ctx.accounts.admin.key;
        ctx.accounts
            .escrow_account
            .admin_deposit_token_account = *ctx
            .accounts
            .admin_deposit_token_account
            .to_account_info()
            .key;
        ctx.accounts.escrow_account.total_amount = total_amount;

        let (pda, _bump_seed) = Pubkey::find_program_address(&[b"dungeon"], ctx.program_id);
        token::set_authority(ctx.accounts.into(), AuthorityType::AccountOwner, Some(pda))?;
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: u64) -> ProgramResult {
        let my_account = &mut ctx.accounts.my_account;
        let amount = 20;

        if my_account.data & (1 << data) == 0 {
            msg!("Collecting token");
            my_account.data  = my_account.data | 1 << data;
            let (_pda, bump_seed) = Pubkey::find_program_address(&[b"dungeon"], ctx.program_id);
            let seeds = &[&b"dungeon"[..], &[bump_seed]];

            token::transfer(
                ctx.accounts
                    .into_transfer_to_game_user_context()
                    .with_signer(&[&seeds[..]]),
                    amount,
            )?;

            ctx.accounts.escrow_account.total_amount = ctx.accounts.escrow_account.total_amount - amount;
        } else {
            msg!("Token already collected");
        }    
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(total_amount: u64)]
pub struct InitializeAdminAccount<'info> {
    #[account(signer)]
    pub admin: AccountInfo<'info>,
    #[account(
        mut,
        constraint = admin_deposit_token_account.amount >= total_amount
    )]
    pub admin_deposit_token_account: CpiAccount<'info, TokenAccount>,
    #[account(init)]
    pub escrow_account: ProgramAccount<'info, EscrowAccount>,
    pub token_program: AccountInfo<'info>,
}


#[account]
pub struct EscrowAccount {
    pub admin_key: Pubkey,
    pub admin_deposit_token_account: Pubkey,
    pub total_amount: u64,
}

impl<'info> From<&mut InitializeAdminAccount<'info>>
    for CpiContext<'_, '_, '_, 'info, SetAuthority<'info>>
{
    fn from(accounts: &mut InitializeAdminAccount<'info>) -> Self {
        let cpi_accounts = SetAuthority {
            account_or_mint: accounts
                .admin_deposit_token_account
                .to_account_info()
                .clone(),
            current_authority: accounts.admin.clone(),
        };
        let cpi_program = accounts.token_program.clone();
        CpiContext::new(cpi_program, cpi_accounts)
    }
}

impl<'info> Update<'info> {
    fn into_transfer_to_game_user_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self.pda_deposit_token_account.to_account_info().clone(),
            to: self.game_user_receive_token_account.to_account_info().clone(),
            authority: self.pda_account.clone(),
        };
        CpiContext::new(self.token_program.clone(), cpi_accounts)
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init)]
    pub my_account: ProgramAccount<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    pub data: u64,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub my_account: ProgramAccount<'info, MyAccount>,
    #[account(signer)]
    pub game_user: AccountInfo<'info>,
    #[account(mut)]
    pub game_user_receive_token_account: CpiAccount<'info, TokenAccount>,
    #[account(mut)]
    pub admin_main_account: AccountInfo<'info>,
    #[account(mut)]
    pub pda_deposit_token_account: CpiAccount<'info, TokenAccount>,
    #[account(
        mut,
        constraint = escrow_account.admin_deposit_token_account == *pda_deposit_token_account.to_account_info().key,
        constraint = escrow_account.admin_key == *admin_main_account.key
        )]
    pub escrow_account: ProgramAccount<'info, EscrowAccount>,
    pub pda_account: AccountInfo<'info>,
    pub token_program: AccountInfo<'info>,
    
}
