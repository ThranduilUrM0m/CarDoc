package org.dev.entities;
/***********************************************************************
 * Module:  Booking.java
 * Author:  Zakariae
 * Purpose: Defines the Class Booking
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** @pdOid 7dced188-102b-46b2-bb20-0613c1e2022a */
@Entity
public class Booking implements Serializable{
   /** @pdOid 2fabd4c6-ef8d-4c14-b69e-4aaa8462119e */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long bookingId;
   /** @pdOid f187e106-20e0-4f0f-a7bc-060e9dcc6f80 */
   protected java.util.Date bookingDate;
   /** @pdOid 45909a15-03d9-4a9c-b6c8-e5e6ea20dbbc */
   protected java.util.Date bookingCreationdate;
   /** @pdOid d8e36e1b-7d5e-4b7d-a09f-faaa1af71fbf */
   protected boolean bookingIsCanceled;
   
   /** @pdOid 2980f120-feb7-4511-8ff9-6ba0a4ab9fa2 */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdOid e153c29d-39bb-40e6-bc33-85ed9845af52 */
   public Long getBookingId() {
      return bookingId;
   }
   
   /** @param newBookingId
    * @pdOid 86f3ee69-c203-4bd7-98e1-5edc8ae52b5f */
   public void setBookingId(Long newBookingId) {
      bookingId = newBookingId;
   }
   
   /** @pdOid 2a79e298-460a-4191-af5b-cc4ea6058c6a */
   public java.util.Date getBookingDate() {
      return bookingDate;
   }
   
   /** @param newBookingDate
    * @pdOid 3807d94d-191b-47d9-943a-cd05020b5b7e */
   public void setBookingDate(java.util.Date newBookingDate) {
      bookingDate = newBookingDate;
   }
   
   /** @pdOid 4493a5df-2119-45cd-9a77-1af616c995f4 */
   public java.util.Date getBookingCreationdate() {
      return bookingCreationdate;
   }
   
   /** @param newBookingCreationdate
    * @pdOid 0d7680b6-befd-4a27-aeee-6e506a80a119 */
   public void setBookingCreationdate(java.util.Date newBookingCreationdate) {
      bookingCreationdate = newBookingCreationdate;
   }
   
   /** @param bookingId 
    * @param bookingDate 
    * @param bookingCreationdate
    * @pdOid b76757fc-0315-4e38-9271-a561ff58245b */
   public Booking(Long bookingId, java.util.Date bookingDate, java.util.Date bookingCreationdate) {
      // TODO: implement
   }

}