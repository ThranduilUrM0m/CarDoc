package org.dev.dao;

import java.util.Date;
import java.util.List;

import org.dev.entities.IMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IMessageRepository extends JpaRepository<IMessage, Long> {
	public List<IMessage> findByimessageSendingTime(Date imessageSendingTime);
	@Query("select a from IMessage a where a.imessageSendingTime like :x")
	public Page<IMessage> searchIMessages(@Param("x")String mc, Pageable pageable);
}