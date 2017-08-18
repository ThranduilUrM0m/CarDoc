package org.dev.entities;
/***********************************************************************
 * Module:  Picture.java
 * Author:  Zakariae
 * Purpose: Defines the Class Picture
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** @pdOid b415d1fa-9426-4eef-90c5-71a6c7fdacf9 */
@Entity
public class Picture  implements Serializable{
   /** @pdOid 4033680d-f471-461a-ac48-c216255a624c */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long pictureId;
   /** @pdOid 336540a8-2b1f-47c7-a534-f74f2c7966a6 */
   protected String pictureContent;
   /** @pdOid a6896628-9105-4e38-a927-866f8d0dd33a */
   protected String pictureExtension;
   
   /** @pdOid 1199ff7f-6a9e-4e40-b365-9cd7480b6cfe */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdOid 5859691d-7301-4f9f-800c-421487b90036 */
   public Long getPictureId() {
      return pictureId;
   }
   
   /** @param newPictureId
    * @pdOid 04a90db0-e628-4316-a33c-62bce4e86257 */
   public void setPictureId(Long newPictureId) {
      pictureId = newPictureId;
   }
   
   /** @pdOid 6adac279-7ea6-4042-b88d-014515096faa */
   public String getPictureContent() {
      return pictureContent;
   }
   
   /** @param newPictureContent
    * @pdOid 8ae4eff3-3134-4594-b182-40e23e6ef25e */
   public void setPictureContent(String newPictureContent) {
      pictureContent = newPictureContent;
   }
   
   /** @pdOid c0d4f713-7dc1-4e9e-9e89-ae974ea44ed9 */
   public String getPictureExtension() {
      return pictureExtension;
   }
   
   /** @param newPictureExtension
    * @pdOid d99aeb78-3c22-49d3-b2a8-ea41d8876591 */
   public void setPictureExtension(String newPictureExtension) {
      pictureExtension = newPictureExtension;
   }
   
   /** @param pictureId 
    * @param pictureContent 
    * @param pictureExtension
    * @pdOid e0ba7db3-dbe2-4c6c-8b89-d34faaba02b1 */
   public Picture(Long pictureId, String pictureContent, String pictureExtension) {
      // TODO: implement
   }

}