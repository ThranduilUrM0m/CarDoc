package org.dev.metier;

import java.util.Collection;

import org.dev.entities.Account;
import org.dev.entities.Tvg;

public interface AccountMetier {
	public Account getAccountByUsername(String username);
	public Collection<Account> getAllAccount();
}
