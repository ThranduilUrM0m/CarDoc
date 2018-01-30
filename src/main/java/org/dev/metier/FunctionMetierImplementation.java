package org.dev.metier;

import org.dev.dao.FunctionRepository;
import org.dev.entities.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FunctionMetierImplementation implements FunctionMetier {
	@Autowired
	protected FunctionRepository functionRep;
	
	@Override
	public Function getFunctionByFunctionLabel(String functionLabel) {
		// TODO Auto-generated method stub
		return this.functionRep.findByFunctionLabel(functionLabel);
	}
	
}
