package org.dev.dao;

import java.util.Collection;

import org.dev.entities.Account;
import org.dev.entities.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PictureRepository extends JpaRepository<Picture, Long>  {
	public Collection<Picture> findByAccount(Account account);
}
