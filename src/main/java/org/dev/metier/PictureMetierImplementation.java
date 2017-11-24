package org.dev.metier;

import java.util.Date;

import org.dev.dao.AccountRepository;
import org.dev.dao.PictureRepository;
import org.dev.entities.Account;
import org.dev.entities.Picture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PictureMetierImplementation implements PictureMetier{
	@Autowired
	protected PictureRepository pictureRep;
	@Autowired
	protected AccountRepository accountRep;
	
	@Override
	public Picture createPicture(String pictureName, String pictureExtension, Date insertDate, Account account) {
		this.pictureRep.save(new Picture(
				pictureName,
				pictureExtension,
				insertDate,
				account
				));
		this.accountRep
				.findOne(account.getAccountId())
					.setPicture(this.pictureRep.findByAccount(this.accountRep.findOne(account.getAccountId())));
		return null;
	}

	@Override
	public Picture getPicture(Long pictureId) {
		return this.pictureRep.findOne(pictureId);
	}

	@Override
	public void updatePicture(Picture picture) {
		this.pictureRep.save(picture);
	}

	@Override
	public void deletePicture(Picture picture) {
		this.pictureRep.delete(picture);
	}
	
}
