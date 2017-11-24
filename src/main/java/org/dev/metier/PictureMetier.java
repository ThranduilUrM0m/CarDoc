package org.dev.metier;

import java.util.Date;

import org.dev.entities.Account;
import org.dev.entities.Picture;

public interface PictureMetier {
	public Picture createPicture(String pictureName, String pictureExtension, Date insertDate, Account account);
	public Picture getPicture(Long pictureId);
	public void updatePicture(Picture picture);
	public void deletePicture(Picture picture);
}
