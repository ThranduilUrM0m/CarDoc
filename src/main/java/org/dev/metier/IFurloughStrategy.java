package org.dev.metier;
/***********************************************************************
 * Module:  IFurloughStrategy.java
 * Author:  Zakariae
 * Purpose: Defines the Interface IFurloughStrategy
 ***********************************************************************/

import java.util.*;

/** @pdOid 6675d7e3-96ed-4620-bfeb-30f583b4f4eb */
public interface IFurloughStrategy {
   /** @pdOid 03c430ad-031d-4e33-8d6a-fb9fae9230f1 */
   boolean addFurlough();
   /** @pdOid 8ef6c28a-daf2-4bd9-af93-ebd2365fcc68 */
   boolean removeFurlough();

}