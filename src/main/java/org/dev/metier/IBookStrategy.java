package org.dev.metier;
/***********************************************************************
 * Module:  IBookStrategy.java
 * Author:  Zakariae
 * Purpose: Defines the Interface IBookStrategy
 ***********************************************************************/

import java.util.*;

/** @pdOid 9c65eef2-4544-431f-9295-957bcedd290d */
public interface IBookStrategy {
   /** @pdOid 35ddd831-9fd7-4d72-8674-42d4f5c039ef */
   boolean addBooking();
   /** @pdOid 1857d27c-0fe4-4ad6-a161-c779597fca5f */
   boolean cancelBooking();

}