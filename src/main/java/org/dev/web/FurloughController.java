package org.dev.web;

import org.dev.dao.FurloughRepository;
import org.dev.entities.Furlough;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FurloughController {
	@Autowired
	protected FurloughRepository furloughRepository;
	@RequestMapping(value="/index", method=RequestMethod.GET)
	public String index(Model model, int page) {
		Page<Furlough> pageFurloughs = furloughRepository.findAll(new PageRequest(page, 5));
		model.addAttribute("furloughs", pageFurloughs);
		int[] pages = new int[pageFurloughs.getTotalPages()];
		for(int i = 0; i < pages.length; i++)
			pages[i] = i;
		model.addAttribute("pages", pages);
		model.addAttribute("page", page);
		return "furloughs";
	}
}